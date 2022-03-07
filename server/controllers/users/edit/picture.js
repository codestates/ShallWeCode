const models = require('../../../models')
const { generateAccessToken, sendAccessToken, isAuthorized } = require('../../tokenFunctions')

module.exports = (req, res) => {

  const token = isAuthorized(req)
  if (!token) {
    return res.status(401).send({ message: '권한 없음' })
  }
  
  const { picture } = req.body

  if (!picture) {
    return res.status(400).send({ message: '사용하실 이미지를 첨부해주세요' })
  }

  models.picturePatch(token.username, picture, (err, result) => {
    if (err) {
      res.status(500).send({ message: '서버 에러' })
    }
    res.clearCookie('swcjwt')
    const accessToken = generateAccessToken(result[0])
    sendAccessToken(res, accessToken)
    res.status(200).send({ data: { accessToken: accessToken }, message: '프로필 사진 변경 성공' })
  })
}