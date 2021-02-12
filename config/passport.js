const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const Player = require('../db/models').Player;
const fs = require('fs')
const path = require('path')

const PUB_KEY = fs.readFileSync(path.join(__dirname, '..', '/utils/id_rsa_pub1.pem'), 'utf8')

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: PUB_KEY,
  algorithms: ['RS256']
}

const strategy = new JwtStrategy(options, (payload, done) => {
  console.log(payload)
  Player.findOne({where: {id: payload.sub}})
    .then(player => {
      return player ? done(null, player) : done(null, false)
    })
    .catch(err => done(err, null))
})


module.exports = (passport) => {
  passport.use('jwt',strategy)

  // passport.serializeUser((user, done) => {
  //   done(null, user.id)
  // })
  // passport.deserializeUser((userId, done) => {
  //   User.findById(userId).then(user => {
  //     done(null, user)
  //   }).catch(err => done(err))
  // })
};
