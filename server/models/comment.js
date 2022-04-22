const db = require('../db')

module.exports = {
  writing: (userId, contentId, body, callback) => {

    const queryString = `INSERT INTO comments (users_id, contents_id, body) VALUES ('${userId}', '${contentId}', '${body}')`

    db.query(queryString, (err, result) => {
      if (err) {
        return console.log(err)
      }

      callback(err, result)
    })
  },
  detail: (contentId, callback) => {

    const queryString = `SELECT users.nickname, users.picture, comments.id, body, created_at FROM comments INNER JOIN users ON comments.users_id = users.id WHERE contents_id=${contentId}`

    db.query(queryString, (err, result) => {
      if (err) {
        return console.log(err)
      }

      callback(err, result)
    })
  },
  edit: (commentId, body, callback) => {

    const queryString = `UPDATE comments SET comments.body = '${body}' WHERE comments.id = ${commentId}`

    db.query(queryString, (err, result) => {
      if (err) {
        return console.log(err)
      }

      callback(err, result)
    })
  },
  delete: (commentId, callback) => {

    const queryString = `DELETE FROM comments WHERE id=${commentId}`

    db.query(queryString, (err, result) => {
      if (err) {
        return console.log(err)
      }

      callback(err, result)
    })
  }
}