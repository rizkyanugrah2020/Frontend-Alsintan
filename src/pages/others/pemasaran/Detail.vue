<template>
  <q-page v-if="loaded" :class="this.$q.screen.xs ? '' : 'q-px-xl'" padding style="background: #F2F7F5">
    <div class="q-pa-md bg-white">
      <div class="row">
        <div class="col-4">
          <q-img :src="`http://35.247.138.19:8080/file/api/v1/produk/foto/${data.foto[0].nama_foto}`" style="border-radius: 10px" width="100%"/>
        </div>
        <div class="col column q-pa-md q-gutter-sm">
          <span class="text-h4">{{ data.nama_produk }}</span>
          <span class="text-h5 text-weight-bold">{{ this.$formatPrice(data.harga) }}</span>
          <q-separator/>
          <span class="text-h6 text-weight-regular">{{ data.toko.nama_toko }}</span>
          <span class="text-h6 text-weight-regular">{{ data.toko.alamat }}</span>
          <q-separator/>
          <div class="q-pa-sm column">
            <q-btn :href="`https://wa.me/${data.toko.no_wa}`" color="green-10" label="Pesan Sekarang" icon="mdi-whatsapp"/>
          </div>
          <q-separator/>
          <span class="text-h5 text-weight-bold">
            Deskripsi Produk
          </span>
          <span class="text-body1">
          {{ data.deskripsi }}
          </span>
        </div>
      </div>
    </div>
  </q-page>
</template>
<script>
export default {
  data () {
    return {
      loaded: false,
      data: null
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      this.$showLoading()
      this.$api.get(`produk/${this.$route.params.id}/produk`)
        .finally(() => this.$hide())
        .then((res) => {
          this.loaded = true
          this.data = res.data
          console.log(this.data.toko.no_wa.length)
          if (this.data.toko.no_wa.length >= 0) {
            this.getNik()
          }
        })
        .catch(() => this.$commonErrorNotif())
    },
    getNik () {
      this.$showLoading()
      this.$axios.post('check/encryptionString', {
        isEnc: 0,
        string: this.data.toko.nik
      }).finally(() => this.$hide())
        .then((res) => {
          this.getMember(res.data.result.result)
        })
        .catch(() => this.$commonErrorNotif())
    },
    getMember (nik) {

    }
  }
}
</script>
