export type Message =
  | {
      type: 'INITIAL_SESSION'
      value: { access_token: string; refresh_token: string }
    }
  | { type: 'SIGNED_OUT'; value: null }
  | { type: 'NAVIGATION_STATE'; value: null }
