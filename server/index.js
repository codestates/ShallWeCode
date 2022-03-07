const express = require('express')
const controllers = require('./controllers')
const app = express()

app.use(express.json())
app.post('/users/signup', controllers.signup)
app.post('/users/login', controllers.login)
app.post('/users/logout', controllers.logout)
app.patch('/users/userinfo', controllers.userinfo)
app.delete('/users/signout', controllers.signout)

app.post('/board/writing', controllers.writing)
app.get('/board/detail/:contentId', controllers.detail)
app.patch('/board/edit/:contentId', controllers.edit)
app.delete('/board/delete/:contentId', controllers.delete)

app.listen(3000, (req, res) => {
	console.log('서버 실행 중....')
})