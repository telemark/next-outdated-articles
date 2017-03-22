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
    result = path.indexOf(showOnly) > 1
  }
  return result
}

module.exports = input => {
  const limitDays = parseInt(input.limitDays, 10)
  const showOnly = input.showOnly
  const filtered = input.data.map(line => Object.assign(line, {age: setAge(line.lastmod)}))
                    .filter(line => line.age > limitDays)
                    .filter(line => showOnlyFilter(line.loc, showOnly))

  return filtered
}
