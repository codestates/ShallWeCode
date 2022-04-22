const models = require('../../models')

module.exports = (req, res) => {
  const contentId = req.query.contentId

  models.boardDeleteDelete(contentId, (err, result) => {
    if (err) {
      return res.status(500).send({ message: '서버 에러' })
    }
    if (result.affectedRows === 0) {
      return res.status(404).send({ message: '해당 게시글이 존재하지 않습니다' })
    }

    res.status(200).send({ message: '게시글 삭제 성공' })
  })
}