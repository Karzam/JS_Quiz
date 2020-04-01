class Auth {
  static get = () => localStorage.getItem('auth')
  static set = token => localStorage.setItem('auth', token)
  static reset = token => localStorage.removeItem('auth')
}

export default Auth