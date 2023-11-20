class PostModel {
  constructor (title, summary, tags, userId, isActive, createdAt, updatedAt) {
    this._title = title
    this._summary = summary
    this._tags = tags
    this._userId = userId
    this._isActive = isActive
    this._created_at = createdAt || new Date()
    this._updated_at = updatedAt
  }

  set title (value) {
    this._title = value
  }

  get title () {
    return this._title
  }

  set summary (value) {
    this._summary = value
  }

  get summary () {
    return this._summary
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

  set created_at (value) {
    this._created_at = value
  }

  get created_at () {
    return this._created_at
  }

  set updated_at (value) {
    this._updated_at = value
  }

  get updated_at () {
    return this._updated_at
  }

  toJson() {
    return {
      title: this._title,
      summary: this._summary,
      tags: this._tags,
      userId: this._userId,
      isActive: this._isActive,
      created_at: this._created_at,
      updated_at: this._updated_at
    }
  }
}

module.exports = {
  PostModel
}
