<template>
  <q-page padding>
    <q-table
      title="Data Pengajuan Asuransi BPJS Anda"
      flat
      :rows="rows"
      :loading="loading"
      :columns="columns"
    >
      <template v-slot:body="props">
        <q-tr :props="props">
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
              <q-btn label="Detail" unelevated color="dark" :to="{ name: 'detailPengajuanBPJSByBPJS', params: {id: props.row.bpjs_id}}"/>
              <q-btn label="Ubah Status" :disable="props.row.bpjs_status < 11" color="warning" unelevated @click="openDialog(props.row)"/>
            </div>
          </q-td>
        </q-tr>
      </template>

    </q-table>
    <q-dialog v-model="dialog" persistent v-if="dialog">
      <q-card style="min-width: 450px">
        <q-form @submit="onSubmit">
          <q-card-section>
            <div class="text-h6">Ubah Status</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <q-select
              v-model="status"
              label="Pilih Status"
              option-label="status"
              option-value="id"
              :rules="[
                val => val !== null || 'Mohon Pilih'
              ]"
              :options="listStatus"
            />
            <q-input
              v-model="keterangan"
              type="textarea"
              label="Keterangan"
            />
          </q-card-section>

          <q-card-actions align="right" class="text-primary">
            <q-btn flat label="Batal" v-close-popup />
            <q-btn color="primary" label="Simpan" type="submit"/>
          </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog>
  </q-page>
</template>
<script>

export default {
  data () {
    return {
      rows: [],
      columns: [
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
      show_filter: false,
      activeData: null,
      status: null,
      listStatus: [],
      keterangan: null
    }
  },
  created () {
    this.getData()
    this.getStatus()
  },
  methods: {
    getStatus () {
      this.$axios.get('asuransi/bpjs-status', this.$createToken())
        .then(res => {
          this.listStatus = res.data.result
        }).catch(() => this.$commonErrorNotif())
    },
    getData () {
      this.loading = true
      this.$axios.get('master/bpjs', this.$createToken())
        .finally(() => { this.loading = false })
        .then(res => {
          if (this.$parseResponse(res.data, false)) {
            this.rows = res.data.result
          }
        }).catch(() => this.$commonErrorNotif())
    },
    onSubmit () {
      const body = {
        id_status: this.status.id,
        keterangan: this.keterangan,
        id_user: this.$getProfile().member.users_login.id_users
      }
      this.$showLoading()
      this.$axios.put(`asuransi/acc-bpjs/${this.activeData.bpjs_id}`, body, this.$createToken())
        .finally(() => this.$hide())
        .then(res => {
          if (this.$parseResponse(res.data)) {
            this.getData()
            this.resetForm()
          }
        }).catch(() => this.$commonErrorNotif())
    },
    openDialog (data) {
      this.activeData = data
      this.dialog = true
    },
    resetForm () {
      this.dialog = false
      this.activeData = null
      this.status = null
      this.keterangan = null
    }
  }
}
</script>
