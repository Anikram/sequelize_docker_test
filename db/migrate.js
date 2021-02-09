const {sequelize} = require('./database.js');


sequelize.sync().then(() => {
  console.log(`Database is synchronized.`)
}).catch(err => {
  console.error(err.message)
})

