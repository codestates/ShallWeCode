const models = require('../../models')

module.exports = (req, res) => {

  const { title, body, PRorTP, stack } = req.body

  if (!title || !body || !PRorTP || !stack) {
    return res.status(400).send('모든 항목을 채워주세요')
  }

  models.writingPost(title, body, PRorTP, stack, (err, result) => {
    if (err) {
      return res.status(500).send('서버 에러')
    }

    res.status(201).send('게시글 작성 성공')
  })
}