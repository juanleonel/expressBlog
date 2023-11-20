class UserModel {
  constructor (userId, name, lastName, email, password, isActive, createdAt, updatedAt) {
    this._userId = userId,
    this._name = name
    this._lastName = lastName
    this._email = email
    this._password = password
    this._isActive = isActive
    this._createdAt = createdAt || new Date()
    this._updatedAt = updatedAt
  }

  set userId (value) {
    this._userId = value
  }

  get userId () {
    return this._userId
  }

  set name (value) {
    this._name = value
  }

  get name () {
    return this._name
  }

  set lastName (value) {
    this._lastName = value
  }

  get lastName () {
    return this._lastName
  }

  set email (value) {
    this._email = value
  }

  get email () {
    return this._email
  }

  set isActive (value) {
    this._isActive = value
  }

  get isActive () {
    return this._isActive
  }

  set password (value) {
    this._password = value
  }

  get password () {
    return this._password
  }

  set createdAt (value) {
    this._createdAt = value
  }

  get createdAt () {
    return this._createdAt
  }

  set updatedAt (value) {
    this._updatedAt = value
  }

  get updatedAt () {
    return this._updatedAt
  }

  toObject() {
    return {
      userId: this._userId,
      name: this._name,
      lastName: this._lastName,
      email: this._email,
      password: this._password,
      isActive: this._isActive,
      createdAt: this._createdAt,
      updatedAt: this._updatedAt
    }
  }
}


module.exports = {
  UserModel
}
