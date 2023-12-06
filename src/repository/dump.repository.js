async function doAuth(userName, password) {
  const defaultEmail = 'juan@correo.com'
  const defaultPassword = '12345'
  if (userName === defaultEmail && password === defaultPassword) {
    return Promise.resolve({
      userName,
      password
    })
  }

  return undefined
}

module.exports = {
  doAuth
}
