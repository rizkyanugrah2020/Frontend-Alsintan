<template>
  <q-page padding style="background: #F2F7F5">
    <q-btn icon="west" color="green-10" no-caps label="Kembali" @click="this.$router.go(-1)" outline rounded/>
    <div class="q-mt-lg q-pa-md border-shadow column bg-white">
      <span class="text-h6 text-weight-bold">Formulir Persyaratan SC/HC</span>
      <span>Isi formulir pengajuan ini dengan data yang sesuai dan pastikan tidak ada data yang salah </span>

      <span class="text-body1 text-weight-medium q-mt-md">Berkas persyaratan SC/HC</span>
      <q-form v-if="!this.isReadonly" @submit="onSubmit">
        <div class="q-gutter-sm q-mt-md">
          <div class="row items-center flex flex-center">
            <q-file
              class="col"
              v-model="schc"
              label="Surat permohonan penerbitan SC/HC"
              accept=".pdf, .png, .jpg, .jpeg"
              outlined
              :rules="[
                val => val !== null || 'Mohon Isi'
              ]"
            >
              <template v-slot:append>
                <q-icon name="attach_file" />
              </template>
            </q-file>
          </div>
          <div class="row items-center flex flex-center">
            <q-file
              class="col"
              v-model="sppb"
              label="Upload SPPB"
              accept=".pdf, .png, .jpg, .jpeg"
              outlined
              :rules="[
                val => val !== null || 'Mohon Isi'
              ]"
            >
              <template v-slot:append>
                <q-icon name="attach_file" />
              </template>
            </q-file>
          </div>
          <div class="row items-center flex flex-center">
            <q-file
              class="col"
              v-model="okratoksin"
              label="Upload File uji cemaran Okratoksin"
              accept=".pdf, .png, .jpg, .jpeg"
              outlined
              :rules="[
                val => val !== null || 'Mohon Isi'
              ]"
            >
              <template v-slot:append>
                <q-icon name="attach_file" />
              </template>
            </q-file>
          </div>
          <div class="row items-center flex flex-center">
            <q-file
              class="col"
              v-model="aflatoksin"
              label="Upload File uji cemaran Aflatoksin"
              accept=".pdf, .png, .jpg, .jpeg"
              outlined
              :rules="[
                val => val !== null || 'Mohon Isi'
              ]"
            >
              <template v-slot:append>
                <q-icon name="attach_file" />
              </template>
            </q-file>
          </div>
           <div class="row items-center flex flex-center">
            <q-file
              class="col"
              v-model="pestisida"
              label="Upload File Uji  Residu Pestisida"
              accept=".pdf, .png, .jpg, .jpeg"
              outlined
              :rules="[
                val => val !== null || 'Mohon Isi'
              ]"
            >
              <template v-slot:append>
                <q-icon name="attach_file" />
              </template>
            </q-file>
           </div>
          <div class="row items-center flex flex-center">
            <q-file
              class="col"
              v-model="organoleptik"
              label="Upload File Uji  Organoleptik & Proksimat"
              accept=".pdf, .png, .jpg, .jpeg"
              outlined
              :rules="[
                val => val !== null || 'Mohon Isi'
              ]"
            >
              <template v-slot:append>
                <q-icon name="attach_file" />
              </template>
            </q-file>
          </div>
          <q-input
            label="Alamat Pembeli (Importir)"
            outlined
            type="textarea"
            v-model="alamat"
            :rules="[
              val => val !== null || 'Mohon Isi'
            ]"
            />
          <div class="column">
            <q-btn type="submit" label="Kirim File" style="margin-top: -20px" color="green-10"/>
          </div>
        </div>
      </q-form>
      <div v-else class="q-gutter-sm q-mt-md">
        <div class="row items-center flex flex-center">
          <q-input
            class="col"
            :disable="this.isReadonly"
            v-model="schc"
            label="Surat permohonan penerbitan SC/HC"
            accept=".pdf, .png, .jpg, .jpeg"
            outlined
            :rules="[
              val => val !== null || 'Mohon Isi'
            ]"
          >
            <template v-slot:append>
              <q-icon name="attach_file" />
            </template>
          </q-input>
          <q-btn
            class="col-1 q-ml-sm"
            label="Unduh"
            no-caps
            v-if="this.isReadonly"
            color="primary"
            style="margin-top: -20px"
            type="a"
            target="_blank"
            :href="`${$baseURL}file-okkpd/${schc}`"  />
        </div>
        <div class="row items-center flex flex-center">
          <q-input
            class="col"
            :disable="this.isReadonly"
            v-model="sppb"
            label="Upload SPPB"
            accept=".pdf, .png, .jpg, .jpeg"
            outlined
            :rules="[
              val => val !== null || 'Mohon Isi'
            ]"
          >
            <template v-slot:append>
              <q-icon name="attach_file" />
            </template>
          </q-input>
          <q-btn
            class="col-1 q-ml-sm"
            label="Unduh"
            no-caps
            v-if="this.isReadonly"
            color="primary"
            style="margin-top: -20px"
            type="a"
            target="_blank"
            :href="`${$baseURL}file-okkpd/${sppb}`"  />
        </div>
        <div class="row items-center flex flex-center">
          <q-input
            class="col"
            :disable="this.isReadonly"
            v-model="okratoksin"
            label="Upload File uji cemaran Okratoksin"
            accept=".pdf, .png, .jpg, .jpeg"
            outlined
            :rules="[
              val => val !== null || 'Mohon Isi'
            ]"
          >
            <template v-slot:append>
              <q-icon name="attach_file" />
            </template>
          </q-input>
          <q-btn
            class="col-1 q-ml-sm"
            label="Unduh"
            no-caps
            v-if="this.isReadonly"
            color="primary"
            style="margin-top: -20px"
            type="a"
            target="_blank"
            :href="`${$baseURL}file-okkpd/${okratoksin}`"  />
        </div>
        <div class="row items-center flex flex-center">
          <q-input
            class="col"
            :disable="this.isReadonly"
            v-model="aflatoksin"
            label="Upload File uji cemaran Aflatoksin"
            accept=".pdf, .png, .jpg, .jpeg"
            outlined
            :rules="[
              val => val !== null || 'Mohon Isi'
            ]"
          >
            <template v-slot:append>
              <q-icon name="attach_file" />
            </template>
          </q-input>
          <q-btn
            class="col-1 q-ml-sm"
            label="Unduh"
            no-caps
            v-if="this.isReadonly"
            color="primary"
            style="margin-top: -20px"
            type="a"
            target="_blank"
            :href="`${$baseURL}file-okkpd/${aflatoksin}`"  />
        </div>
          <div class="row items-center flex flex-center">
          <q-input
            class="col"
            :disable="this.isReadonly"
            v-model="pestisida"
            label="Upload File Uji  Residu Pestisida"
            accept=".pdf, .png, .jpg, .jpeg"
            outlined
            :rules="[
              val => val !== null || 'Mohon Isi'
            ]"
          >
            <template v-slot:append>
              <q-icon name="attach_file" />
            </template>
          </q-input>
          <q-btn
            class="col-1 q-ml-sm"
            label="Unduh"
            no-caps
            v-if="this.isReadonly"
            color="primary"
            style="margin-top: -20px"
            type="a"
            target="_blank"
            :href="`${$baseURL}file-okkpd/${pestisida}`"  />
          </div>
        <div class="row items-center flex flex-center">
          <q-input
            class="col"
            :disable="this.isReadonly"
            v-model="organoleptik"
            label="Upload File Uji  Organoleptik & Proksimat"
            accept=".pdf, .png, .jpg, .jpeg"
            outlined
            :rules="[
              val => val !== null || 'Mohon Isi'
            ]"
          >
            <template v-slot:append>
              <q-icon name="attach_file" />
            </template>
          </q-input>
          <q-btn
            class="col-1 q-ml-sm"
            label="Unduh"
            no-caps
            v-if="this.isReadonly"
            color="primary"
            style="margin-top: -20px"
            type="a"
            target="_blank"
            :href="`${$baseURL}file-okkpd/${organoleptik}`" />
        </div>
        <q-input
          :disable="this.isReadonly"
          label="Alamat Pembeli (Importir)"
          outlined
          type="textarea"
          v-model="alamat"
          :rules="[
            val => val !== null || 'Mohon Isi'
          ]"
          />
        <div class="column">
          <q-btn v-if="!this.isReadonly" type="submit" label="Kirim File" style="margin-top: -20px" color="green-10"/>
        </div>
      </div>
    </div>
  </q-page>
</template>
<script>
export default {
  data () {
    return {
      schc: null,
      sppb: null,
      okratoksin: null,
      aflatoksin: null,
      organoleptik: null,
      pestisida: null,
      alamat: '',
      isReadonly: false
    }
  },
  created () {
    // console.log(this.$route.name)
    if (this.$route.name === 'pengajuanSCHCOkkpd') {
      this.getData()
    }
  },
  methods: {
    getData () {
      // console.log('panggil')
      this.$showLoading()
      this.$axios.get(`okkpd/getPengujianLab/${this.$route.params.id}`, this.$createToken())
        .finally(() => this.$hide())
        .then((res) => {
          // console.log(res)
          const data = res.data.result
          this.schc = data.surat_sc_hc
          this.sppb = data.sppb
          this.okratoksin = data.okratoksin
          this.aflatoksin = data.aflatoksin
          this.organoleptik = data.organoleptik_proksimat
          this.pestisida = data.residu_pestisida
          this.alamat = data.alamat_pembeli
          this.isReadonly = true
        })
        .catch(() => this.$commonErrorNotif())
    },
    onSubmit () {
      this.$showLoading()
      const formData = new FormData()
      formData.append('schc', this.schc)
      formData.append('sppb', this.sppb)
      formData.append('okratoksin', this.okratoksin)
      formData.append('aflatoksin', this.aflatoksin)
      formData.append('organoleptik', this.organoleptik)
      formData.append('pestisida', this.pestisida)
      formData.append('alamat', this.alamat)
      this.$axios.put(`okkpd/pengajuan/${this.$route.params.idDetail}/${this.$route.params.id}`, formData, this.$createToken())
        .finally(() => this.$hide())
        .then((res) => {
          this.$notif(res.data.message, 'positive')
          this.$router.go(-1)
        })
        .catch(() => this.$commonErrorNotif())
    }
  }
}
</script>
