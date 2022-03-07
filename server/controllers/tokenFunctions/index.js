require('dotenv').config();
const { sign, verify } = require('jsonwebtoken');

module.exports = {
  generateAccessToken: (data) => {
    const userinfo = {
      username: data.username,
      picture: data.picture,
      nickname: data.nickname
    }
    return sign(userinfo, process.env.ACCESS_SECRET)
  },
  sendAccessToken: (res, accessToken) => {
    res.cookie('swcjwt', accessToken, { httpOnly: true })
  }
  // isAuthorized: (req) => {
  //   const auth = req.headers.cookie
  //   console.log("test : ",auth)
  //   if (!auth) return null
  //   let token = auth.split(' ')[0]
  //   if (token[token.length - 1] === ';') {
  //     token = token.substring(4, token.length - 1)
  //   } else {
  //     token = token.substring(4, token.length)
  //   }
  //   try {
  //     return verify(token, process.env.ACCESS_SECRET)
  //   } catch {
  //     return null
  //   }
  // }
};
