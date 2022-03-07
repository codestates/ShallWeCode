const models = require('../../models')
const { generateAccessToken, sendAccessToken } = require('../tokenFunctions')

module.exports = (req, res) => {

  const { username, password } = req.body

  if (!username || !password) {
    return res.status(400).send({ message: '모든 항목을 채워주세요' })
  }

  models.loginPost(username, password, (err, result) => {
    if (err) {
      res.status(500).send({ message: '서버 에러' })
    }
    if (!result.length) {
      res.status(404).send({ message: '로그인 실패(아이디, 비밀번호 불일치)' })
    } else {
      console.log(result[0])
      const accessToken = generateAccessToken(result[0])
      sendAccessToken(res, accessToken)
      res.status(200).send({data: {accessToken: accessToken}, message: '로그인 성공'})
    }
  })
}