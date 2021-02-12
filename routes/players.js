const Player = require('../db/models').Player;

module.exports = {
  async listUsers(req,res) {
    Player.findAll({attributes: ['username', 'email', 'top_score']})
      .then( players => {
        res.status(200).json(players);
      })
      .catch( err => {
        res.status(500).json(err);
      });
  },
  async getUser(req,res){
    Player.findByPk(req.params.id)
      .then( person => {
        res.status(200).json(person);
      })
      .catch( err => {
        res.status(500).json(err);
      });
  },
  async createUser(req,res){
    const {email, password, username} = req.body;

    Player.create({
      user_name: username,
      user_email: email,
      user_password: password,
    })
      .then( person => {
        res.status(200).json(person);
      })
      .catch( err => {
        res.status(500).json(err);
      });
  },
  async deleteUser(req,res){
    Player.destroy({
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
  },



};