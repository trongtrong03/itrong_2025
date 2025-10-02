<script setup lang="ts">
    import { ref, onMounted, defineProps, inject, watch, type Ref, type ComputedRef } from 'vue'
    import dayjs from 'dayjs'
    import { supabase } from '@/lib/supabase'
    import fetchData from "@/hooks/fetchData"

    const props = defineProps({
        propValue: { type: Number, required: true },
        fileType:  { type: String, required: true },
    })

    const jsonData = ref([])

    // 從父容器拿「標準化 id」與「累計數容器」
    const mtlogId  = inject<ComputedRef<string>>('mtlogId')!
    const totalAll = inject<Ref<number | null>>('mtlogTotalAll', ref(null))

    const getIndex = ({ jsonData = [], index = 0 }) => jsonData[index] || {}

    // 進頁 +1（每天同裝置只記一次；成功才標記）
    async function trackOncePerDay() {
        const id = mtlogId.value
        if (!id) return
        // 可選：簡單排除機器人
        const ua = navigator.userAgent.toLowerCase()
        if (/(bot|spider|crawl|preview|facebookexternalhit)/.test(ua)) return

        const today = dayjs().format('YYYY-MM-DD')
        const key = `mtlog_viewed:${id}:${today}`
        if (localStorage.getItem(key)) return

        const { error } = await supabase.rpc('increment_mtlog_view', { p_id: id, p_date: today })
        if (!error) localStorage.setItem(key, String(Date.now()))
        else console.error('increment_mtlog_view error:', error)
    }

    // 讀取歷史總累計
    async function refreshTotal() {
        const id = mtlogId.value
        if (!id) return
        const { data, error } = await supabase.rpc('get_mtlog_total', { p_id: id })
        totalAll.value = error ? null : Number(data ?? 0)
    }

    // 這個子組件原本也會抓標題資料，保留
    onMounted(async () => {
        await fetchData(jsonData, `${props.fileType}`, false, true)
        await trackOncePerDay()
        await refreshTotal()
    })

    // 路由切換到另一篇時，重新 +1 與更新總數
    watch(mtlogId, async () => {
        await trackOncePerDay()
        await refreshTotal()
    })
</script>

<template>
    <hgroup class="text-heading">
        <ul v-if="fileType == 'mountainsLogs'">
            <li v-for="(tag, index) in getIndex({ jsonData, index: jsonData.length-propValue }).tags" :key="index">{{ tag }}</li>
        </ul>
        <div class="flex">
            <time v-text="getIndex({ jsonData, index: jsonData.length-propValue }).time"></time>
            |
            <h3 v-if="fileType == 'mountainsLogs' && totalAll !== null" class="text-viewcount">Views: {{ totalAll }}</h3>
        </div>
        <h1 v-text="getIndex({ jsonData, index: jsonData.length-propValue }).title"></h1>
    </hgroup>
</template>