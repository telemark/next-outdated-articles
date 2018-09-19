const axios = require('axios')
const config = require('../config')

export default async () => {
  const sitemap = await axios.get(config.sitemapUrl)
  return sitemap.data
}
