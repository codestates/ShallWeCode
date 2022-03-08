const models = require('../../models')

module.exports = (req, res) => {

  const contentId = req.query.contentId

  models.boardDetailGet(contentId, (err, result) => {
    if (err) {
      return res.status(500).send({ message: '서버 에러' })
    }
    if (result.length === 0) {
      return res.status(404).send({ message: '해당 페이지가 존재하지 않습니다' })
    }
    let stack = [];
    for (let i of result) {
      stack.push(i.stack)
    }
    const { users_id, title, body, created_at, PRorTP, picture, nickname } = result[0]
    const data = {
      title,
      body,
      created_at,
      PRorTP,
      picture,
      nickname,
      userId: users_id,
      stack: stack
    }
    // result 객체로 수정 요망
    res.status(200).send({ data: data, message: '상세페이지 가져오기 성공' })
  })
}