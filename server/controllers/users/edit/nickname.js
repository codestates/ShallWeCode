const models = require('../../../models')
const { generateAccessToken, sendAccessToken } = require('../../tokenFunctions')

module.exports = (req, res) => {

  const { userid, nickname } = req.body

  if (!nickname) {
    return res.status(400).send('사용하실 닉네임을 적어주세요')
  }

  models.nicknamePatch(userid, nickname, (err, result) => {
    if (err) {
      res.status(500).send('서버 에러')
    }
    res.clearCookie('swcjwt')
    const accessToken = generateAccessToken(result[0])
    sendAccessToken(res, accessToken)
    res.status(200).send('닉네임 변경 성공')
  })
}