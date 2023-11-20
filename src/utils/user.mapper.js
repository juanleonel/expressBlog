const { UserModel } = require('../model/user.model')
const { toBoolean } = require('./general-functions')

function usersToArrayModel(users) {
  const _modelList = []

  for (const user of users) {
    _modelList.push(userToModel(user))
  }

  return _modelList
}

function userToModel(user) {
  const userModel = new UserModel(
    user.userId,
    user.name,
    user.lastName,
    user.email,
    user.password,
    toBoolean(user.isActive[0]),
    user.createdAt,
    user.updatedAt
  )

  return userModel.toObject()
}

module.exports = {
  usersToArrayModel,
  userToModel
}
