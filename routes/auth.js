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
      res.status(201).json({success: true, token: jwt.token, expiresIn: jwt.expires})
    }).catch(err => res.status(500).send({statusCode: 0, errors: err}))
  },

  //login route
  async signIn(req, res) {
    Player.findOne({where: {email: req.body.email}})
      .then(player => {
        if (!player) {
          console.log('404 - No user with such credentials.')
          return res.status(404).json({statusCode: 1, error: 'No user with such credentials.'})
        }

        const isValid = Player.validPassword(req.body.password, player.hash, player.salt);

        if (isValid) {
          sendRefreshToken(res, generateRefreshToken(player)) //set refresh token into cookies
          const jwt = generateAccessToken(player)
          res.status(200).json({statusCode: 0, accessToken: jwt.token})
        } else {
          console.log('401 - Email or password are incorrect.')
          return res.status(401).json({statusCode: 1, error: 'Email or password are incorrect.'})
        }
      })
      .catch(err => {
        console.log(err)
        return res.status(500).json({statusCode: 1, error: err.message})
      })
  },

  logout(req, res) {
    sendRefreshToken(res, "")
    res.status(200).json({statusCode: 0, message: 'Logged out successfully.'})
  },

  async refreshTokens(req, res) {
    const token = req.cookies.jrt

    if (!token)  return res.status(401).json({statusCode: 1, accessToken: '', error: 'No refresh token is provided'})

    let payload;

    try {
      payload = await verifyRefreshToken(token)
    } catch (err) {
      return res.status(401).json({statusCode: 1, accessToken: '', error: `Refresh token invalid: ${err.message}`})
    }

    const player = await Player.findOne({where: {id: payload.sub}})

    if (!player) {
      return res.status(404).json({statusCode: 1, accessToken: '', error: 'Player not found'})
    }

    // if (player.tokenVersion !== payload.tokenVersion) {
    //   return res.send({ok: false, accessToken: ''})
    // }

    sendRefreshToken(res, generateRefreshToken(player))
    return res.status(200).json({statusCode: 0, accessToken: generateAccessToken(player)})
  }
};