export default {
  path: '/bank/',
  meta: {
    adaMenu: true,
    auth: true,
    bank: true
  },
  component: () => import('src/layouts/BankLayout.vue'),
  children: [
    {
      path: 'dashboard',
      name: 'dashboardBank',
      component: () => import('pages/bank/Index.vue')
    },
    {
      path: 'kur/pengaturan',
      name: 'pengaturanKurBank',
      component: () => import('pages/bank/kur/Pengaturan.vue')
    },
    {
      path: 'kur/pengajuan',
      name: 'pengajuanKurBank',
      component: () => import('pages/bank/kur/Pengajuan.vue')
    },
    {
      path: 'kur/pengajuan/:id',
      name: 'detailPengajuanKurBank',
      component: () => import('pages/sharedpages/kur/Detail.vue')
    }
  ]
}
