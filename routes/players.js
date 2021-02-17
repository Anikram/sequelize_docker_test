const Player = require('../db/models').Player;

module.exports = {
  async listPlayers(req, res) {
    Player.findAll({limit: 20, attributes: ["email", "username", "top_score"]})
      .then(players => {
        res.status(200).json({statusCode:0,data: players})
      })
      .catch(err => {
        console.log(err)
        res.status(500).json({statusCode: 1, error: err.message})
      })
  },
  async top5Players(req, res) {
    Player.findAll({
      limit: 5,
      attributes: ["email", "username", "top_score"],
      order: [['top_score', 'DESC']]
    })
      .then(players => {
        res.status(200).json(players)
      })
      .catch(err => console.error(err))
  },

  async playerProfile(req, res) {
    Player.findByPk(req.user.id, {attributes: ['id', 'username', 'email', 'top_score']})
      .then(async user => {
        const games = await user.getGames()

        const result = {...user.toJSON(), games: [...games]}

        res.status(200).json({statusCode:0,data: result})
      })
      .catch(err => {
        console.log(err)
        res.status(500).json({statusCode: 1, error: err.message})
      })
  },

  async updatePlayerTopScore(req, res) {
    const {top_score} = req.body;

    Player.findOne({
      where: {id: req.user.id},
      attributes: ['id', 'username', 'email', 'top_score']
    })
      .then(async player => {
        player.top_score = top_score

        player.save()
          .then(async result => {
            res.status(200).json({statusCode:0,data: await result.toJSON()})
          })
          .catch(err => {
            console.error(err)
            res.status(500).json({statusCode: 1, error: err.message})
          })
      })
      .catch(err => {
        console.log(err)
        res.status(500).json({statusCode: 1, error: err.message})
      })
  }
};