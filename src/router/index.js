import { route } from 'quasar/wrappers'
import { createRouter, createMemoryHistory, createWebHistory, createWebHashHistory } from 'vue-router'
import routes from './routes'
import { LocalStorage } from 'quasar'
import { notif } from '../boot/Notify'
import * as middleware from './middleware'
import * as listAkses from '../helper/ListAkses'

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory)

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,
    history: createHistory(process.env.MODE === 'ssr' ? void 0 : process.env.VUE_ROUTER_BASE)
  })

  Router.beforeEach((to, from, next) => {
    const dataUser = LocalStorage.getItem('datauser')
    const noSession = dataUser === null || dataUser === 'undefined'
    const loginPage = 'loginPage'
    const roleMemberPage = listAkses.member.index

    const access = noSession ? null : dataUser.member.users_login.access

    if (to.matched.some(record => record.meta.auth)) {
      if (noSession) {
        next({ name: loginPage })
      } else {
        const idMember = dataUser.member.id_member
        if (to.meta.member) {
          if (access !== listAkses.member.value) {
            next({ name: loginPage })
          } else {
            if (to.meta.cekAkses) {
              if (to.meta.cekRole) {
                middleware.cekRole(idMember, to.params.idRole)
                  .then(res => {
                    if (res.data.status) {
                      next()
                    } else {
                      notif(res.data.message, 'negative')
                      next({ name: roleMemberPage })
                    }
                  })
              } else if (to.meta.cekLayanan) {
                middleware.cekLayanan(to.params.idRole, to.params.idLayanan)
                  .then(res => {
                    if (res.data.status) {
                      next()
                    } else {
                      notif(res.data.message, 'negative')
                      next({ name: roleMemberPage })
                    }
                  }).catch(() => {
                    next({ name: roleMemberPage })
                  })
              } else if (to.meta.cekFitur) {
                middleware.cekFitur(to.params.idLayanan, to.params.idFitur)
                  .then(res => {
                    if (res.data.status) {
                      next()
                    } else {
                      notif(res.data.message, 'negative')
                      next({ name: roleMemberPage })
                    }
                  }).catch(() => {
                    next({ name: roleMemberPage })
                  })
              } else {
                next()
              }
            } else {
              next()
            }
          }
        } else {
          if (to.meta.admin) {
            if (access === listAkses.superAdmin.value) {
              next()
            } else {
              next({ name: loginPage })
            }
          } else if (to.meta.bank) {
            if (access === listAkses.bank.value) {
              next()
            } else {
              next({ name: loginPage })
            }
          } else if (to.meta.tphKab) {
            if (access === listAkses.tphKab.value) {
              next()
            } else {
              next({ name: loginPage })
            }
          } else if (to.meta.tphProv) {
            if (access === listAkses.tphProv.value) {
              next()
            } else {
              next({ name: loginPage })
            }
          } else if (to.meta.dkpkab) {
            if (access === listAkses.dkpKab.value) {
              next()
            } else {
              next({ name: loginPage })
            }
          } else if (to.meta.dkpprov) {
            if (access === listAkses.dkpProv.value) {
              next()
            } else {
              next({ name: loginPage })
            }
          } else if (to.meta.dpkhkab) {
            if (access === listAkses.dpkhKab.value) {
              next()
            } else {
              next({ name: loginPage })
            }
          } else if (to.meta.dpkhProv) {
            if (access === listAkses.dpkhProv.value) {
              next()
            } else {
              next({ name: loginPage })
            }
          } else if (to.meta.dinaskehutanankab) {
            if (access === listAkses.dinasKehutananKab.value) {
              next()
            } else {
              next({ name: loginPage })
            }
          } else if (to.meta.dinaskehutananprov) {
            if (access === listAkses.dinasKehutananProv.value) {
              next()
            } else {
              next({ name: loginPage })
            }
          } else if (to.meta.bpjs) {
            if (access === listAkses.bpjs.value) {
              next()
            } else {
              next({ name: loginPage })
            }
          } else if (to.meta.brigade) {
            if (access === listAkses.brigade.value) {
              next()
            } else {
              next({ name: loginPage })
            }
          } else if (to.meta.pabrikan) {
            if (access === listAkses.pabrikan.value) {
              next()
            } else {
              next({ name: loginPage })
            }
          } else if (to.meta.bppKec) {
            if (access === listAkses.bppKec.value) {
              next()
            } else {
              next({ name: loginPage })
            }
          } else if (to.meta.agenalsintan) {
            if (access === listAkses.agenAlsintan.value) {
              next()
            } else {
              next({ name: loginPage })
            }
          } else {
            next()
          }
        }
      }
    } else {
      if (access === listAkses.superAdmin.value) {
        next({ name: listAkses.superAdmin.index })
      } else if (access === listAkses.bank.value) {
        next({ name: listAkses.bank.index })
      } else if (access === listAkses.member.value) {
        next({ name: listAkses.member.index })
      } else if (access === listAkses.tphKab.value) {
        next({ name: listAkses.tphKab.index })
      } else if (access === listAkses.tphProv.value) {
        next({ name: listAkses.tphProv.index })
      } else if (access === listAkses.dkpKab.value) {
        next({ name: listAkses.dkpKab.index })
      } else if (access === listAkses.dkpProv.value) {
        next({ name: listAkses.dkpProv.index })
      } else if (access === listAkses.dpkhKab.value) {
        next({ name: listAkses.dpkhKab.index })
      } else if (access === listAkses.dpkhProv.value) {
        next({ name: listAkses.dpkhProv.index })
      } else if (access === listAkses.dinasKehutananKab.value) {
        next({ name: listAkses.dinasKehutananKab.index })
      } else if (access === listAkses.dinasKehutananProv.value) {
        next({ name: listAkses.dinasKehutananProv.index })
      } else if (access === listAkses.bpjs.value) {
        next({ name: listAkses.bpjs.index })
      } else if (access === listAkses.brigade.value) {
        next({ name: listAkses.brigade.index })
      } else if (access === listAkses.pabrikan.value) {
        next({ name: listAkses.pabrikan.index })
      } else if (access === listAkses.bppKec.value) {
        next({ name: listAkses.bppKec.index })
      } else if (access === listAkses.agenAlsintan.value) {
        next({ name: listAkses.agenAlsintan.index })
      } else {
        next()
      }
    }
  })

  return Router
})
