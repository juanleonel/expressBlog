const { database } = require('../config/database-mysql')

async function test() {
  const [rows, d] = await database().query("select 'hello!' as message")
  
  return rows
}

async function get() {
  
}

module.exports = {
  get,
  test
}
