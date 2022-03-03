require('dotenv').config()
const fs = require('fs')
const http = require('http')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const express = require('express')
const app = express()

// const controllers = require('./controllers')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(
  cors({
    origin: ['http://localhost:3000'],
    credentials: true,
    methods: ['GET', 'POST', 'OPTIONS']
  })
)
app.use(cookieParser())
app.get('/', (req, res) => {
  res.send("서버 테스트")
})

const HTTP_PORT = 4000

const server = app.listen(HTTP_PORT, () => console.log('http server running'))

module.exports = server
