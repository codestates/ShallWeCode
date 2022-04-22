const models = require('../../models')

module.exports = (req, res) => {

  const commentId = req.query.commentId

  models.commentDeleteDelete(commentId, (err, result) => {
    if (err) {
      return res.status(500).send({ message: '서버 에러' })
    }

    res.status(201).send({ message: '댓글 삭제 완료' })
  })
}