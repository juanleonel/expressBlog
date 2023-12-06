
const { doAuth } = require('../repository/dump.repository')

/**
 * @description
 * @param {Request} req 
 * @param {Response} res 
 * @returns 
 */
async function doLogout(req, res) {
  req.session.user = null

  return res.render('auth/login')
}

/**
 * @description
 * @param {Request} req 
 * @param {Response} res 
 * @returns 
 */
async function doAuthUser(req, res) {
  try {
    const { email, password } = req.body
    const result = await doAuth(email, password)

    if (!result) {
      return res.format({
        'text/html': () => res.redirect(303, '/auth/login-error')
      })
    }

    req.session.user = result
    return res.format({
      'text/html': () => res.redirect(303, '/admin/home')
    })
  } catch (error) {
    return res.format({
      'text/html': () => res.redirect(303, '/auth/login-error')
    })
  }
}

module.exports = {
  doAuthUser,
  doLogout
}
