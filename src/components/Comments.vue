<script setup lang="ts">
    import { ref, computed, inject, onMounted, onUnmounted, watch, type ComputedRef } from 'vue'
    import { supabase } from '@/lib/supabase'

    // 取得父層提供的 3 碼文章 id（例：'001'）
    const mtlogId = inject<ComputedRef<string>>('mtlogId')!
    const postId = computed(() => mtlogId.value)

    // 產生/取用訪客 session_id（存 localStorage）
    const SESSION_KEY = 'mtlog_comment_session_id'
    function getSessionId(): string {
        let v = localStorage.getItem(SESSION_KEY)
        if (!v) {
            v = crypto.randomUUID()
            localStorage.setItem(SESSION_KEY, v)
        }
        return v
    }
    const sessionId = getSessionId()

    // 表單
    const author = ref('')
    const content = ref('')
    const submitting = ref(false)
    const errorMsg = ref('')

    // 列表與分頁（簡單 Load More）
    type CommentRow = { id: number; author: string | null; content: string; created_at: string }
    const comments = ref<CommentRow[]>([])
    const pageSize = 20
    const loading = ref(false)
    const hasMore = ref(true)
    let lastLoadedAt: string | null = null  // 光標

    async function loadMore(reset = false) {
        if (loading.value) return
        loading.value = true
        errorMsg.value = ''

        try {
            if (reset) {
                comments.value = []
                lastLoadedAt = null
                hasMore.value = true
            }
            // 取新一頁：以 created_at 倒序
            let q = supabase
                .from('mtlog_comments')
                .select('id, author, content, created_at')
                .eq('post_id', postId.value)
                .eq('status', 'approved')
                .order('created_at', { ascending: false })
                .limit(pageSize)

            if (lastLoadedAt) q = q.lt('created_at', lastLoadedAt)

            const { data, error } = await q
            if (error) throw error

            if (data && data.length) {
                comments.value.push(...data as CommentRow[])
                lastLoadedAt = data[data.length - 1].created_at
                if (data.length < pageSize) hasMore.value = false
            } else {
                hasMore.value = false
            }
        } catch (e: any) {
            errorMsg.value = e.message || '載入留言失敗'
        } finally {
            loading.value = false
        }
    }

    async function submitComment() {
    errorMsg.value = ''
    const text = content.value.trim()
        if (!text) {
            errorMsg.value = '※請輸入內容'
            return
        }
        if (text.length > 1000) {
            errorMsg.value = '※內容請勿超過 1000 字'
            return
        }
        submitting.value = true
        try {
            const { error } = await supabase
                .from('mtlog_comments')
                .insert({
                    post_id: postId.value,
                    session_id: sessionId,
                    author: author.value?.trim() || null,
                    content: text,
                    status: 'approved', // 若後端改為 pending，這裡也可送 'pending'
                })
                .single()
            if (error) {
                // 節流（每分鐘一次）會回唯一鍵衝突 23505
                if (error.code === '23505') {
                    errorMsg.value = '留言太頻繁，請稍後再試（每分鐘限 1 則）'
                } else {
                    throw error
                }
            } else {
                content.value = ''
                // 直接重新拉最新一頁（或等 Realtime 推播）
                await loadMore(true)
            }
        } catch (e: any) {
            errorMsg.value = e.message || '送出失敗'
        } finally {
            submitting.value = false
        }
    }

    /** Realtime（可選）：新留言即時加入（僅監聽本文章、approved） */
    let channel: ReturnType<typeof supabase.channel> | null = null
    function setupRealtime() {
        channel?.unsubscribe()
        channel = supabase.channel('mtlog-comments-' + postId.value)
            .on('postgres_changes', {
            event: 'INSERT',
            schema: 'public',
            table: 'mtlog_comments',
            filter: `post_id=eq.${postId.value}`
            }, (payload: any) => {
            const row = payload.new
            if (row?.status === 'approved') {
                comments.value.unshift({
                id: row.id,
                author: row.author,
                content: row.content,
                created_at: row.created_at,
                })
            }
            })
            .subscribe()
    }

    onMounted(async () => {
        await loadMore(true)
        setupRealtime()
    })

    onUnmounted(() => { channel?.unsubscribe() })
        watch(postId, async () => {
        await loadMore(true)
        setupRealtime()
    })
</script>

<template>
    <section class="mtlog-comments">
        <h2>留言板</h2>
        <!-- 表單 -->
        <form class="comment-form" @submit.prevent="submitComment">
            <input v-model="author" type="text" placeholder="暱稱（選填）" />
            <textarea v-model="content" :maxlength="1000" placeholder="寫下你的想法..." rows="4" />
            <button type="submit" :disabled="submitting">
                {{ submitting ? '送出中...' : '送出留言' }}
            </button>
            <p v-if="errorMsg" class="err">{{ errorMsg }}</p>
        </form>
        <!-- 列表 -->
        <ul class="comment-list">
            <li v-for="c in comments" :key="c.id">
                <figure>
                    <strong>{{ c.author || '訪客' }}</strong>
                    <time>{{ new Date(c.created_at).toLocaleString() }}</time>
                </figure>
                <p>{{ c.content }}</p>
            </li>
        </ul>
        <div class="more">
            <button v-if="hasMore && !loading" @click="loadMore()">載入更多</button>
            <span v-else-if="loading">載入中...</span>
            <span v-else>暫無更多留言</span>
        </div>
    </section>
</template>

<style lang="scss" scoped>
    .mtlog-comments {
        padding: 2rem 0;
        > h2 {
            font-size: 1.125rem;
            font-weight: bold;
            padding: 0.5rem 0;
        }
        @media only screen and (max-width: 768px) {
            padding: 2rem;
        }
        @media only screen and (max-width: 480px) {
            padding: 1rem;
        }
    }
    .comment-form {
        display: grid;
        gap: .5rem;
        margin-bottom: 1rem;
        input,
        textarea {
            display: block;
            width: 100%;
            font-size: 0.875rem;
            border: 1px solid #ddd;
            border-radius: .5rem;
            padding: .5rem;
        }
        button {
            height: 2.5rem;
            font-size: 0.875rem;
            color: #FFF;
            background: var(--c2);
            border: 0;
            border-radius: 0.5rem;
            padding: 0.5rem;
        }
    }
    .err {
        font-size: .75rem;
        color: var(--red);
    }
    .comment-list {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        padding-top: 1rem;
        li {
            border:1px solid #eee;
            border-radius: 0.5rem;
            padding: 1rem;
        }
        figure {
            display: flex;
            justify-content: space-between;
            gap: .5rem;
            font-size: 0.75rem;
            color: #666;
        }
        p {
            white-space: pre-wrap;
        }
    }
    .more {
        display: flex;
        justify-content: center;
        gap: 1rem;
        font-size: 0.75rem;
        color:#666;
        padding: 1rem 0;
    }
</style>
