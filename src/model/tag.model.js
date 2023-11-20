class TagModel {
  constructor (Id, title, description, userId, isActive, createdAt, updatedAt) {
    this._Id = Id
    this._title = title
    this.description = description
    this._userId = userId
    this._isActive = isActive
    this._created_at = createdAt || new Date()
    this._updated_at = updatedAt
  }

  set id (value) {
    this._id = value
  }

  get id () {
    return this._id
  }

  set title (value) {
    this._title = value
  }

  get title () {
    return this._title
  }

  set description (value) {
    this._description = value
  }

  get description () {
    return this._description
  }

  set tags (value) {
    this._tags = value
  }

  get tags () {
    return this._tags
  }

  set userId (value) {
    this._userId = value
  }

  get userId () {
    return this._userId
  }

  set createdAt (value) {
    this._created_at = value
  }

  get createdAt () {
    return this._created_at
  }

  set updatedAt (value) {
    this._updated_at = value
  }

  get updatedAt () {
    return this._updated_at
  }

  toJson() {
    return {
      title: this._title,
      summary: this._summary,
      tags: this._tags,
      userId: this._userId,
      isActive: this._isActive,
      createdAt: this._created_at,
      updatedAt: this._updated_at
    }
  }
}

module.exports = {
  TagModel
}
