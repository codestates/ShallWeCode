const models = require('../../models')

module.exports = (req, res) => {

  const contentId = req.params.contentId

  models.detailGet(contentId, (err, result) => {
    if (err) {
      return res.status(500).send('서버 에러')
    }
    if (result.length === 0) {
      return res.status(404).send('해당 페이지가 존재하지 않습니다')
    }

    res.status(200).send({'data': result, 'message': '상세페이지 가져오기 성공'})
  })
}