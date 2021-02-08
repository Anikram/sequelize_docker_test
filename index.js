const express = require('express');
const app = express();
const {Sequelize} = require('sequelize');
const PORT = 5000;

const sequelize = new Sequelize('seq_test', 'postgres', 'postgres', {
  host: 'localhost',
  dialect: 'postgres'
});

app.get('/index', async (req,res) => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

  res.json({message: 'Hello!'})
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})



