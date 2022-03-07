const models = require('../../models')

module.exports = (req, res) => {

  const contentId = req.query.contentId
  const { title, body, PRorTP, stack } = req.body

  if (!title || !body || !PRorTP || !stack) {
    return res.status(400).send({ message: '모든 항목을 채워주세요' })
  }

  models.boardEditPatch(contentId, title, body, PRorTP, stack, (err, result) => {
    if (err) {
      return res.status(500).send({ message: '서버 에러' })
    }
 
    res.status(200).send({ message: '게시글 수정 성공' })
  })
}