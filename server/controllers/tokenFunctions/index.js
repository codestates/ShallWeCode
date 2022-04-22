require('dotenv').config();
const { sign, verify } = require('jsonwebtoken');

module.exports = {
  generateAccessToken: (data) => {
    const userInfo = {
      userId: data.id,
      username: data.username,
      picture: data.picture,
      nickname: data.nickname
    }
    return sign(userInfo, process.env.ACCESS_SECRET)
  },
  sendAccessToken: (res, accessToken) => {
    res.cookie('swcjwt', accessToken, { httpOnly: true })
  },
  isAuthorized: (req) => {
    const auth = req.headers.cookie
    if (!auth) return null
    let token = auth.split(' ')[0]
    if (token[token.length - 1] === ';') {
      token = token.substring(7, token.length - 1)
    } else {
      token = token.substring(7, token.length)
    }
    try {
      return verify(token, process.env.ACCESS_SECRET)
    } catch {
      return null
    }
  }
};
