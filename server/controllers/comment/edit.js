const models = require('../../models')

module.exports = (req, res) => {

  const commentId = req.body.commentId
  const body = req.body.body.comment
  if (!body) {
    return res.status(400).send({ message: '내용을 작성해주세요' })
  }

  models.commentEditPatch(commentId, body, (err, result) => {
    if (err) {
      return res.status(500).send({ message: '서버 에러' })
    }

    res.status(201).send({ message: '댓글 수정 완료' })
  })
}