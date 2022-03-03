const models = require('../../models')

module.exports = (req, res) => {

    const {userid, password, nickname} = req.body

    if (!userid || !password || !nickname) {
        return res.status(400).send('모든 항목을 채워주세요')
    }

    models.userspost(userid, password, nickname, (err, result) => {
        if (err) {
            res.status(500).send('서버 에러')
        }

        res.status(201).send('회원가입 성공')
    })
}