// src/composables/useSupabaseKeepAlive.ts
import { onMounted, onBeforeUnmount } from 'vue'
import { createClient } from '@supabase/supabase-js'

type Options = {
  intervalMs?: number
}

export function useSupabaseKeepAlive(opts: Options = {}) {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string
  const supabaseAnon = import.meta.env.VITE_SUPABASE_ANON_KEY as string
  const supabase = createClient(supabaseUrl, supabaseAnon)

  const interval = opts.intervalMs ?? 3 * 24 * 60 * 60 * 1000
  let timer: number | undefined

  const ping = async () => {
    try {
      await supabase.rpc('keepalive').throwOnError()
      console.log('[Supabase KeepAlive] ✅ ping success at', new Date().toLocaleString())
    } catch (err) {
      console.warn('[Supabase KeepAlive] ⚠️ ping failed', err)
      await fetch(`${supabaseUrl}/auth/v1/health`, {
        headers: { apikey: supabaseAnon }
      }).then(r => {
        console.log('[Supabase KeepAlive] fallback health check:', r.status)
      }).catch(e => console.error(e))
    }
  }

  const start = () => {
    ping()
    timer = window.setInterval(ping, interval)
  }
  const stop = () => { if (timer) window.clearInterval(timer) }

  onMounted(() => {
    start()
    const onVis = () => { if (document.visibilityState === 'visible') ping() }
    document.addEventListener('visibilitychange', onVis)
    onBeforeUnmount(() => {
      document.removeEventListener('visibilitychange', onVis)
      stop()
    })
  })

  return { ping, start, stop }
}
