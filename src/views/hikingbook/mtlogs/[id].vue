<script setup lang="ts">
    import { defineProps, shallowRef, type Component, computed, watchEffect, provide, ref, type Ref } from 'vue'
    import { useRoute } from 'vue-router'
    import Comments from '@/components/Comments.vue'

    // 建議做成 utils，但這裡直接內嵌也可
    const normId = (v: unknown) => String(v ?? '').padStart(3, '0')

    const props = defineProps<{ id?: string }>()
    const route = useRoute()

    // 標準化後的 id（永遠是 3 碼字串，例如 "001"）
    const idNorm = computed(() => normId(props.id ?? route.params.id))

    // 動態載入對應文章
    const ArticleComp = shallowRef<Component | null>(null)
    watchEffect(async () => {
        const rid = idNorm.value
        if (!rid) return
        try {
            const m = await import(`./articles/${rid}.vue`)
            ArticleComp.value = m.default
        } catch (e) {
            console.error('載入文章失敗：', e)
            ArticleComp.value = { template: '<div>找不到文章</div>' } as any
        }
    })

    // 提供給子孫：標準化 id 與「可寫入」的 totalAll
    const totalAll: Ref<number | null> = ref(null)
    provide('mtlogId', idNorm)        // ComputedRef<string>
    provide('mtlogTotalAll', totalAll) // Ref<number|null>
</script>

<template>
    <!-- 用 key 確保切換 id 時內容強制重建 -->
    <component v-if="ArticleComp" :is="ArticleComp" :key="idNorm" />
    <!-- 留言板 -->
    <Comments />
</template>
