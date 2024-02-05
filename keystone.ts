import 'dotenv/config'
import { config } from '@keystone-6/core'
import { lists } from './schema'

import { type Session, nextAuthSessionStrategy } from './session'

// WARNING: this example is for demonstration purposes only
//   as with each of our examples, it has not been vetted
//   or tested for any particular usage

export default config({
  db: {
    provider: 'postgresql',
    url: 'postgres://sheascott:@localhost:5432/sffreelance',
  },
  ui: {
    // the following api routes are required for nextauth.js
    publicPages: [
      '/api/auth/csrf',
      '/api/auth/signin',
      '/api/auth/callback',
      '/api/auth/session',
      '/api/auth/providers',
      '/api/auth/signout',
      '/api/auth/error',

      // each provider will need a separate callback and signin page listed here
      '/api/auth/signin/google',
      '/api/auth/callback/google',
    ],

    // adding page middleware ensures that users are redirected to the signin page if they are not signed in.
    pageMiddleware: async ({ wasAccessAllowed }) => {
      if (wasAccessAllowed) return
      return {
        kind: 'redirect',
        to: '/api/auth/signin',
      }
    },
  },
  lists,
  // you can find out more at https://keystonejs.com/docs/apis/session#session-api
  session: nextAuthSessionStrategy,
})
