const {verifyRefreshToken} = require("../utils/issueJwt");
const {sendRefreshToken} = require("../utils/sendRefreshTokens");
const Player = require('../db/models').Player;
const {verifyToken, generateAccessToken, generateRefreshToken, replaceDbRefreshToken} = require('../utils/issueJwt')

module.exports = {
  //register route
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

  //login route
  async signIn(req, res) {
    Player.findOne({where: {email: req.body.email}}).then(player => {

      if (!player) {
        res.json({message: 'No user with such credentials.'})
      }

      const isValid = Player.validPassword(req.body.password, player.hash, player.salt);

      if (isValid) {
        sendRefreshToken(res, generateRefreshToken(player))
        const jwt = generateAccessToken(player)
        res.json({success: true, token: jwt.token, expiresIn: jwt.expires})
      } else {
        res.json({message: 'Email or password are incorrect.'})
      }
    })
      .catch(err => res.status(500).send({success: false, err}))
  },

  logout(req, res) {
    sendRefreshToken(res, "")
    res.json({statusCode: 0, message: 'Logout successfully.'})
  },

  async refreshTokens(req, res) {
    const token = req.cookies.jrt

    if (!token) {
      return res.send({ok: false, accessToken: ''})
    }

    let payload;

    try {
      payload = await verifyRefreshToken(token)
      console.log(payload)
    } catch (err) {
      console.error(err)
      return res.send({ok: false, accessToken: ''})
    }


    const player = await Player.findOne({where: {id: payload.sub}})

    if (!player) {
      return res.send({ok: false, accessToken: ''})
    }

    // if (player.tokenVersion !== payload.tokenVersion) {
    //   return res.send({ok: false, accessToken: ''})
    // }

    sendRefreshToken(res, generateRefreshToken(player))

    return res.send({ok: true, accessToken: generateAccessToken(player)})
  }
};