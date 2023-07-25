<template>
  <q-page :class="this.$q.screen.xs ? '' : 'q-px-xl'" padding style="background: #F2F7F5">
    <div class="column q-pa-sm">
      <div class="text-h4 q-mb-md text-weight-bold text-green-10">
        Produk Dari e-Market
      </div>
      <div class="row">
        <div class="col-3 q-pa-sm">
          <div class="bg-white" style="border-radius: 10px">
            <div class="bg-green-10 text-white q-pa-sm" style="border-radius: 10px 10px 0px 0px">
              Filter
            </div>
            <div class="">
              <q-form>
                <div class="q-pa-sm q-gutter-sm column">
                  <q-radio color="green-10" v-model="komoditas" checked-icon="square" unchecked-icon="check_box_outline_blank" val="semua" label="Semua Kategori" />
                  <q-radio color="green-10" v-model="komoditas" checked-icon="square" unchecked-icon="check_box_outline_blank" val="pertanian" label="Pertanian & Perkebunan" />
                  <q-radio color="green-10" v-model="komoditas" checked-icon="square" unchecked-icon="check_box_outline_blank" val="peternakan" label="Peternakan" />
                  <q-radio color="green-10" v-model="komoditas" checked-icon="square" unchecked-icon="check_box_outline_blank" val="perikanan" label="Perikanan" />
                  <q-separator inset/>
                  <area-kabupaten
                    :outline="true"
                    :auto-load="true"
                    withAction
                    />
                  <q-select
                    outlined
                    label="Urutkan Harga"
                    v-model="urutkan"
                    :options="urutkanHarga"
                    option-label="name"
                    option-value="val"/>
                </div>
              </q-form>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="row">
            <div
              v-for="i in 12"
              :key="i"
              clickable
              @click="this.$router.push({ name: 'detailPemasaran', params: { id: 1 } })"
              class="col-4 q-pa-xs " style="height: 100%">
              <q-card class="my-card">
                <img src="https://cdn.quasar.dev/img/mountains.jpg">
                <q-card-section>
                  <div class="ellipsis-2-lines">BUAH JERUK SUNKIST VALENCIA PREMIUM NoBrand</div>
                  <div class="text-weight-bold">Rp 50.000</div>
                </q-card-section>

                <q-card-section class="q-pt-none column">
                  <span class="text-caption">1 Kg</span>
                  <span class="text-caption">Lampung Selatan</span>
                  <span class="text-caption">Pertanian & Perkebunan</span>
                </q-card-section>
              </q-card>
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>
<script>
export default {
  data () {
    return {
      komoditas: 'semua',
      urutkan: 'Termurah - Termahal',
      urutkanHarga: [
        {
          name: 'Termahal - Termurah',
          va: 'DESC'
        },
        {
          name: 'Termurah - Termahal',
          va: 'ASC'
        }
      ]
    }
  }
}
</script>
