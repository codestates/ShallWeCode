const models = require('../../models')

module.exports = (req, res) => {

  const contentId = req.query.contentId
  const { userid, body } = req.body

  if (!body) {
    return res.status(400).send({ message: '내용을 채워주세요' })
  }

  models.commentWritingPost(userid, contentId, body, (err, result) => {
    if (err) {
      return res.status(500).send({ message: '서버 에러' })
    }

    res.status(201).send({ message: '댓글 작성 성공' })
  })
}