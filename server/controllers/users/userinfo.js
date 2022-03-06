const models = require('../../models')

module.exports = (req, res) => {

    const { userid, password } = req.body

    models.userinfoPatch(userid, password, (err, result) => {
        if (err) {
            res.status(500).send('서버 에러')
        }

        res.status(200).send('회원정보 변경 성공')
    })
}

// 닉네임 변경도 필요한가 물어보기