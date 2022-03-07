const models = require('../../models')
const { isAuthorized } = require('../tokenFunctions')

module.exports = (req, res) => {

  const token = isAuthorized(req)
  if (!token) {
    return res.status(401).send({ message: '권한 없음' })
  }
  
  const { title, body, PRorTP, stack } = req.body

  if (!title || !body || !PRorTP || !stack) {
    return res.status(400).send({ message: '모든 항목을 채워주세요' })
  }

  models.boardWritingPost(token.userid, title, body, PRorTP, stack, (err, result) => {
    if (err) {
      return res.status(500).send({ message: '서버 에러' })
    }

    res.status(201).send({ message: '게시글 작성 성공' })
  })
}