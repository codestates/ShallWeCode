const fs = require('fs');
const http = require('http');
const https = require('https');
const express = require('express')
const cors = require('cors')
const controllers = require('./controllers')
const path = require('path')
const app = express()

// app.all('*', (req, res, next) => {
//   let protocol = req.headers['x-forwarded-proto'] || req.protocol;
//   if (protocol === 'https') next()
//   else {
//     let from = `${protocol}://${req.hostname}${req.url}`;
//     let to = `https://${req.hostname}${req.url}`;

//     console.log(`[${req.method}]: ${from} -> ${to}`)
//     res.redirect(to)
//   };
// });

// const privateKey = fs.readFileSync('/etc/letsencrypt/live/www.shallwecode.kro.kr/privkey.pem', 'utf-8');
// const certificate = fs.readFileSync('/etc/letsencrypt/live/www.shallwecode.kro.kr/cert.pem', 'utf-8');
// const ca = fs.readFileSync('/etc/letsencrypt/live/www.shallwecode.kro.kr/chain.pem', 'utf-8');

// const credentials = {
//   key : privateKey,
//   cert : certificate,
//   ca : ca
// };

// const httpsServer = https.createServer(credentials, app);

const httpServer = http.createServer(app);

app.use(express.json())
// app.use(express.static('public'))
app.use(express.static(path.join(__dirname, '../client/build')))
app.use(
  cors({
    origin: ['http://localhost:3000', 'http://www.shallwecode.kro.kr', 'https://www.shallwecode.kro.kr'],
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  })
)

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

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

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

httpServer.listen(4000, () => {
  console.log(`HTTP Server running on port 4000`)
});

// httpsServer.listen(443, () => {
//   console.log('HTTPS Server running on port 443')
// });