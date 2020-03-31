class Auth {
  static get = () => localStorage.getItem('auth')
  static set = token => localStorage.setItem('auth', token)
}

export default Auth