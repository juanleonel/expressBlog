const express = require('express')
const { create } = require('express-handlebars')
const weatherMiddleware = require('./src/libs/weather')
const handlebars = require('handlebars')
const handlers = require('./src/libs/handlers')
const bodyParser = require('body-parser')

const { credentials } = require('./src/config/config')

const cookieParser = require('cookie-parser')
const session = require('express-session')
const { doAuth } = require('./src/repository/dump.repository')
const { isAuthenticated } = require('./src/libs/auth/authentication')

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

app.get('/', isAuthenticated, handlers.home)
app.get('/about', isAuthenticated, handlers.about)

app.get('/login*', (req, res) => {
  return res.render('auth/login')
})
app.get('/auth/login', (req, res) => {
  return res.render('auth/login')
})
app.get('/auth/login-error', (req, res) => {
  return res.render('auth/login-error')
})

app.post('/auth/process-login', async (req, res) => {
  try {
    const { email, password } = req.body
    const result = await doAuth(email, password)

    if (!result) {
      return res.format({
        'text/html': () => res.redirect(303, '/auth/login-error')
      })
    }

  //  return res.format({
  //     // 'text/html': () => {
  //     //   res.send('<b>hi there</b>');
  //     // },
  //     'application/json': () => {
  //       res.json({ message: 'hi there' });
  //     }
  //   });

    // Redirect to the view
    req.session.user = result
    return res.format({
      'text/html': () => res.redirect(303, '/thank-you')
    })
  } catch (error) {
    console.log(error)
    return res.format({
      'application/json': () => res.status(500).json({
      error: 'error saving contact information' }),
    })
    // res.format({'text/plain': 'hi there',
    // 'text/html': '<b>hi there</b>'});

    // return res.format({
    //   'text/html': () => res.redirect(303, 'auth/login-error'),
    //   'application/json': () => res.status(500).json({
    //   error: 'error saving contact information' }),
    // })
  }
})

app.get('/auth/logout', (req, res, next) => {
  req.session.user = null

  return res.render('auth/login')
})

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
