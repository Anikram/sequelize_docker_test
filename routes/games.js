const Game = require('../db/models').Game;

module.exports = {
  async getTop10Games(req, res) {
    try {
      res.status(200).json({statusCode: 0, data: await Game.findAll(req.user.toJSON())})
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server error');
    }
  },

  async getGame(req, res) {
    try {
      const user = req.user
      const games = await user.getGames({where: {id: req.params.game_id}})
      if (games.length === 0) return res.status(404).json({
        statusCode: 1,
        error: `You have no game with an id: ${req.params.game_id}`
      })
      return res.status(200).json({statusCode: 0, data: games[0]})
    } catch (err) {
      console.error(err.message)
      return res.status(500).send({statusCode: 1, error: 'Server error'});
    }
  },

  async createGame(req, res) {
    try {
      const user = req.user
      const {region_name} = req.body;
      res.status(200).json({statusCode: 0, data: await user.createGame({region_name: region_name})})
    } catch (err) {
      console.error(err.message)
      res.status(500).send({statusCode: 1, error: 'Can\'t create a game'});
    }
  },

  async updateGame(req, res) {
    try {
      const user = req.user
      const {id, score, distance, win, finished} = req.body

      user.getGames({where: {id: id}})
        .then(games => {
          const game = games[0]
          game.score = score
          game.distance = distance
          game.win = win
          game.finished = finished

          game.save()
            .then(game => {
              return res.status(202).json({statusCode: 0, data: game})
            })
            .catch(err => {
              console.error(err)
              res.status(500).send({statusCode: 1, error: err});
            })
        })
    } catch (err) {
      console.error(err)
      res.status(500).send({statusCode: 1, error: err});
    }
  },

  async deleteGame(req, res) {
    try {
      const user = req.user
      const game_id = req.params.game_id

      user.getGames({where: {id: req.params.game_id}})
        .then(games => {
          if (games.length === 0) {
            return res.status(404).json({statusCode: 1, error: `You have no game with an id: ${game_id}`})
          }

          const game = games[0]
          game.destroy()
            .then(dGame => {
              return res.status(204).json({statusCode: 0, data: dGame})
            })
            .catch(err => {
              console.error(err)
              res.status(500).send({statusCode: 1, error: err});
            })
        })
    } catch (err) {
      console.error(err.message)
      res.status(500).send({statusCode: 1, error: err});
    }
  }
};