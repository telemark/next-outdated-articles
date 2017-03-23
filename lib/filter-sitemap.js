'use strict'

function daysBetween (date1, date2) {
  return Math.floor((date1 - date2) / (1000 * 60 * 60 * 24))
}

function setAge (dateString) {
  const today = new Date()
  const articleDate = new Date(dateString)
  return daysBetween(today, articleDate)
}

function showOnlyFilter (path, showOnly) {
  let result = true
  if (showOnly && showOnly.length > 0) {
    result = path.indexOf(showOnly) > -1
  }
  return result
}

function skipMe (path, skips) {
  const lines = skips.filter(line => line.length > 0)
  let result = true
  if (lines.length > 0) {
    const filtered = lines.map(line => path.indexOf(line) > -1)
    result = !filtered.includes(true)
  }
  return result
}

module.exports = input => {
  const limitDays = parseInt(input.limitDays, 10)
  const showOnly = input.showOnly
  const filterBy = input.filterBy.split(',').map(filters => filters.trim())
  const filtered = input.data.map(line => Object.assign(line, {age: setAge(line.lastmod)}))
                    .filter(line => line.age > limitDays)
                    .filter(line => showOnlyFilter(line.loc, showOnly))
                    .filter(line => skipMe(line.loc, filterBy))

  return filtered
}
