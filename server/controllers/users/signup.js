const models = require('../../models')

module.exports = (req, res) => {

    const { userid, password, nickname } = req.body

    models.signupPost(userid, password, nickname, (err, result) => {
        if (err) {
            res.status(500).send('서버 에러')
        }

        res.status(201).send('회원가입 성공')
    })
}