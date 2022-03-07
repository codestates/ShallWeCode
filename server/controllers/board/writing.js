const models = require('../../models')

module.exports = (req, res) => {

  // 토큰 해독하여 userid 꺼내오기
  // userid 임시로 부여
  const userid = 1
  const { title, body, PRorTP, stack } = req.body

  if (!title || !body || !PRorTP || !stack) {
    return res.status(400).send({ message: '모든 항목을 채워주세요' })
  }

  models.boardWritingPost(userid, title, body, PRorTP, stack, (err, result) => {
    if (err) {
      return res.status(500).send({ message: '서버 에러' })
    }

    res.status(201).send({ message: '게시글 작성 성공' })
  })
}