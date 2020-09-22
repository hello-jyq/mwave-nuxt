module.exports = {
  mode: 'universal',
  head: {
    title: 'Vue Nuxt',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ]
  },
  modules:[
    '@nuxtjs/axios'
  ],
  plugins: ["@/plugins/element-ui"],
  build: {
    vendor: ['axios'],
    publicPath: `/${require('./secrets.json').NODE_ENV}/_nuxt/`,
    babel:{
      plugins: [
        [
          "component",
          {
            "libraryName": "element-ui",
            "styleLibraryName": "theme-chalk"
          }
        ]
      ]
    }
  },
  srcDir: 'client/',
  performance: {
    gzip: false
  },
  router: {
    base: `/`
  },
  css: ["~/assets/styles/main.css"],
  dev: false
}
