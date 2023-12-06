
const express = require('express')
const { getUsers, createUser } = require('../controllers/user.controller')
const userRouter = express.Router()
const { isAuthenticated } = require('../libs/auth/authentication')


const url = '/admin/user'

userRouter.get(url + '/index', isAuthenticated, getUsers)

userRouter.get(url + '/add', isAuthenticated, (req, res) => {
  return res.render('admin/user/add')
})

userRouter.post(url + '/create', isAuthenticated, createUser)


module.exports = userRouter
