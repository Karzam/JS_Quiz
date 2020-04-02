class Auth {
  static get = () => localStorage.getItem('auth')
  static set = token => localStorage.setItem('auth', token)
  static clear = token => localStorage.removeItem('auth')
}

export default Auth