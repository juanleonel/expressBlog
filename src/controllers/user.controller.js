const { getAllUsers, insertUser } = require('../repository/user.repository')
const { UserModel } = require('../model/user.model')
const { UserValidate } = require('../utils/user.validate')

const columns = [{ key: 'Id', label: 'Id' }, { key: 'Name', label: 'Name' }, { key: 'Last name', label: 'Last name ' }, { key: 'Email', label: 'Email' }, { key: 'Active', label: 'Active' }]

async function getUsers(req, res) {
  try {
    const users = await getAllUsers()

    return res.render('admin/user/index', { columns: columns, users: users })
  } catch (error) {
    return res.status(500)
      .render('admin/user/index')
  }
}

async function createUser(req, res) {
  const userValidate = new UserValidate(req.body)
  try {
    // add validation
    const user = req.body
    const userModel = new UserModel()
    userModel.name = user.name
    userModel.lastName = user.lastName
    userModel.email = user.email
    userModel.createdAt = new Date()
    // encript the password
    userModel.password = user.password
    userModel.isActive = true
    if (userValidate.isValid()) {
      await insertUser(userModel)

      return res.format({
        'text/html': () => res.redirect(303, '/admin/user/index')
      })
    }

    return res.render('admin/user/add')
  } catch (error) {
    const errorResponse = {
      error: error.message,
      errors: userValidate.getErrors()
    }

    return res.status(400).render('admin/user/add', { error: errorResponse })
  }
}

module.exports = {
  getUsers,
  createUser
}
