const db = require('../db')

module.exports = {
  writing: (userid, title, body, PRorTP, stack, callback) => {

    const queryString = `INSERT INTO contents (users_id, title, body, PRorTP) VALUES ('${userid}', '${title}', '${body}', ${PRorTP})`

    db.query(queryString, (err, result) => {
      if (err) {
        return console.log(err)
      }

      const queryString = `INSERT INTO contents_category (contents_id, category_id) VALUES ?`

      let arr = []
      for (let i of stack) {
        arr.push([result.insertId, Number(i)])
      }
      db.query(queryString, [arr], (err, result) => {
        if (err) {
          return console.log(err)
        }

        callback(err, result)
      })
    })
  },
  detail: (contentId, callback) => {

    const queryString = `SELECT contents.title, contents.body, contents.created_at, contents.PRorTP, users.picture, users.nickname, category.stack FROM contents
    LEFT JOIN users ON contents.users_id = users.id 
    LEFT JOIN contents_category ON contents.id = contents_category.contents_id 
    LEFT JOIN category ON contents_category.category_id = category.id 
    WHERE contents.id = ${contentId};`

    db.query(queryString, (err, result) => {
      if (err) {
        return console.log(err)
      }

      callback(err, result)
    })
  },
  edit: (contentId, title, body, PRorTP, stack, callback) => {

    const queryString = `UPDATE contents 
    SET contents.title = '${title}', contents.body = '${body}', contents.PRorTP = ${PRorTP} 
    WHERE contents.id = ${contentId}`

    db.query(queryString, (err, result) => {
      if (err) {
        return console.log(err)
      }
      
      const queryString = `DELETE FROM contents_category WHERE contents_id=${contentId}`

      db.query(queryString, (err, result) => {
        if (err) {
          return console.log(err)
        }

        const queryString = `INSERT INTO contents_category (contents_id, category_id) VALUES ?`

        let arr = []
        for (let i of stack) {
          arr.push([contentId, i])
        }

        db.query(queryString, [arr], (err, result) => {
          if (err) {
            return console.log(err)
          }

          callback(err, result)
        })
      })
    })
  },
  delete: (contentId, callback) => {

    const queryString = `DELETE FROM contents WHERE id=${contentId}`

    db.query(queryString, (err, result) => {
      if (err) {
        return console.log(err)
      }

      callback(err, result)
    })
  }
}