require('dotenv').config();
const express = require('express');
const app = express();
const peopleRouter = require('./routes/people');
const dbConnect = require('./db/dbConnect');
const db = require('./db/database').sequelize;

app.use(express.json())
app.use('/people',peopleRouter)

app.get('/index', async (req,res) => {
  res.json({message: 'Hello!'})
})

app.listen(process.env.WEB_PORT, async () => {
  console.log(`Server is running on port ${process.env.WEB_PORT}`)
  await dbConnect(db)
})



