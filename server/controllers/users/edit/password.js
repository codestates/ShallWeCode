const models = require('../../../models')
const { generateAccessToken, sendAccessToken } = require('../../tokenFunctions')

module.exports = (req, res) => {

  const { userid, password } = req.body

  if (!password) {
    return res.status(400).send('사용하실 비밀번호를 적어주세요')
  }

  models.passwordPatch(userid, password, (err, result) => {
    if (err) {
      res.status(500).send('서버 에러')
    }
    res.clearCookie('swcjwt')
    const accessToken = generateAccessToken(result[0])
    sendAccessToken(res, accessToken)
    res.status(200).send('비밀번호 변경 성공')
  })
}