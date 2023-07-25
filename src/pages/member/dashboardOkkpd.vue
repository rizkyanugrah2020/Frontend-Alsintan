<template>
  <q-page style="background: #F2F7F5">
    <q-img src="img/okkpd/background.png" :style="this.$q.screen.xs ? 'height: 600px' : 'height: 450px'">
      <div class="absolute-full text-subtitle2 flex flex-center text-center text-weight-regular column bg-transparent">
        <q-img src="img/okkpd/logo_okkpd.png" style="width: 60px; height: 60px"/>
        <span class="text-green-10 q-mt-sm">Selamat Datang di layanan pengajuan E-HC/SC,</span>
        <span class="text-h6 text-green-10 text-weight-bold text-center">Otoritas Kompeten Kemanan Pangan Daerah <br> (OKKPD)</span>
        <span class="text-green-10 q-mt-sm">Otoritas Kompeten Keamanan Pangan Daerah (OKKP-D) Lampung dibentuk guna memberikan Jaminan Mutu <br> dan Keamanan Pangan Produk Pangan Segar serta melakukan pengawasan keamanan produk pangan segar asal pertanian.</span>
        <span class="text-green-10 q-mt-sm">Jl.Beringin II No.38 Teluk Betung, Bandar Lampung <br> emai:okkpdprovlampung@gmail.com | IG:okkpdprovlampung <br> CP: Rifki (0812-7721-6993) |Nevy (0821-7645-7258)</span>
        <div class="row q-gutter-sm q-my-sm">
          <q-btn @click="this.$router.push({ name: 'memberPengajuanOkkpd', params: {idFitur: 43} })" label="Ajukan Permohonan" color="green-10"/>
          <q-btn @click="this.$router.push({ name: 'indexLayanan'})" label="Kembali Ke menu Utama" color="green-10" class="bg-white" outline/>
        </div>
        <q-btn label="Dokumen Persyaratan" @click="scrollToComponent" color="green-10" class="bg-white" icon="sticky_note_2" outline/>
      </div>
    </q-img>
    <div class="row justify-center">
      <div class="col-8 q-my-md border-shadow column items-center">
        <span class="q-my-sm text-weight-medium">Status Pengajuan Anda</span>
        <div class="row justify-evenly q-mb-sm" style="width: 100%">
          <div class="col-2 items-center text-center column q-pa-sm">
            <span class="text-h4">1</span>
            <span style="font-size: 12px">Total Pengajuan</span>
          </div>
          <div class="col-2 items-center text-center column q-pa-sm">
            <span class="text-h4">1</span>
            <span style="font-size: 12px">Kunjungan Lapangan</span>
          </div>
          <div class="col-2 items-center text-center column q-pa-sm">
            <span class="text-h4">1</span>
            <span style="font-size: 12px">Analisa hasil lab</span>
          </div>
          <div class="col-2 items-center text-center column q-pa-sm">
            <span class="text-h4">1</span>
            <span style="font-size: 12px">Cetak Sertifikat</span>
          </div>
          <div class="col-2 items-center text-center column q-pa-sm">
            <span class="text-h4">1</span>
            <span style="font-size: 12px">Gagal Sertifikasi</span>
          </div>
        </div>
      </div>
    </div>
    <div class="text-h5 text-weight-bold text-center text-green-10">
      Proses Pengambilan Sampel
    </div>
    <div class="text-center text-green-10">
      Tahapan dalam pengajuan sampel dari pemohon kepada OKKP-D
    </div>
    <div class="row q-my-md">
      <div
        v-for="(tahapan, index) in tahapans"
        :key="index"
        class="col-3 q-pa-sm" >
        <div class="border-shadow q-pa-md column" style="height: 100%">
          <div class="bg-green-7 text-white flex flex-center items-center" style="border-radius: 100px; width: 30px; height: 30px;">
            <span class="text-weight-bold">0{{ index + 1 }}</span>
          </div>
          <div class="q-mt-sm">{{ tahapan.title }}</div>
          <div class="text-green-8 text-weight-regular" style="font-size: 13px">{{ tahapan.sub }}</div>
        </div>
      </div>
    </div>
    <div class="bg-green-10 text-white row q-pa-md" id="myComponent">
      <div class="col column">
        <span class="text-h5">Proses Permohonan HC/SC</span>
        <span> 1.Pelaku usaha mengajukan permohonan untuk pembuatan Sanitary Certificate (HC) <br>
            2.OKKP-D mengeluarkan tanda terima permohonan kepada pelaku usaha <br>
            3.Pelaku usaha melampirkan hasil uji laboratorium sampel yang telah dikeluarkan oleh laboratorium <br>
            4.OKKP-D membuat tinjauan hasil uji berdasarkan hasil uji laboratorium <br>
            5.Blanko HC/SC disampaikan kepada pelaku usaha untuk koreksi,kemudian draft yang telah dikoreksi pelaku usaha disampaikan kembali ke OKKP-D <br>
            6.OKKP-D mengeluarkan sertifikat dan disampaikan ke pelaku usaha <br>
            7.Pelaku usaha mengisi form kepuasan pelanggan <br></span>
      </div>
      <div class="col">
        <div class="q-ma-sm column q-pa-sm border-shadow text-green-10">
          <span class="text-weight-medium">Dokumen Persyaratan Pengambilan Sampel</span>
          <li>Surat Permohonan pengambilan sampel | <a href="">(Unduh PDF)</a> <a href="">(Unduh Word)</a> </li>
          <li>Informasi Produk | <a href="">(Unduh PDF)</a> <a href="">(Unduh Word)</a> </li>
          <li>Dokumen eksport /Shipping Instruction (SI)</li>
        </div>
        <div class="q-ma-sm column q-pa-sm border-shadow text-green-10">
          <span class="text-weight-medium">Dokumen Persyaratan Pengambilan Sampel</span>
          <li>Surat Permohonan Penerbitan SC/HC</li>
          <li>SPPB</li>
          <li>Laporan Hasil Uji Dari Laboratorium</li>
        </div>
      </div>
    </div>
    <div class="bg-yellow-8 text-center text-weight-regular q-pa-sm" style="color: white;">
      <span>Copyright © 2023 Kartu Petani Berjaya. All Right Reserved</span>
    </div>
  </q-page>
</template>
<script>
export default {
  data () {
    return {
      tahapans: [
        {
          title: 'Pengajuan Permohonan',
          sub: 'Pelaku usaha mengajukan permohonan pengambilan sampel kepada OKKP-D'
        },
        {
          title: 'Pengeluaran Tanda Terima',
          sub: 'OKKP-D mengeluarkan tanda terima permohonan kepada pelaku usaha'
        },
        {
          title: 'Pengeluaran Surat Perintah Tugas',
          sub: 'Kepala OKKP-D mengeluarkan surat perintah tugas untuk pengambilan sampel'
        },
        {
          title: 'Pengambilan Sampel',
          sub: 'Tim yang ditunjuk sesuai surat perintah tugas untuk pengambilan sampel membuat blanko rencana pengambilan contoh'
        },
        {
          title: 'Pembuatan Blanko Berita Acara',
          sub: 'Tim membuat blanko berita acara pengambilan contoh'
        },
        {
          title: 'Pembuatan Surat Pengantar Lab',
          sub: 'Tim membuat surat pengantar uji laboratorium'
        }
      ]
    }
  },
  methods: {
    scrollToComponent () {
      const element = document.getElementById('myComponent')
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }
}
</script>
