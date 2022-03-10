const models = require('../../../models')

module.exports = (req, res) => {

  const { username } = req.body

  models.verifyUsername(username, (err, result) => {
    if (err) {
      return res.send({ message: '서버 에러' })
    }

    res.send({ data: { data: result }, message: '아이디 중복검사 성공' })
  })
}