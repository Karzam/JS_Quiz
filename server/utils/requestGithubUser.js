const requestGithubToken = credentials =>
  fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(credentials)
  })
    .then(res => res.json())
    .catch(error => {
      throw new Error(JSON.stringify(error))
    })

const requestGithubUserAccount = async token => {
  const res = await fetch(`https://api.github.com/user?access_token=${token}`)

  return res.json()
}

const requestGithubUser = async credentials => {
  const { access_token } = await requestGithubToken(credentials)

  return requestGithubUserAccount(access_token)
}

module.exports.requestGithubUser = requestGithubUser