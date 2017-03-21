'use strict'

const axios = require('axios')
const config = require('../config')

module.exports = async () => {
  const sitemap = await axios.get(config.sitemapUrl)
  return sitemap.data
}
