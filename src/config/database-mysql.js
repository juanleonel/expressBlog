const { CONFIGURATION } = require('./configuration')
const mysqlPromise = require('mysql2/promise')

function database() {
  try {
    return mysqlPromise.createPool(CONFIGURATION)
  } catch (error) {
    throw Error('ERROR WHILE CONNECTING TO DATABASE')
  }
}

module.exports = {
  database
}
