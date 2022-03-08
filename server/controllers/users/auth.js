const models = require('../../models')
const { isAuthorized } = require('../tokenFunctions')

module.exports = (req, res) => {
  const accessTokenData = isAuthorized(req)
  if (!accessTokenData) {
    return res.status(401).send({ data: null, message: '권한 없음' })
  }

  const { userId } = accessTokenData

  models.authGet(userId, (err, result) => {
    if (err) {
      res.status(500).send({ message: '서버 에러' })
    }
    if (!result.length) {
      res.status(401).send({ data: null, message: '권한 없음' })
    } else {
      console.log(result)
      res.status(200).send({ data: { data: result }, message: '권한 부여 완료'})
    }
  })
}
