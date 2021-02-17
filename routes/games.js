const Game = require('../db/models').Game;

module.exports = {
    async top10GamesForPlayer(req,res) {
      try {
        const games = await Game.find({where: {player_id: req.user.id}})
        res.status(200).json({statusCode:0,data: games})
      } catch (err) {
        console.error(err.message)
        res.status(500).send('Server error');
      }
    },

  async getGame (req,res){
    try {
      const game = await pool.query("SELECT * FROM games WHERE game_id = $1",[req.header("game_id")])
      const regionCities = await pool.query("SELECT cities FROM regions WHERE region_id = $1",[1])
      res.json({...game.rows[0],...regionCities.rows[0]})
    } catch (err) {
      console.error(err.message)
    }
  },

  async createGame (req,res){
    try {
      // console.log('-------POST /game')
      const {user_id, region_name} = req.body;
      const region_id = await pool.query("SELECT (region_id) FROM regions WHERE region_name = $1",[region_name])
      const newGame = await pool.query("INSERT INTO games (user_id, region_id) VALUES($1,$2) RETURNING * ",[user_id,region_id.rows[0].region_id])
      const regionCities = await pool.query("SELECT cities FROM regions WHERE region_name = $1",[req.body.region_name])
      res.json({...newGame.rows[0],...regionCities.rows[0]})
    } catch (err) {
      console.error(err.message)
    }
  },

  async updateGame (req, res){
    try {
      // console.log('------- PUT /game - finish')
      const {game_id, score, distance, win} = req.body;
      const response = await pool.query("UPDATE games SET game_finished=$1, score=$2, distance=$3, win=$4 WHERE game_id=$5 RETURNING *",[true,score,distance,win,game_id])
      res.json(response.rows[0])
    } catch (err) {
      console.error(err.message)
    }
  },

   async deleteGame(req, res){
    try {
      // console.log('-------DELETE /game')
      const {game_id} = req.body;
      const response = await pool.query("DELETE FROM games WHERE game_id=$1 RETURNING *",[game_id])
      res.json(response.rows[0])
    } catch (err) {
      console.error(err.message)
    }
  }
};