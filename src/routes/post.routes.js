const express = require('express')
const postRouter = express.Router()
const { isAuthenticated } = require('../libs/auth/authentication')

const url = '/post'

postRouter.get(url + '/index', isAuthenticated, (req, res) => {
  const user = req.session.user

  return res.render('admin/post/home', { user: user })
})

module.exports = postRouter
