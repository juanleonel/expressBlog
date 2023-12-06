const { database } = require('../config/database-mysql')
const { UserModel } = require('../model/user.model')

const { userToModel, usersToArrayModel } = require('../utils/user.mapper')

/**
 * @description Get users with status active in true or 1.
 * @returns List of users.
 */
async function getAllUsers() {
  const [rows] = await database().query('SELECT * FROM users WHERE isActive = 1')

  return usersToArrayModel(rows)
}

/**
 * @description Save a new user.
 * @param {UserModel} user - User to save.
 * @returns A new user.
 */
async function insertUser(user) {
  const values = [user.name, user.lastName, user.email, user.password, user.isActive, user.createdAt]
  const [rows] =
    await database()
    .query("INSERT INTO users (name, lastName, email, password, isActive, createdAt) values (?,?,?,?,?,?)", values)
  user.userId = rows.insertId

  return userToModel(user)
}

/**
 * @description Update an user.
 * @param {UserModel} user - User to modified.
 * @returns
 */
async function updateUser(user) {
  const userExists = await getUserById(user.userId)

  if (!userExists) {
    throw Error('User does not exists')
  }

  userExists.userId = user.userId
  userExists.name = user.name
  userExists.lastName = user.lastName
  userExists.email = user.email
  userExists.updatedAt = new Date()
  const values = [userExists.name, userExists.lastName, userExists.email, userExists.password, userExists.updatedAt, userExists.userId]
  const sql = 'UPDATE users SET name = ?, lastName = ?, email = ?, password = ?, updatedAt = ? WHERE userId = ?'
  const [rows] =
    await database()
    .execute(sql, values)

  if (rows.affectedRows) {
    return userExists
  }

  return false
}

/**
 * @description Get user by unique identifier.
 * @param {number} id - Identifier of user.
 * @returns User found if exists, otherwise return null.
 */
async function getUserById(id) {
  const [rows] = await database().query('select * from users where userId = ?', [id])
  
  if (rows[0]) {
    return userToModel(rows[0])
  }

  return null
}

/**
 * @description Get user by unique identifier.
 * @param {number} id - Identifier of user.
 * @returns {boolean} Returns true if deactivate works, otherwise it returns false.
 */
async function deleteUserById(id) {
  const userExists = await getUserById(id)

  if (!userExists) {
    throw Error('User does not exists')
  }

  const sql = 'UPDATE users SET isActive = ? WHERE userId = ?'
  const [rows] = await database().execute(sql, [userExists.userId])

  if (rows.affectedRows) {
    return true
  }

  return false
}

module.exports = {
  deleteUserById,
  getAllUsers,
  getUserById,
  insertUser,
  updateUser
}
