const models = require('../../models')

module.exports = (req, res) => {

  const contentId = req.query.contentId

  models.commentDetailGet(contentId, (err, result) => {
    if (err) {
      return res.status(500).send({ message: '서버 에러' })
    }

    res.status(200).send({ data: { data: result }, message: '댓글 가져오기 성공' })
  })
}