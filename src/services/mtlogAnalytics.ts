import dayjs from 'dayjs'
import { supabase } from '@/lib/supabase'

/** 單篇：近 N 天的每日 views */
export async function fetchDailyViews(id: string, days = 30) {
  const from = dayjs().subtract(days - 1, 'day').format('YYYY-MM-DD')
  const to = dayjs().format('YYYY-MM-DD')

  const { data, error } = await supabase
    .from('mtlog_views')
    .select('view_date, views')
    .eq('id', id)
    .gte('view_date', from)
    .lte('view_date', to)
    .order('view_date', { ascending: true })

  if (error) throw error
  return data ?? []
}

/** 排行榜：取日期區間內的 Top N */
export async function fetchTopIdsByRange(from: string, to: string, limit = 10) {
  // 由於 Supabase 不支援複雜 group by RPC 直接寫 SQL，
  // 我們這裡用行分組的方式取回再前端彙總。
  const { data, error } = await supabase
    .from('mtlog_views')
    .select('id, view_date, views')
    .gte('view_date', from)
    .lte('view_date', to)

  if (error) throw error

  // 前端彙總
  const map: Record<string, number> = {}
  for (const row of data ?? []) {
    map[row.id] = (map[row.id] ?? 0) + (row.views ?? 0)
  }
  return Object.entries(map)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([id, total]) => ({ id, total }))
}
