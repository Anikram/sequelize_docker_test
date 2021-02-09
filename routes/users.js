const express = require('express');
const router = express.Router();
// const db = require('../db/models/index').sequelize;
const User = require('../db/models').User;

router.get("/all", function(req, res) {
  User.findAll()
    .then( people => {
      res.status(200).json(people);
    })
    .catch( err => {
      res.status(500).json(err);
    });
});

router.get("/:id", function(req, res) {
  User.findByPk(req.params.id)
    .then( person => {
      res.status(200).json(person);
    })
    .catch( err => {
      res.status(500).json(err);
    });
});

router.put("/", function(req, res) {
  console.log(req)
  User.create({
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
  User.destroy({
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