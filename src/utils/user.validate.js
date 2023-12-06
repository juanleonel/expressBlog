const { isEmpty } = require("./general-functions")

class UserValidate {
  constructor (user) {
    this._user = user
    this.errors = []
  }

  isValid() {
    if (isEmpty(this._user.name)) {
      this.errors.push('Name is required')
    }

    if (isEmpty(this._user.lastName)) {
      this.errors.push('Last name is required')
    }

    if (isEmpty(this._user.email)) {
      this.errors.push('Email is required')
    }

    if (this.errors.length) {
      throw Error('USER_INVALID ')
    }

    return true
  }

  getErrors() {
    return this.errors
  }

  cleanErrors() {
    this.errors = []
  }
}

module.exports = {
  UserValidate
}