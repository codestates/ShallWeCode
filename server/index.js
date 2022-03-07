const express = require('express')
const cors = require('cors')
const controllers = require('./controllers')
const app = express()

app.use(express.json())
app.use(
  cors({
    origin: ['http://localhost:3000'],
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    // exposedHeaders: ['Authorization']
  })
)

app.post('/users/signup', controllers.signup)
app.post('/users/login', controllers.login)
app.post('/users/logout', controllers.logout)
app.patch('/users/pictureEdit', controllers.picture)
app.patch('/users/nicknameEdit', controllers.nickname)
app.patch('/users/passwordEdit', controllers.password)
app.delete('/users/signout', controllers.signout)

app.post('/board/writing', controllers.boardWriting)
app.get('/board/detail', controllers.boardDetail)
app.patch('/board/edit', controllers.boardEdit)
app.delete('/board/delete', controllers.boardDelete)

app.post('/comment/writing', controllers.commentWriting)
app.get('/comment/detail', controllers.commentDetail)
app.patch('/comment/edit', controllers.commentEdit)
app.delete('/comment/delete', controllers.commentDelete)

app.listen(4000, (req, res) => {
	console.log('서버 실행 중....')
})