const express = require('express')
const cors = require('cors')
const controllers = require('./controllers')
// const multer = require('multer')
const path = require('path')
const app = express()

app.use(express.json())
app.use(express.static('public'))
app.use(
  cors({
    origin: ['http://localhost:3000'],
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    // exposedHeaders: ['Authorization']
  })
)

// const storage = multer.diskStorage({
//   destination: "../public/img/",
//   filename: function (req, file, cb) {
//     cb(null, "imgfile" + Date.now() + path.extname(file.originalname))
//   }
// })

// const upload = multer({
//   storage: storage, 
//   limits: { fileSize: 1000000 }
// })

app.get('/users/auth', controllers.auth)
app.post('/users/signup', controllers.signup)
app.post('/users/login', controllers.login)
app.post('/users/logout', controllers.logout)
app.post('/users/verifyUsername', controllers.verifyUsername)
app.post('/users/verifyNickname', controllers.verifyNickname)
app.patch('/users/pictureEdit', controllers.picture)
app.patch('/users/nicknameEdit', controllers.nickname)
app.patch('/users/passwordEdit', controllers.password)
app.delete('/users/signout', controllers.signout)

app.post('/board/writing', controllers.boardWriting)
app.get('/board/detail', controllers.boardDetail)
app.patch('/board/edit', controllers.boardEdit)
app.delete('/board/delete', controllers.boardDelete)
app.get('/board/filter', controllers.boardFilter)
app.get('/board/user', controllers.boardUser)

app.post('/comment/writing', controllers.commentWriting)
app.get('/comment/detail', controllers.commentDetail)
app.patch('/comment/edit', controllers.commentEdit)
app.delete('/comment/delete', controllers.commentDelete)

app.listen(4000, (req, res) => {
	console.log('서버 실행 중....')
})