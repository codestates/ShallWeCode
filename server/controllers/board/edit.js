const models = require('../../models')

module.exports = (req, res) => {

  const contentId = req.params.contentId
  const { title, body, PRorTP, stack } = req.body

  if (!title || !body || !PRorTP || !stack) {
    return res.status(400).send('모든 항목을 채워주세요')
  }

  models.editPatch(contentId, title, body, PRorTP, stack, (err, result) => {
    if (err) {
      return res.status(500).send('서버 에러')
    }
 
    res.status(200).send({'data': result, 'message': '게시글 수정 성공'})
  })
}