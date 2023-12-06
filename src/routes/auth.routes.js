const express = require('express')
const { doAuthUser, doLogout } = require('../controllers/auth.controller')

const AuthRouter = express.Router()
const url = '/auth'

AuthRouter.get('/login*', (req, res) => {
  return res.render('auth/login')
})

AuthRouter.get(url + '/login', (req, res) => {
  return res.render('auth/login')
})

AuthRouter.get(url + '/login-error', (req, res) => {
  return res.render('auth/login-error')
})

AuthRouter.post(url + '/process-login', doAuthUser)

AuthRouter.get('/auth/logout', doLogout)

module.exports = AuthRouter
