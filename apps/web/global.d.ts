interface Window {
  ReactNativeWebView?: {
    postMessage: (message: string) => void
  }
  __TAURI__?: any
}
