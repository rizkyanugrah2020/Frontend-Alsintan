<template>
  <q-page padding>
    <q-table
      title="Data Pengajuan Asuransi BPJS"
      flat
      :rows="rows"
      :loading="loading"
      :columns="columns"
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="nama" :props="props">
            {{ props.row.nama }}
          </q-td>
          <q-td key="nik" :props="props">
            {{ props.row.nik }}
          </q-td>
          <q-td key="bpjs_nokartu" :props="props">
            {{ props.row.bpjs_nokartu }}
          </q-td>
          <q-td key="bpjs_jenis_pekerjaan" :props="props">
            {{ props.row.bpjs_jenis_pekerjaan }}
          </q-td>
          <q-td key="bpjs_jenis_peserta" :props="props">
            {{ props.row.bpjs_jenis_peserta }}
          </q-td>
          <q-td key="bpjs_penghasilan" :props="props">
            {{ props.row.bpjs_penghasilan }}
          </q-td>
          <q-td key="bpjs_program" :props="props">
            {{ props.row.bpjs_program }}
          </q-td>
          <q-td key="periode_pendaftaran" :props="props">
            {{ props.row.periode_pendaftaran }}
          </q-td>
          <q-td key="bpjs_tmt" :props="props">
            {{ $parseDate(props.row.bpjs_tmt).fullDate }}
          </q-td>
          <q-td key="bpjs_lokasi_pekerjaan" :props="props">
            {{ props.row.bpjs_lokasi_pekerjaan }}
          </q-td>
          <q-td key="kur_setting" :props="props">
            {{ props.row.status }}
          </q-td>
          <q-td key="aksi" :props="props">
            <div class="justify-center q-gutter-x-xs">
              <q-btn label="Detail" unelevated color="dark" :to="{ name: detailRoute, params: {id: props.row.bpjs_id}}"/>
              <q-btn label="Tolak" :disable="props.row.bpjs_status >= statusOn" color="negative" unelevated @click="openDialog(props.row.bpjs_id, statusTolak)"/>
              <q-btn label="Konfirmasi" :disable="props.row.bpjs_status >= statusOn" unelevated @click="openDialog(props.row.bpjs_id, statusKonfirmasi)" color="warning"/>
            </div>
          </q-td>
        </q-tr>
      </template>

    </q-table>
  </q-page>
</template>
<script>

export default {
  props: {
    detailRoute: String,
    statusKonfirmasi: String,
    statusTolak: String,
    endPoint: String,
    statusOn: Number
    // historyBtn: {
    //   type: Boolean,
    //   default: false
    // }
  },
  data () {
    return {
      rows: [],
      columns: [
        { name: 'nama', align: 'left', label: 'Nama', field: 'nama' },
        { name: 'nik', align: 'left', label: 'NIK', field: 'nik' },
        { name: 'bpjs_nokartu', align: 'left', label: 'No Kartu BPJS', field: 'bpjs_nokartu' },
        { name: 'bpjs_jenis_pekerjaan', align: 'left', label: 'Jenis Pekerjaan', field: 'bpjs_jenis_pekerjaan' },
        { name: 'bpjs_jenis_peserta', align: 'left', label: 'Jenis Peserta', field: 'bpjs_jenis_peserta' },
        { name: 'bpjs_penghasilan', align: 'left', label: 'Penghasilan', field: 'bpjs_penghasilan' },
        { name: 'bpjs_program', align: 'left', label: 'Program', field: 'bpjs_program' },
        { name: 'periode_pendaftaran', align: 'left', label: 'Periode Pendaftaran', field: 'periode_pendaftaran' },
        { name: 'bpjs_tmt', align: 'left', label: 'Terhitung Tanggal', field: 'bpjs_tmt' },
        { name: 'bpjs_lokasi_pekerjaan', align: 'left', label: 'Lokasi Pekerjaan', field: 'bpjs_lokasi_pekerjaan' },
        { name: 'kur_setting', align: 'left', label: 'Status', field: 'kur_setting' },
        { name: 'aksi', align: 'left', label: 'Aksi', field: 'aksi' }
      ],
      loading: false,
      dialog: false,
      editMode: false,
      image: null,
      filter: '',
      show_filter: false
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      this.loading = true
      this.$axios.get(this.endPoint, this.$createToken())
        .finally(() => { this.loading = false })
        .then(res => {
          console.log(res)
          if (this.$parseResponse(res.data, false)) {
            this.rows = res.data.result
          }
        }).catch(() => this.$commonErrorNotif())
    },
    openDialog (id, status) {
      this.$q.dialog({
        title: 'Konfirmasi',
        message: 'Apakah anda yakin?',
        cancel: true,
        prompt: {
          model: '',
          label: 'Tambahkan Keterangan',
          type: 'text' // optional
        },
        persistent: true
      }).onOk(ket => {
        const body = {
          id_status: status,
          keterangan: ket,
          id_user: this.$getProfile().member.users_login.id_users
        }
        this.$showLoading()
        this.$axios.put(`asuransi/acc-bpjs/${id}`, body, this.$createToken())
          .finally(() => this.$hide())
          .then(res => {
            if (this.$parseResponse(res.data)) {
              this.getData()
            }
          }).catch(() => this.$commonErrorNotif())
      })
    }
  }
}
</script>
