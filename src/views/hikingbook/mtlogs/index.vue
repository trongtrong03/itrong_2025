<script setup lang="ts">
    import { ref, computed, onBeforeMount, onMounted, onUnmounted, watch } from "vue";
    import Loading from "@/components/Loading.vue";
    import fetchData from "@/hooks/fetchData";
    import { supabase } from "@/lib/supabase";

    type Row = { id: string|number; title: string; desc: string; time: string; status: boolean };

    // 標準化工具（可改成從 utils 匯入）
    const normId = (v: unknown) => String(v ?? '').padStart(3, '0')

    const jsonData = ref<Row[]>([]);
    const isDataLoaded = ref(false);

    const defaultItemCount = 10;
    const loadedItemCount = ref(defaultItemCount);

    // 累計瀏覽快取：idNorm -> total
    const totalMap   = ref<Record<string, number>>({});
    const fetchedIds = ref<Set<string>>(new Set()); // 已查過 totals 的 idNorm

    // 顯示用資料：同時附上 idNorm，後續模板都用它
    const displayedItems = computed(() =>
    jsonData.value
        .filter(item => (item as any).status === true)
        .slice(0, loadedItemCount.value)
        .map(item => ({ ...item, idNorm: normId((item as any).id) }))
    );

    // 取得 JSON
    const loadData = async () => {
        await fetchData(jsonData, "mountainsLogs", false, true);
    };

    // 批次抓取 totals（只抓尚未抓過的 idNorm）
    async function fetchTotalsFor(ids: string[]) {
        const normalized = ids.map(normId);
        const pending = normalized.filter(id => !fetchedIds.value.has(id));
        if (pending.length === 0) return;

        pending.forEach(id => fetchedIds.value.add(id));

        const { data, error } = await supabase.rpc("get_mtlog_totals", { p_ids: pending });
        if (error) {
            console.error("get_mtlog_totals error:", error);
            // 還原，讓之後有機會重試
            pending.forEach(id => fetchedIds.value.delete(id));
            return;
        }

        const map: Record<string, number> = { ...totalMap.value };
        // RPC 回傳 id 已是標準化字串；寫進 map
        for (const row of (data ?? []) as Array<{id:string,total:number}>) {
            map[row.id] = Number(row.total ?? 0);
        }
        // 對於沒有回傳（代表 0）的 pending 也補上 0
        for (const id of pending) {
            if (map[id] === undefined) map[id] = 0;
        }
        totalMap.value = map;
    }

    // 初次掛載：載資料 + 取第一批 totals
    onBeforeMount(loadData);

    onMounted(async () => {
        isDataLoaded.value = true;

        const ids = displayedItems.value.map(i => i.idNorm);
        await fetchTotalsFor(ids);

        window.addEventListener("scroll", handleScroll);
    });

    onUnmounted(() => {
        window.removeEventListener("scroll", handleScroll);
    });

    // 無限滾動：多載一批 + 抓新出現的 ids totals
    const handleScroll = async () => {
        if (
            loadedItemCount.value < jsonData.value.length &&
            (window.innerHeight + window.scrollY) >= document.body.offsetHeight
        ) {
            loadedItemCount.value += defaultItemCount;

            const ids = displayedItems.value.map(i => i.idNorm);
            await fetchTotalsFor(ids);
        }
    };

    // 若會改動資料源或篩選條件，也可用 watch 監聽 displayedItems 自動抓
    watch(displayedItems, (list) => {
        const ids = list.map(i => i.idNorm);
        fetchTotalsFor(ids);
    });
</script>

<template>
  <section class="hikingbook-inside">
    <div class="hikingbook-block hikingbook-logs fade-up" v-if="isDataLoaded">
        <div class="pages-title"><h2>登山心得</h2></div>
        <ul>
            <li v-for="item in displayedItems" :key="item.idNorm">
            <RouterLink :to="'/mtlogs/' + item.idNorm" class="log-card">
                <figure>
                    <span :style="{ backgroundImage: 'url(images/mtlogs/' + item.idNorm + '/cover.jpg)'}"></span>
                </figure>
                <h3 v-text="(item as any).title"></h3>
                <p v-text="(item as any).desc"></p>
                <div class="flex">
                    <time v-text="(item as any).time"></time>
                    |
                    <span v-if="totalMap[item.idNorm] !== undefined">Views: {{ totalMap[item.idNorm] }}</span>
                </div>
            </RouterLink>
            </li>
        </ul>
    </div>
    <div class="list-loading" v-else>
        <Loading />
    </div>
  </section>
</template>

<style lang="scss" scoped>
    .hikingbook-logs {
        li {
            list-style-type: none;
            margin-bottom: 1rem;
            a {
                position: relative;
                display: block;
                min-height: 10rem;
                padding: 1rem 0 2rem 17rem;
                transform: translate3d(0, 0, 0) scale(1) rotate(0.1deg);
                transition: transform .3s;
                figure {
                    position: absolute;
                    top: 0;
                    left: 0;
                    z-index: 0;
                    display: block;
                    width: 15rem;
                    height: 10rem;
                    background-color: #fafafa;
                    background-image: url("/images/icon/default.png");
                    background-repeat: no-repeat;
                    background-size: 50% auto;
                    background-position: 50% 50%;
                    border-radius: 0.5rem;
                    overflow: hidden;
                    span {
                        display: block;
                        width: 100%;
                        height: 100%;
                        background-size: cover;
                        background-repeat: no-repeat;
                        background-position: 50% 50%;
                    }
                }
                h3 {
                    line-height: 1;
                    font-size: 1.125rem;
                    font-weight: bold;
                    color: #000;
                    @include text-truncate;
                    margin-bottom: 0.5rem;
                    padding: 0.25rem 0;
                    transition: color .3s;
                }
                p {
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 3;
                    line-height: 1.5;
                    font-size: 0.875rem;
                    font-weight: normal;
                    color: #999;
                    overflow: hidden;
                }
                .flex {
                    position: absolute;
                    bottom: 1rem;
                    display: flex;
                    width: 100%;
                    gap: .5rem;
                    font-size: 0.75rem;
                    color: #AAA;
                }
                time {
                    font-size: 0.75rem;
                    color: #AAA;
                    &::before {
                        content: 'published @ ';
                    }
                }
                &:hover {
                    transform: translate3d(0, 0, 0) scale(1.03) rotate(0.1deg);
                    h2 {
                        color: var(--c1);
                    }
                }
            }
            &:last-child {
                margin-bottom: 0;
            }
        }
        @media only screen and (max-width: 768px) {
            margin-top: 4rem;
            li {
                a {
                    min-height: 7.5rem;
                    padding: 0 0 0 10rem;
                    figure {
                        width: 9rem;
                        height: 7.5rem;
                    }
                    .flex {
                        bottom: 0;
                    }
                }
            }
        }
        @media only screen and (max-width: 480px) {
            width: calc(100% - 2rem);
            margin-top: 2rem;
        }
        @media only screen and (max-width: 414px) {
            li {
                a {
                    min-height: 4.5rem;
                    padding: 0 0 0 7rem;
                    figure {
                        width: 6rem;
                        height: 4.5rem;
                        border-radius: .25rem;
                    }
                    h3 {
                        display: -webkit-box;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 2;
                        height: 2.5rem;
                        line-height: 1.25rem;
                        text-overflow: clip;
                        -ms-text-overflow: clip;
                        white-space: normal;
                        overflow: hidden;
                    }
                    p {
                        display: none;
                    }
                }
            }
        }
    }
</style>
