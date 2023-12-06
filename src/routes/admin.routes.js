const express = require('express')
const adminRouter = express.Router()
const { isAuthenticated } = require('../libs/auth/authentication')

const url = '/admin'

adminRouter.get(url + '/home', isAuthenticated, (req, res) => {
  const user = req.session.user

  return res.render('admin/home', { user: user })
})

module.exports = adminRouter
