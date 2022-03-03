const express = require('express')
const controllers = require('./controllers')
const app = express()

app.use(express.json())
app.post('/signup', controllers.signup)

app.listen(3000, (req, res) => {
    console.log('서버 실행 중....')
})