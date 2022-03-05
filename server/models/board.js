const db = require('../db')

module.exports = {
  writing: (title, body, PRorTP, stack, callback) => {
    
    const queryString = `INSERT INTO contents (users_id, title, body, created_at, PRorTP) VALUES (3, '${title}', '${body}', now(), '${PRorTP}')`

    db.query(queryString, (err, result) => {
      if (err) {
        return console.log(err)
      }

      const queryString = `SET @contents_id = LAST_INSERT_ID()`

      db.query(queryString, (err, result) => {
        if (err) {
          return console.log(err)
        }

        const queryString = `INSERT INTO category (stack) VALUES ('${stack}')`

        db.query(queryString, (err, result) => {
          if (err) {
            return console.log(err)
          }

          const queryString = `SET @category_id = LAST_INSERT_ID()`

          db.query(queryString, (err, result) => {
            if (err) {
              return console.log(err)
            }

            const queryString = `INSERT INTO contents_category (contents_id, category_id) VALUES (@contents_id, @category_id)`

            db.query(queryString, (err, result) => {
              if (err) {
                return console.log(err)
              }

              callback(err, result)
            })
          })
        })
      })
    })
  },
  detail: (contentId, callback) => {

    const queryString = `SELECT id FROM contents WHERE id = ${contentId};`

    db.query(queryString, (err, result) => {
      if (err) {
        return console.log(err)
      }

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
    })
  }
}