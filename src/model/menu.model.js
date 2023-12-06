class MenuModel {
  constructor(label, description, route, user){
    this._label = label
    this._description = description
    this._route = route
    this._user = user
  }

  set label(value) {
    this._label = value
  }

  get label() {
    return this._label
  }

  set route(value) {
    this._route = value
  }

  get route() {
    return this._route
  }

  set description(value) {
    this._description = value
  }

  get description() {
    return this._description
  }

  set user(value) {
    this._user = value
  }

  get user() {
    return this._user
  }

  toJson() {
    return {
      label: this._label,
      description: this._description,
      user: this._user,
      route: this._route
    }
  }
}

module.exports = MenuModel
