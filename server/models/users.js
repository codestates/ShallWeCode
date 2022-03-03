const db = require('../db')

module.exports = {
  post: (userid, password, nickname, callback) => {

    const queryString = `INSERT INTO users (userid, password, nickname) VALUES ('${userid}', '${password}', '${nickname}')`

    db.query(queryString, (err, result) => {
      if (err) {
        console.log(err)
      }

      callback(err, result)
    })
  }
}