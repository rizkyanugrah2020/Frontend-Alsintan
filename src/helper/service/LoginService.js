import { api } from '../../boot/axios'
import { setProfile } from '../../boot/Profile'
import { all } from '../ListAkses'
import { notif } from '../../boot/Notify'

class LoginServices {
  login (username, password) {
    const basicAuth = `Basic ${window.btoa(`${username}:${password}`)}`
    return api.post('auth/sign-in', {}, {
      headers: { Authorization: basicAuth }
    })
  }

  goToHome (data, router) {
    const access = data.member.users_login.access
    if (access) {
      const page = all.filter(r => {
        return r.value === access
      })
      if (page.length > 0) {
        setProfile(data)
        router.push({ name: page[0].index })
      } else {
        notif('Akses Dilarang', 'negative')
      }
    } else {
      notif('Akses Dilarang', 'negative')
    }
  }
}

export default new LoginServices()
