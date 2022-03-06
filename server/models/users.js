const db = require('../db')

module.exports = {
  signup: (userid, password, nickname, callback) => {

    const queryString = `INSERT INTO users (userid, password, nickname) VALUES ('${userid}', '${password}', '${nickname}')`

    db.query(queryString, (err, result) => {
      if (err) {
        console.log(err)
      }

      callback(err, result)
    })
  },
  signout: (userid, password, callback) => {
    
    const queryString = `DELETE FROM users WHERE userid='${userid}' AND password='${password}'`

    db.query(queryString, (err, result) => {
      if (err) {
        console.log(err)
      }

      callback(err, result)
    })
  },
  login: (userid, password, callback) => {

    const queryString = `SELECT * FROM users WHERE userid='${userid}' AND password='${password}'`

    db.query(queryString, (err, result) => {
      if (err) {
        console.log(err)
      }

      callback(err, result)
    })

  },
  userinfo: (userid, password, callback) => {

    const queryString = `UPDATE users SET password='${password}' WHERE userid='${userid}'`

    db.query(queryString, (err, result) => {
      if (err) {
        console.log(err)
      }

      callback(err, result)
    })
  }
}