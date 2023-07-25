<template>
  <q-page padding style="background: #F2F7F5; color: #024830">
    <q-mt-md>
      <div class="row q-ma-md">
        <div class="col-6 column">
          <span class="text-h5 text-weight-bold q-mt-sm">Data pengajuan</span>
          <span class="q-mt-sm">Seluruh data pengajuan oleh pemohon beserta status</span>
        </div>
        <div class="col-6 column">
          <span>Cari Nama Pemohon / Perusahaan Pemohon/Kode Permohonan</span>
          <q-input outlined label="Masukan nama pemohon /perusahaan pemohon" class="bg-white q-mt-sm"/>
          <div class="row">
            <q-btn label="Cari" no-caps color="green-10" class="q-mt-sm" padding="sm xl" dense/>
          </div>
        </div>
      </div>
       <q-scroll-area class="q-mt-sm" style="height: 60px; width: 100%;">
        <div class="row no-wrap items-center">
          <q-tabs
            v-model="tab"
            indicator-color="transparent"
            @update:model-value="getName"
            active-class="itembox-active"
          >
            <q-tab name="semua" class="itembox q-ma-xs" label="Semua" />
            <q-tab
              v-for="(item, index) in array"
              :key="index"
              :name="item.key"
              class="itembox q-ma-xs"
              :label="item.label" />
            <!-- <q-tab name="1" class="itembox q-ma-xs" label="Kunjungan Lapangan" />
            <q-tab name="2" class="itembox q-ma-xs" label="Verifikasi Laboratorium" />
            <q-tab name="3" class="itembox q-ma-xs" label="Berhasil" />
            <q-tab name="4" class="itembox q-ma-xs" label="Gagal" /> -->
          </q-tabs>
        </div>
      </q-scroll-area>
      <q-table
        flat
        bordered
        :rows="row"
        :columns="columns"
        row-key="name"
        class="width: 100%"
      >
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="aksi" :props="props">
              <q-btn label="Detail" :to="{ name: 'permohonanOkkpd', params: {id: props.row.id_berkas_permohonan} }" color="green-10"/>
            </q-td>
            <q-td key="status" :props="props">
              <q-badge class="q-pa-xs" :color="array[getIndexByKey(String(props.row.status))].color">{{ array[getIndexByKey(String(props.row.status))].label }}</q-badge>
            </q-td>
            <q-td key="tgl" :props="props">
              -
            </q-td>
            <q-td key="perusahaan" :props="props">
              {{ props.row.okkpd_form_permohonan.nama_perusahaan }}
            </q-td>
            <q-td key="nosc" :props="props">
              -
            </q-td>
            <q-td key="komoditi" :props="props">
              {{ props.row.jenis_komoditi }}
            </q-td>
            <q-td key="identitas" :props="props">
              -
            </q-td>
            <q-td key="jumlah" :props="props">
              {{ props.row.jumlah_lot }}
            </q-td>
            <q-td key="tonase" :props="props">
              -
            </q-td>
            <q-td key="negara" :props="props">
              {{ props.row.negara_tujuan }}
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </q-mt-md>
  </q-page>
</template>
<script>
import utils from '../sharedpages/okkpd/utilsOkkpd'
export default {
  data () {
    return {
      tab: 'semua',
      originalData: [],
      row: [],
      columns: [
        {
          name: 'aksi',
          label: 'Aksi',
          field: 'aksi',
          align: 'left'
        },
        { name: 'status', align: 'left', label: 'Status', field: 'status' },
        { name: 'tgl', label: 'Tgl Penerbitan', field: 'tgl' },
        { name: 'perusahaan', label: 'Perusahaan', field: 'perusahaan' },
        { name: 'nosc', label: 'No.SC/HC', field: 'nosc' },
        { name: 'komoditi', label: 'Komoditi', field: 'komoditi' },
        { name: 'identitas', label: 'Identitas Lot', field: 'identitas' },
        { name: 'jumlah', label: 'Jumlah Lot', field: 'jumlah' },
        { name: 'tonase', label: 'Tonase', field: 'tonase' },
        { name: 'negara', label: 'Negara Tujuan', field: 'negara' }
      ],
      array: utils.array
    }
  },
  created () {
    this.getData()
    console.log(this.array)
  },
  methods: {
    getIndexByKey (key) {
      const index = this.array.findIndex(item => {
        if (Array.isArray(item.key)) {
          return item.key.includes(key)
        } else {
          return item.key === key
        }
      })

      return index !== -1 ? index : -1
    },
    getData () {
      this.$showLoading()
      this.$axios.get('okkpd/getData', this.$createToken())
        .finally(() => this.$hide())
        .then((res) => {
          // console.log(res)
          this.row = this.originalData = res.data.result
          // console.log(this.row)
        })
        .catch(() => this.$commonErrorNotif())
    },
    getName (val) {
      if (val === 'semua') {
        this.row = this.originalData
      } else {
        // const data = this.originalData.filter(item => item.status === val)
        if (val.length === 1) {
          this.row = this.originalData.filter(item => item.status === Number(val))
        } else {
          const data = []
          for (const v in val) {
            // console.log(val[v])
            const hasil = this.originalData.filter(item => item.status === Number(val[v]))
            if (hasil.length > 0) {
              data.push(hasil[0])
            }
          }
          // console.log(data)
          this.row = data
        }
      }
    }
  }
}
</script>
