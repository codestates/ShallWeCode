const models = require('../../../models')
const { generateAccessToken, sendAccessToken } = require('../../tokenFunctions')

module.exports = (req, res) => {

  const { userid, picture } = req.body

  if (!picture) {
    return res.status(400).send('사용하실 이미지를 첨부해주세요')
  }

  models.picturePatch(userid, picture, (err, result) => {
    if (err) {
      res.status(500).send('서버 에러')
    }
    res.clearCookie('swcjwt')
    const accessToken = generateAccessToken(result[0])
    sendAccessToken(res, accessToken)
    res.status(200).send('프로필 사진 변경 성공')
  })
}