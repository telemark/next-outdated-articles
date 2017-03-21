'use strict'

function daysBetween (date1, date2) {
  return Math.floor((date1 - date2) / (1000 * 60 * 60 * 24))
}

function setAge (dateString) {
  const today = new Date()
  const articleDate = new Date(dateString)
  const age = daysBetween(today, articleDate)
  return age
}

module.exports = input => {
  const limitDays = parseInt(input.limitDays, 10)
  const filtered = input.data.map(line => Object.assign(line, {age: setAge(line.lastmod)}))
                    .filter(line => line.age > limitDays)
  return filtered
}
