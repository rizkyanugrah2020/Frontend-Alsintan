// change this file name to config.js
const config = {
  dev: {
    baseURL: 'http://192.168.1.35:9090/api/v1',
    urlPemasaran: 'http://35.247.138.19:8080/web/api/v1/'
  },
  production: {
    baseURL: 'https://api.e-kpb.lampungprov.go.id:9068/api/v1/',
    urlPemasaran: 'http://35.247.138.19:8080/web/api/v1/'
  }
}
export default config.production
