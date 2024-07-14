let supabase

if (typeof window !== 'undefined' && window.__TAURI__) {
  // Tauri
  supabase = require('./supabase.tauri')
} else if (typeof document !== 'undefined') {
  // SSR
  supabase = require('./supabase.ssr')
} else {
  // SPA
  supabase = require('./supabase')
}

module.exports = supabase
