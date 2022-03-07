const models = require('../../models')

module.exports = (req, res) => {

  const { username, password } = req.body

  if (!username || !password) {
    return res.status(400).send({ message: '모든 항목을 채워주세요' })
  }

  models.signoutDelete(username, password, (err, result) => {
    if (err) {
      res.status(500).send({ message: '서버 에러' })
    }
    res.clearCookie('swcjwt')
    res.status(200).send({ message: '회원탈퇴 완료' })
  })
}