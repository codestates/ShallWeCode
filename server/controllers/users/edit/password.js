const models = require('../../../models')
const { generateAccessToken, sendAccessToken, isAuthorized } = require('../../tokenFunctions')

module.exports = (req, res) => {

  const token = isAuthorized(req)
  if (!token) {
    return res.status(401).send({ message: '권한 없음' })
  }
  
  const { password } = req.body

  if (!password) {
    return res.status(400).send({ message: '사용하실 비밀번호를 적어주세요' })
  }

  models.passwordPatch(token.username, password, (err, result) => {
    if (err) {
      res.status(500).send({ message: '서버 에러' })
    }
    res.clearCookie('swcjwt')
    const accessToken = generateAccessToken(result[0])
    sendAccessToken(res, accessToken)
    res.status(200).send({ message: '비밀번호 변경 성공' })
  })
}