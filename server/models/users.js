const db = require('../db')

module.exports = {
  signup: (username, password, nickname, callback) => {

    const queryString = `INSERT INTO users (username, password, nickname) VALUES ('${username}', '${password}', '${nickname}')`

    db.query(queryString, (err, result) => {
      if (err) {
        console.log(err)
      }

      callback(err, result)
    })
  },
  signout: (username, password, callback) => {

    const queryString = `DELETE FROM users WHERE username='${username}' AND password='${password}'`

    db.query(queryString, (err, result) => {
      if (err) {
        console.log(err)
      }

      callback(err, result)
    })
  },
  login: (username, password, callback) => {

    const queryString = `SELECT * FROM users WHERE username='${username}' AND password='${password}'`

    db.query(queryString, (err, result) => {
      if (err) {
        console.log(err)
      }

      callback(err, result)
    })

  },
  passwordEdit: (username, password, callback) => {

    const queryString1 = `UPDATE users SET password='${password}' WHERE username='${username}'`

    db.query(queryString1, (err, result) => {
      if (err) {
        console.log(err)
      }

      const queryString2 = `SELECT * FROM users WHERE username='${username}'`

      db.query(queryString2, (err, result) => {
        if (err) {
          console.log(err)
        }

        callback(err, result)
      })
    })
  },
  nicknameEdit: (username, nickname, callback) => {

    const queryString1 = `UPDATE users SET nickname='${nickname}' WHERE username='${username}'`

    db.query(queryString1, (err, result) => {
      if (err) {
        console.log(err)
      }

      const queryString2 = `SELECT * FROM users WHERE username='${username}'`

      db.query(queryString2, (err, result) => {
        if (err) {
          console.log(err)
        }
        
        callback(err, result)
      })
    })
  },
  pictureEdit: (username, picture, callback) => {

    const queryString1 = `UPDATE users SET picture='${picture}' WHERE username='${username}'`

    db.query(queryString1, (err, result) => {
      if (err) {
        console.log(err)
      }

      const queryString2 = `SELECT * FROM users WHERE username='${username}'`

      db.query(queryString2, (err, result) => {
        if (err) {
          console.log(err)
        }
        
        callback(err, result)
      })
    })
  }
}