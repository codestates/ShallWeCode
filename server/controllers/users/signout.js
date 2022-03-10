const models = require('../../models')
const { isAuthorized } = require('../tokenFunctions')
module.exports = (req, res) => {

  const token = isAuthorized(req)
  if (!token) {
    return res.status(401).send({ message: '권한 없음' })
  }

  models.signoutDelete(token.username, (err, result) => {
    if (err) {
      res.status(500).send({ message: '서버 에러' })
    }
    res.clearCookie('swcjwt')
    res.status(200).send({ message: '회원탈퇴 완료' })
  })
}