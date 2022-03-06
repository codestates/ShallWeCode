const models = require('../../models')

module.exports = (req, res) => {

  const contentId = req.params.contentId

  models.deleteDelete(contentId, (err, result) => {
    if (err) {
      return res.status(500).send('서버 에러')
    }
    if (result.affectedRows === 0) {
      return res.status(404).send('해당 게시글이 존재하지 않습니다')
    }

    res.status(200).send('게시글 삭제 성공')
  })
}