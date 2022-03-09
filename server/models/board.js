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

    const queryString = `SELECT contents.users_id, contents.title, contents.body, contents.created_at, contents.PRorTP, users.picture, users.nickname, category.stack FROM contents
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
  },
  filter: (PRorTP, stack, callback) => {
    if (!PRorTP && !stack) {
      const queryString = `SELECT contents.id, contents.title, category.stack FROM contents
      INNER JOIN contents_category ON contents.id=contents_category.contents_id
      INNER JOIN category ON contents_category.category_id=category.id ORDER BY contents.id DESC`

      db.query(queryString, (err, result) => {
        if (err) {
          return console.log(err)
        }

        callback(err, result)
      })
    } else {
      let queryString2 = ``
      if (PRorTP) {
        queryString2 += ` PRorTP=${PRorTP}`
      }
      if (stack) {
        if (PRorTP) {
          queryString2 += ` AND`
        }
        for (let tool1 = 0; tool1 < stack.length; tool1 += 2) {
          queryString2 += ` category.id=${stack[tool1] + stack[tool1 + 1]} OR`
        }
        queryString2 = queryString2.substring(0, queryString2.length - 3)
      }

      const queryString1 = `SELECT contents.id FROM contents
        INNER JOIN contents_category ON contents.id=contents_category.contents_id
        INNER JOIN category ON contents_category.category_id=category.id
        WHERE` + queryString2 + ` ORDER BY contents.id DESC`

      db.query(queryString1, (err, result) => {
        if (err) {
          return console.log(err)
        }

        let queryString4 = ``
        if (result.length) {
            queryString4 += ` WHERE`
          for (let tool2 of result) {
            queryString4 += ` contents.id=${tool2.id} OR`
          }
          queryString4 = queryString4.substring(0, queryString4.length - 3)
          const queryString3 = `SELECT contents.id, contents.title, category.stack FROM contents
          INNER JOIN contents_category ON contents.id=contents_category.contents_id
          INNER JOIN category ON contents_category.category_id=category.id` + queryString4 + ` ORDER BY contents.id DESC`

          db.query(queryString3, (err, result) => {
            if (err) {
              return console.log(err)
            }

            callback(err, result)
          })
        } else {
          callback(err, result)
        }
      })
    }
  },
  user: (PRorTP, userId, callback) => {

    const queryString = `SELECT contents.id, contents.title, category.stack FROM contents
      INNER JOIN contents_category ON contents.id=contents_category.contents_id
      INNER JOIN category ON category.id=contents_category.category_id
      WHERE PRorTP=${PRorTP} AND users_id=${userId}`

      db.query(queryString, (err, result) => {
        if (err) {
          return console.log(err)
        }

        callback(err, result)
      })
  }
}