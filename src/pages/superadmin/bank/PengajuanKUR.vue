<template>
  <q-page padding>
    <kur-page
      detailRoute="detailKURSuperAdmin"
      statusTolak="12"
      statusKonfirmasi="11"
      :endPoint="`kur/pengajuan-wilayah-dinas-kpb-center`"
      :statusOn="11"
    />
  </q-page>
</template>
<script>
import kurPage from '../../sharedpages/kur/Index.vue'
export default {
  components: {
    kurPage
  }
}
</script>
