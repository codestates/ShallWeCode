const models = require('../../models')

module.exports = (req, res) => {
  const { PRorTP, userId } = req.query

  models.boardUserGet(PRorTP, userId, (err, result) => {
    if (err) {
      return res.status(500).send({ message: '서버 에러' })
    }
    if (result.length === 0) {
      return res.status(404).send({ message: '게시물이 존재하지 않습니다' })
    }
    let trimResult = [];
    for (let d of result) {
      if (!trimResult.length) {
        trimResult.push(d)
        d.stack = [d.stack]
      } else {
        if (trimResult[trimResult.length - 1].id === d.id) {
          trimResult[trimResult.length - 1].stack.push(d.stack)
        } else {
          d.stack = [d.stack]
          trimResult.push(d)
        }
      }
    }
    res.status(200).send({ data: { data: trimResult }, message: '필터링된 페이지 가져오기 성공' })
  })
}