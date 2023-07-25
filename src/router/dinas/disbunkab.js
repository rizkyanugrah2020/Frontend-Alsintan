import { disbunKab } from 'src/helper/ListAkses'
export default {
  path: '/disbun-kabupaten/',
  meta: {
    adaMenu: true,
    auth: true,
    disbunkab: true
  },
  component: () => import('src/layouts/dinas/DisbunKab.vue'),
  children: [
    {
      path: 'dashboard',
      name: disbunKab.index,
      component: () => import('pages/disbun/kabupaten/Index.vue')
    },
    {
      path: 'kur',
      name: 'dataKURDisbunKab',
      component: () => import('pages/disbun/kabupaten/kur/Index.vue')
    },
    {
      path: 'kur/detail/:id',
      name: 'detailKURDisbunKab',
      component: () => import('pages/sharedpages/kur/Detail.vue')
    }
  ]
}
