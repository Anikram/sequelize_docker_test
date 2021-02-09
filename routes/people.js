const express = require('express');
const router = express.Router();
// const db = require('../database').sequelize;
const Person = require('../db/database').Person;

router.get("/all", function(req, res) {
  Person.findAll()
    .then( people => {
      res.status(200).json(people);
    })
    .catch( err => {
      res.status(500).json(err);
    });
});

router.get("/:id", function(req, res) {
  Person.findByPk(req.params.id)
    .then( person => {
      res.status(200).json(person);
    })
    .catch( err => {
      res.status(500).json(err);
    });
});

router.put("/", function(req, res) {
  console.log(req)
  Person.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    id: req.body.id
  })
    .then( person => {
      res.status(200).json(person);
    })
    .catch( err => {
      res.status(500).json(err);
    });
});

router.delete("/:id", function(req, res) {
  Person.destroy({
    where: {
      id: req.params.id
    }
  })
    .then( () => {
      res.status(200).json();
    })
    .catch( err => {
      res.status(500).json(err);
    });
});

module.exports = router;