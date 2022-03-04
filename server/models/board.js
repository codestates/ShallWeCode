const db = require('../db')

module.exports = {
  writing: (title, body, PRorTP, stack, callback) => {
    
    const queryString = `INSERT INTO contents (users_id, title, body, created_at, PRorTP) VALUES (1, '${title}', '${body}', now(), '${PRorTP}')`

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
  }
}