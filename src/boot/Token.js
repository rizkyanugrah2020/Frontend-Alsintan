import { boot } from 'quasar/wrappers'
import { parseProfile } from './Profile'

const createToken = (params = {}) => {
  return {
    headers: {
      'access-token': parseProfile().member.users_login.access_token,
      username: parseProfile().nik
    },
    params: params
  }
}

export default boot(async ({ app }) => {
  app.config.globalProperties.$createToken = createToken
})

export { createToken }
