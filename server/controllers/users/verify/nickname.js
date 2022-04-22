const models = require('../../../models')

module.exports = (req, res) => {

  const { nickname } = req.body

  models.verifyNickname(nickname, (err, result) => {
    if (err) {
      return res.send({ message: '서버 에러' })
    }

    res.send({ data: { data: result }, message: '닉네임 중복검사 성공' })
  })
}