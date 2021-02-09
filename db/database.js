require('dotenv').config()
const {Sequelize} = require('sequelize');
const createPerson = require('../models/Person')

const sequelize = new Sequelize(`${process.env.DB_SCHEMA}://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_DBNAME}`, {
  dialect: `${process.env.DB_SCHEMA}`
})

const Person = createPerson(sequelize)

module.exports = {
  sequelize: sequelize,
  Person: Person
};