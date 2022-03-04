const express = require('express')
const controllers = require('./controllers')
const app = express()

app.use(express.json())
app.post('/users/signup', controllers.signup)
app.post('/users/login', controllers.login)
app.post('/users/logout', controllers.logout)
app.delete('/users/signout', controllers.signout)

app.listen(3000, (req, res) => {
    console.log('서버 실행 중....')
})