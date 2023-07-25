import { boot } from 'quasar/wrappers'
import { parseDate, generateYear } from '../helper/ParseDate'

const formatNumber = (value) => {
  const val = (value / 1).toFixed(0).replace('.', '.')
  return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}

export default boot(async ({ app }) => {
  app.config.globalProperties.$getParams = (route) => {
    return {
      idRole: route.params.idRole,
      idLayanan: route.params.idLayanan
    }
  }

  app.config.globalProperties.$formatNumber = formatNumber
  app.config.globalProperties.$formatPrice = (val) => {
    return `Rp.${formatNumber(val)},00`
  }

  app.config.globalProperties.$parseDate = parseDate
  app.config.globalProperties.$generateYear = generateYear
  app.config.globalProperties.$defaultValidation = [
    val => val !== null & val !== '' || 'Mohon Isi'
  ]
})
