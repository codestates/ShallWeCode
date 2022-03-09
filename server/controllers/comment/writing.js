const models = require('../../models')
const { isAuthorized } = require('../tokenFunctions')

module.exports = (req, res) => {

  const token = isAuthorized(req)
  if (!token) {
    return res.status(401).send({ message: '권한 없음' })
  }
  
  const contentId = req.body.contentId
  const body = req.body.body.comment

  if (!body) {
    return res.status(400).send({ message: '내용을 채워주세요' })
  }

  models.commentWritingPost(token.userId, contentId, body, (err, result) => {
    if (err) {
      return res.status(500).send({ message: '서버 에러' })
    }

    res.status(201).send({ message: '댓글 작성 성공' })
  })
}