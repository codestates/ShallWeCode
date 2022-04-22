const models = require('../../models')

module.exports = (req, res) => {

  const { username, password, nickname } = req.body

  models.signupPost(username, password, nickname, (err, result) => {
    if (err) {
      res.status(500).send({ message: '서버 에러' })
    }

    res.status(201).send({ message: '회원가입 성공' })
  })
}