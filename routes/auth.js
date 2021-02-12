const Player = require('../db/models').Player;
const {verifyToken, generateAccessToken, generateRefreshToken, replaceDbRefreshToken} = require('../utils/issueJwt')

module.exports = {
  async signUp(req, res) {
    const {salt, hash} = Player.hashPassword(req.body.password)

    const newPlayer = new Player({
      username: req.body.username,
      email: req.body.email,
      hash: hash,
      salt
    })

    newPlayer.save().then(player => {
      const jwt = generateAccessToken(player)
      res.json({success: true, token: jwt.token, expiresIn: jwt.expires})
    }).catch(err => res.status(500).send({success: false, errors: err.errors.map(e => e.message)}))
  },

  async signIn(req, res) {
    Player.findOne({where: {email: req.body.email}}).then(player => {
      if (!player) {
        res.json({message: 'No user with such credentials.'})
      }

      const isValid = Player.validPassword(req.body.password, player.hash, player.salt);

      if (isValid) {
        const jwt = generateAccessToken(player)
        res.json({success: true, token: jwt.token, expiresIn: jwt.expires})
      } else {
        res.json({message: 'Email or password are incorrect.'})
      }
    })
      .catch(err => res.status(500).send({success: false, err}))
  },

  async isVerified(req, res) {

  }
};