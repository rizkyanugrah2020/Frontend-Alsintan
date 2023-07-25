import { okkpd } from '../../helper/ListAkses'
export default [
  {
    label: 'Dashboard',
    icon: 'dashboard',
    to: okkpd.index
  },
  {
    label: 'Pengajuan Permohonan',
    icon: 'list',
    to: 'dataPermohonan'
  },
  {
    label: 'Kepuasan Pengguna',
    icon: 'list',
    to: 'dataKepuasan'
  }
]
