const models = require('../../models')
const { generateAccessToken, sendAccessToken } = require('../tokenFunctions')

module.exports = (req, res) => {

  const { userid, password } = req.body

  // if (!userid || !password) {
  //   return res.status(400).send('모든 항목을 채워주세요')
  // }

  models.loginPost(userid, password, (err, result) => {
    if (err) {
      res.status(500).send('서버 에러')
    }
    if (!result.length) {
      res.status(404).send('로그인 실패(아이디, 비밀번호 불일치)')
    } else {
      const data = {
        userid: result[0].userid,
        picture: result[0].picture,
        nickname: result[0].nickname
      }
      const accessToken = generateAccessToken(data)
      sendAccessToken(res, accessToken)
      res.status(200).send('로그인 성공')
    }
  })
}