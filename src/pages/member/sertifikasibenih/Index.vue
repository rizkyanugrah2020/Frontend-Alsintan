<template>
  <q-page padding>
    <div class="q-ma-xs q-pa-sm bg-white text-green-10" style="border-radius: 10px">
      <div class="row items-center q-mb-md">
        <div class="col-md-10 col-sm-12 q-pa-sm">
          <div class="text-h5">Riwayat Pengajuan</div>
          <div>Pengajuan - pengajuan yang sudah pernah diajukan akan ditampilkan pada table</div>
        </div>
        <div class="col-md-2 col-sm-12 col-xs-12">
          <q-select
            v-model="status"
            :options="options"
            option-label="label"
            option-value="value"
            label="Pilih Status"
            @update:model-value="getStat"
            outlined
            clearable
          />
        </div>
      </div>
      <div
        v-for="(row,i) in rows"
        :key="i"
        class="q-pa-md border-shadow q-ma-sm">
        <div class="row items-center text-green-10">
          <div class="col-1 q-mr-md flex flex-center">
            <q-img src="img/sertif_benih/icon_sertif.png" style="width: 80%" />
          </div>
          <div class="col q-gutter-xs">
            <div class="row items-center q-gutter-sm">
              <span class="text-weight-medium col">Sertifikasi Siap Salur</span>
              <q-badge v-if="row.status == 0" class="q-pa-sm col flex flex-center" color="yellow-8" label="Sedang Diverifikasi" />
              <q-badge v-if="row.status == 1" class="q-pa-sm col flex flex-center" color="blue-8" label="Pengujian Lapangan" />
              <q-badge v-if="row.status == 2" class="q-pa-sm col flex flex-center" color="info" label="Pengujian Laboratorium" />
              <q-badge v-if="row.status == 3" class="q-pa-sm col flex flex-center" color="positive" label="Sertifikasi Berhasil" />
              <q-badge v-if="row.status == 5" class="q-pa-sm col flex flex-center" color="negative" label="Ditolak" />
            </div>
            <div class="text-h5 text-weight-bold">Pengajuan Sertifikasi {{ row.jenis_benih }}</div>
            <!-- <div class="">28 Februari 2023 | 09:03</div> -->
            <!-- <div class="">{{ row.sertifikat }}</div> -->
            <div class="">{{ this.$parseDate(row.tanggal_awal).timeCustom }}</div>
          </div>
          <div class="col-xs-12 col-md-6 q-mt-sm">
            <div class="row q-gutter-sm justify-end">
              <q-btn
                v-if="row.status == 3"
                type="a"
                target="_blank"
                :href="`${$baseURL}file-sertif/${row.sertifikat}`"
                label="Unduh Sertifikat"
                color="yellow-8"
                padding="xs xl"
                rounded
                no-caps />
              <q-btn
                v-if="row.status == 5"
                type="a"
                target="_blank"
                :href="`${$baseURL}file-sertif/${row.keterangan_error}`"
                label="Keterangan"
                color="blue-8"
                padding="xs xl"
                rounded
                no-caps />
              <q-btn :to="{ name: 'detailSertifikasi', params: { id: row.id } } " label="Detail" color="green-10" padding="xs xl" rounded no-caps/>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <q-table
      flat
      :rows="rows"
      :columns="columns"
      row-key="nama"
      :loading="loading"
    >
      <template v-slot:top>
        <div class="col-12">
          <div class="row items-center">
            <div class="col-auto">
              <span class="text-h5 text-green-10">Data Pengajuan Sertifikasi Benih Anda</span>
            </div>
            <div class="col q-mx-sm">
              <hr style="border: 2px solid #FFBB16; width: 100%;">
            </div>
          </div>
        </div>
      </template>
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="aksi" :props="props">
            <div class="justify-center q-gutter-x-xs">
              <q-btn label="Detail" :to="{ name: 'detailPengajuanSertifikasiBenihMember', params: {id: props.row.id} }" color="green-10" outline unelevated/>
              <q-btn label="Download Sertifikat" type="a" href="sertifikat.pdf" target="_blank" :disable="props.row.status === 1" color="warning" unelevated/>
            </div>
          </q-td>
          <q-td key="tanggal" :props="props">
            {{ props.row.tanggal }}
          </q-td>
          <q-td key="status" :props="props">
            <q-badge color="positive" class="q-pa-sm">
              {{ props.row.label }}
            </q-badge>
          </q-td>
          <q-td key="jenisBenih" :props="props">
            {{ props.row.jenisBenih }}
          </q-td>
          <q-td key="alamatLengkap" :props="props">
            {{ props.row.alamat }}
          </q-td>

        </q-tr>
      </template>
    </q-table> -->
  </q-page>
</template>
<script>
export default {
  data () {
    return {
      rows: [],
      original: [],
      status: null,
      columns: [
        { name: 'aksi', align: 'left', label: 'Aksi', field: 'aksi' },
        { name: 'tanggal', align: 'left', label: 'Tanggal', field: 'tanggal' },
        { name: 'status', align: 'left', label: 'Status Pengajuan', field: 'status' },
        { name: 'jenisBenih', align: 'left', label: 'Jenis Benih', field: 'jenisBenih' },
        { name: 'alamatLengkap', align: 'left', label: 'Alamat Lengkap', field: 'alamatLengkap' }
      ],
      options: [
        {
          label: 'Semua',
          value: 6
        },
        {
          label: 'Berkas Masuk',
          value: 0
        },
        {
          label: 'Verifikasi Lapangan',
          value: 1
        },
        {
          label: 'Verifikasi Laboratorium',
          value: 2
        },
        {
          label: 'Sertifikasi Berhasil',
          value: 3
        },
        {
          label: 'Berkas Gagal',
          value: 5
        }
      ],
      loading: false,
      dialog: false
    }
  },
  created () {
    this.getData()
    // this.rows = [
    //   {
    //     id: 1,
    //     alamat: 'Desa Tanjung Raya Kec. Bangun Rejo, Lampung Tengah',
    //     status: 1,
    //     label: 'Menunggu Persetujuan',
    //     jenisBenih: 'Kopi'
    //   },
    //   {
    //     id: 2,
    //     alamat: 'Desa Tanjung Raya Kec. Bangun Rejo, Lampung Tengah',
    //     status: 2,
    //     label: 'Disetujui Untuk Ditinjau',
    //     jenisBenih: 'Kopi'
    //   }
    // ]
    // this.getData()
    // this.getPabrik()
  },
  methods: {
    getStat () {
      this.rows = []
      this.$showLoading()
      if (this.status.value === 6) {
        this.rows = this.original
      } else {
        const data = this.original
        for (const d of data) {
          if (d.status.value === 4 || d.status.value === 1) {
            if (d.status === 4 || d.status === 1) {
              this.rows.push(d)
            }
          } else if (d.status === this.status.value) {
            this.rows.push(d)
          }
        }
      }
      this.$hide()
    },
    getData () {
      this.$showLoading()
      this.$axios.get(`sertif/getListSertifikasiBenihByNik/${this.$getProfile().nik}`)
        .finally(() => this.$hide())
        .then((res) => {
          this.rows = this.original = res.data.result
          // console.log(this.original)
        })
        .catch(() => this.$commonErrorNotif())
    },
    download (fileDownload) {
      this.$axios.get(`${this.$baseURL}file-sertif/${fileDownload}`)
      // console.log(fileDownload)
      // this.$axios.get('data/download/' + id)
      // console.log(`${this.$baseURL}file-sertif/${fileDownload}`)
      // this.$axios({
      //   url: `${this.$baseURL}file-sertif/${fileDownload}`,
      //   method: 'GET',
      //   responseType: 'blob' // important
      // }).then((res) => {
      //   // console.log(response)
      //   const FILE = window.URL.createObjectURL(new Blob([res.data]))

      //   const docUrl = document.createElement('x')
      //   docUrl.href = FILE
      //   docUrl.setAttribute('download', 'file.pdf')
      //   document.body.appendChild(docUrl)
      //   docUrl.click()
      // }).catch((err) => {
      //   console.log(err)
      // })
    }
  }
}
</script>
