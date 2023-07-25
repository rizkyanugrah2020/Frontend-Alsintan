export default {
  path: '/pemasaran/',
  component: () => import('src/layouts/PemasaranLayout.vue'),
  children: [
    {
      path: 'dashboard',
      name: 'dashboardPemasaran',
      component: () => import('pages/others/pemasaran/Index.vue')
    },
    {
      path: 'katalog/:komoditas',
      name: 'katalogPemasaran',
      component: () => import('pages/others/pemasaran/Katalog.vue')
    },
    {
      path: 'detail/:id',
      name: 'detailPemasaran',
      component: () => import('pages/others/pemasaran/Detail.vue')
    }
  ]
}
