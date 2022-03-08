const models = require('../../models')

module.exports = (req, res) => {

  models.boardThumbnailGet((err, result) => {
    if (err) {
      return res.status(500).send({ message: '서버 에러' })
    }
    if (result.length === 0) {
      return res.status(404).send({ message: '게시물이 존재하지 않습니다.' })
    }
    res.status(200).send({ data: { data: result }, message: '전체페이지 가져오기 성공' })
  })
}