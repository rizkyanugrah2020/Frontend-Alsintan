<template>
  <q-page v-if="loaded" :class="this.$q.screen.xs ? '' : 'q-px-xl'" padding style="background: #F2F7F5">
    <div>
      <div class="row">
        <div class="col-lg-8 col-md-9 col-xs-12 q-pa-sm">
          <q-img src="img/pemasaran/banner.png" height="100%"/>
        </div>
        <div class="col-lg-4 col-md-3 col-xs-12 q-pa-sm" >
          <div class="column q-pa-sm flex flex-center" style="background: #024830; border-radius: 10px; height: 100%">
            <div class="row flex flex-center items-center">
              <div class="col-auto q-pa-sm flex flex-center">
                <div class="q-mt-md border-dash flex flex-center q-pa-md" :style="this.$q.screen.xs ? 'width: 30px; height: 30px' : 'width: 60px; height: 60px'">
                  <q-icon name="shopping_cart" color="yellow-8" :size="this.$q.screen.xs ? 'xs' : 'md'" :style="this.$q.screen.xs ? 'margin-top: -8px' : 'margin-top: -5px'"/>
                </div>
              </div>
              <div class="col flex flex-center">
                <div class="text-white text-weight-bold q-mt-sm text-h6">Cara Beli di <span class="text-yellow-8">e-MARKET</span></div>
              </div>
            </div>
            <div class="q-mt-sm">
              <div
                v-for="(cara, i) in caraBeliList"
                :key="i"
                class="q-pa-md q-ma-sm row bg-white"
                style="border-radius: 10px">
                <div class="col-auto border-dash bg-white q-pa-md flex flex-center" style="width: 20px; height: 20px">
                  <span class="text-green-10 text-weight-bold" style="margin-top: -10px">{{ i+1 }}</span>
                </div>
                <div class="col column text-green-10 q-ml-sm">
                  <span class="text-weight-bold">{{ cara.title }}</span>
                  <span style="font-size: 12px">{{ cara.subtitle }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="q-pa-md q-ma-sm q-mb-md bg-white border">
        <span class="text-h6">Produk Terbaru Dari e-Pemasaran</span>
        <q-tabs
          v-model="tab"
          inline-label
          dense
          align="left"
          class="bg-white text-green-10"
          active-class="filter-class-active"
          indicator-color="transparent"
        >
          <q-tab name="tani" icon="mdi-barley" class="filter-class q-ma-sm" dense no-caps label="Pertanian & Perkebunan" />
          <q-tab name="ternak" icon="mdi-cow" class="filter-class q-ma-sm" dense no-caps label="Peternakan" />
          <q-tab name="ikan" icon="mdi-fishbowl-outline" class="filter-class q-ma-sm" dense no-caps label="Perikanan" />
        </q-tabs>
        <div class="">
          <q-scroll-area style="height: 360px; width: 100%">
            <div class="row no-wrap ">
              <div
                v-for="(data,i) in dataFull.newest"
                :key="i"
                class="col-lg-2 col-md-3 col-xs-5 q-ma-xs "
                @click="this.$router.push({ name: 'detailPemasaran', params: { id: data.produk_id } })">
                <q-card class="my-card">
                  <img :src="`http://35.247.138.19:8080/file/api/v1/produk/foto/${data.foto[0].nama_foto}`" style="width: 100%; height: 220px">
                  <q-card-section>
                    <div class="ellipsis-2-lines">{{ data.nama_produk }}</div>
                    <div class="text-weight-bold">{{ this.$formatPrice(data.harga) }}</div>
                  </q-card-section>

                  <q-card-section class="q-pt-none column">
                    <span class="text-caption">{{ data.toko.nama_toko }}</span>
                    <span class="text-caption">{{ data.toko.alamat }}</span>
                  </q-card-section>
                </q-card>
              </div>
            </div>
          </q-scroll-area>
        </div>
      </div>
      <hr>
      <div class="">
        <q-scroll-area style="height: 370px; width: 100%">
          <div class="row no-wrap">
            <div
              class="col-lg-2 col-md-3 col-xs-5 q-ma-xs "
              @click="this.$router.push({ name: 'detailPemasaran', params: { id: 1 } })" style="height: 100%;">
              <q-card style="background: #024830; color: white">
                <div class="flex flex-center">
                  <img src="img/pemasaran/pertanian.png" style="width: 70%">
                </div>
                <q-card-section>
                  <div class="text-white text-weight-bold q-mt-sm text-h6">Berbagai Produk <br> <span class="text-yellow-8">Pertanian</span></div>
                </q-card-section>

                <q-card-section :class="`column ${this.$q.screen.xs ? 'q-pt-lg ' : 'q-pt-lg'}`">
                  <q-btn @click="this.$router.push({ name: 'katalogPemasaran', params: { komoditas: 1 } })" text-color="green-10" color="yellow-8" label="Lihat Semua" no-caps/>
                </q-card-section>
              </q-card>
            </div>
            <div
              v-for="(data,i) in dataFull.section[0].produk"
              :key="i"
              class="col-lg-2 col-md-3 col-xs-5 q-ma-xs "
              @click="this.$router.push({ name: 'detailPemasaran', params: { id: 1 } })" style="height: 100%">
              <q-card class="my-card">
                <img :src="`http://35.247.138.19:8080/file/api/v1/produk/foto/${data.foto[0].nama_foto}`" style="width: 100%; height: 220px">
                <q-card-section>
                  <div class="ellipsis-2-lines">{{ data.nama_produk }}</div>
                  <div class="text-weight-bold">{{ this.$formatPrice(data.harga) }}</div>
                </q-card-section>

                <q-card-section class="q-pt-none column">
                  <span class="text-caption">{{ data.toko.nama_toko }}</span>
                  <span class="text-caption">{{ data.toko.alamat }}</span>
                </q-card-section>
              </q-card>
            </div>
          </div>
        </q-scroll-area>
      </div>
      <hr>
      <div class="">
        <q-scroll-area style="height: 370px; width: 100%">
          <div class="row no-wrap">
            <div
              class="col-lg-2 col-md-3 col-xs-5 q-ma-xs "
              @click="this.$router.push({ name: 'detailPemasaran', params: { id: 1 } })" style="height: 100%;">
              <q-card style="background: #024830; color: white">
                <div class="flex flex-center">
                  <img src="img/pemasaran/pertanian.png" style="width: 70%">
                </div>
                <q-card-section>
                  <div class="text-white text-weight-bold q-mt-sm text-h6">Berbagai Produk <br><span class="text-yellow-8">Perkebunan</span></div>
                </q-card-section>

                <q-card-section :class="`column ${this.$q.screen.xs ? 'q-pt-lg ' : 'q-pt-lg'}`">
                  <q-btn @click="this.$router.push({ name: 'katalogPemasaran', params: { komoditas: 1 } })" text-color="green-10" color="yellow-8" label="Lihat Semua" no-caps/>
                </q-card-section>
              </q-card>
            </div>
            <div
              v-for="(data,i) in dataFull.section[1].produk"
              :key="i"
              class="col-lg-2 col-md-3 col-xs-5 q-ma-xs "
              @click="this.$router.push({ name: 'detailPemasaran', params: { id: 1 } })" style="height: 100%">
              <q-card class="my-card">
                <img :src="`http://35.247.138.19:8080/file/api/v1/produk/foto/${data.foto[0].nama_foto}`" style="width: 100%; height: 220px">
                <q-card-section>
                  <div class="ellipsis-2-lines">{{ data.nama_produk }}</div>
                  <div class="text-weight-bold">{{ this.$formatPrice(data.harga) }}</div>
                </q-card-section>

                <q-card-section class="q-pt-none column">
                  <span class="text-caption">{{ data.toko.nama_toko }}</span>
                  <span class="text-caption">{{ data.toko.alamat }}</span>
                </q-card-section>
              </q-card>
            </div>
          </div>
        </q-scroll-area>
      </div>
      <hr>
      <div class="">
        <q-scroll-area style="height: 370px; width: 100%">
          <div class="row no-wrap">
            <div
              class="col-lg-2 col-md-3 col-xs-5 q-ma-xs "
              @click="this.$router.push({ name: 'detailPemasaran', params: { id: 1 } })" style="height: 100%;">
              <q-card style="background: #482802; color: white">
                <div class="flex flex-center q-pt-md">
                  <img src="img/pemasaran/peternakan.png" style="width: 70%">
                </div>
                <q-card-section>
                  <div class="text-white text-weight-bold q-mt-sm text-h6">Berbagai Produk <span class="text-yellow-8">Peternakan</span></div>
                </q-card-section>

                <q-card-section class="q-pt-lg column">
                  <q-btn @click="this.$router.push({ name: 'katalogPemasaran', params: { komoditas: 2 } })" text-color="green-10" color="yellow-8" label="Lihat Semua" no-caps/>
                </q-card-section>
              </q-card>
            </div>
            <div
              v-for="(data,i) in dataFull.section[2].produk"
              :key="i"
              class="col-lg-2 col-md-3 col-xs-5 q-ma-xs "
              @click="this.$router.push({ name: 'detailPemasaran', params: { id: 1 } })" style="height: 100%">
              <q-card class="my-card">
                <img :src="`http://35.247.138.19:8080/file/api/v1/produk/foto/${data.foto[0].nama_foto}`" style="width: 100%; height: 220px">
                <q-card-section>
                  <div class="ellipsis-2-lines">{{ data.nama_produk }}</div>
                  <div class="text-weight-bold">{{ this.$formatPrice(data.harga) }}</div>
                </q-card-section>

                <q-card-section class="q-pt-none column">
                  <span class="text-caption">{{ data.toko.nama_toko }}</span>
                  <span class="text-caption">{{ data.toko.alamat }}</span>
                </q-card-section>
              </q-card>
            </div>
          </div>
        </q-scroll-area>
      </div>
      <hr>
      <div class="">
        <q-scroll-area style="height: 370px; width: 100%">
          <div class="row no-wrap">
            <div
              class="col-lg-2 col-md-3 col-xs-5 q-ma-xs "
              @click="this.$router.push({ name: 'detailPemasaran', params: { id: 1 } })" style="height: 100%;">
              <q-card style="background: #022B48; color: white">
                <div class="flex flex-center  q-pt-md">
                  <img src="img/pemasaran/perikanan.png" style="width: 70%">
                </div>
                <q-card-section>
                  <div class="text-white text-weight-bold q-mt-sm text-h6">Berbagai Produk <span class="text-yellow-8">Perikanan</span></div>
                </q-card-section>

                <q-card-section class="q-pt-xl column">
                  <q-btn @click="this.$router.push({ name: 'katalogPemasaran', params: { komoditas: 3 } })" text-color="green-10" color="yellow-8" label="Lihat Semua" no-caps/>
                </q-card-section>
              </q-card>
            </div>
            <div
              v-for="(data,i) in dataFull.section[3].produk"
              :key="i"
              class="col-lg-2 col-md-3 col-xs-5 q-ma-xs "
              @click="this.$router.push({ name: 'detailPemasaran', params: { id: 1 } })" style="height: 100%">
              <q-card class="my-card">
                <img :src="`http://35.247.138.19:8080/file/api/v1/produk/foto/${data.foto[0].nama_foto}`" style="width: 100%; height: 220px">
                <q-card-section>
                  <div class="ellipsis-2-lines">{{ data.nama_produk }}</div>
                  <div class="text-weight-bold">{{ this.$formatPrice(data.harga) }}</div>
                </q-card-section>

                <q-card-section class="q-pt-none column">
                  <span class="text-caption">{{ data.toko.nama_toko }}</span>
                  <span class="text-caption">{{ data.toko.alamat }}</span>
                </q-card-section>
              </q-card>
            </div>
          </div>
        </q-scroll-area>
      </div>
    </div>
  </q-page>
</template>
<script>
export default {
  data () {
    return {
      loaded: false,
      tab: '',
      caraBeliList: [
        {
          title: 'Pilih Produk',
          subtitle: 'Pilih produk dari katalog e-MARKET'
        },
        {
          title: 'Chat Penjual',
          subtitle: 'Hubungi penjual dan bayar'
        },
        {
          title: 'Terima Barang',
          subtitle: 'Barang akan segera dikirim'
        }
      ],
      dataFull: null
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      this.$showLoading()
      this.$api.get('wrapper/dashboard')
        .finally(() => this.$hide())
        .then((res) => {
          this.loaded = true
          this.dataFull = res.data
        })
        .catch(() => this.$commonErrorNotif())
    }
  }
}
</script>
