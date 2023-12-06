const { database } = require('../config/database-mysql')

async function test() {
  const [rows, d] = await database().query("select 'hello!' as message")
  
  return rows
}

async function getPosts() {
  const sql = 'SELECT * FROM pots'
  const  [rows, d] = await database().query(sql)

  return rows
}

module.exports = {
  getPosts,
  test
}
