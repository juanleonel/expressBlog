const express = require('express')
const { create } = require('express-handlebars')
const weatherMiddleware = require('./src/libs/weather')
const handlebars = require('handlebars')
const handlers = require('./src/libs/handlers')
const bodyParser = require('body-parser')

const { credentials } = require('./src/config/config')

const cookieParser = require('cookie-parser')
const session = require('express-session')

const { isAuthenticated } = require('./src/libs/auth/authentication')
const authRouter = require('./src/routes/auth.routes')
const adminRouter = require('./src/routes/admin.routes')
const userRouter = require('./src/routes/user.routes')

const port = process.env.PORT || 3000
const app = express()

app.use(cookieParser())
app.use(session({
  secret: 'Cat',
  resave: false,
  saveUninitialized: false,
}))

handlebars.registerHelper('helperUpperCase', function(value) {
  return value.toUpperCase();
})
const hbs = create({
  helpers: {
    boo() { return 'BOOO!, como estas' },
    section (name, options) {
      if(!this._sections) this._sections = {}
      this._sections[name] = options.fn(this)
      return null
    }
  }
})
app.use(weatherMiddleware)
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', './src/views');
app.use(express.static(__dirname + '/src/public'))
app.use(bodyParser.urlencoded({ extended: true }))

app.use(authRouter)
app.use(adminRouter)
app.use(userRouter)

app.get('/', isAuthenticated, handlers.home)
app.get('/about', isAuthenticated, handlers.about)

app.get('/thank-you', isAuthenticated, (req, res) => {
  if (req.session.user) {
    const user = req.session.user
    return res.render('thank-you', { user: user })
  }

  return res.render('auth/login')
})


// custom 404 page
// app.use(handlers.notFound)
// // custom 500 page
// app.use(handlers.serverError)

app.listen(port, () => {
  console.log(`Express started on http://localhost:${port}; ` + `press Ctrl-C to terminate.`)
})
