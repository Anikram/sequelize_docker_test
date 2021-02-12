const jsonwebtoken = require('jsonwebtoken')
const fs = require('fs');
const path = require('path');
const {v4: uuidv4} = require('uuid');
const Token = require('../db/models').Token;

const PRIV_KEY = fs.readFileSync(path.join(__dirname, '/id_rsa_private1.pem'), 'utf8')
const PUB_KEY = fs.readFileSync(path.join(__dirname, '/id_rsa_pub1.pem'), 'utf8')

module.exports = {
  generateAccessToken(user) {
    const id = user.id;
    const expiresIn = '1m';
    const payload = {
      sub: id,
      iat: Date.now(),
      type: 'access'
    }
    const signedToken = jsonwebtoken.sign(payload, PRIV_KEY, {expiresIn, algorithm: 'RS256'})

    return {
      token: 'Bearer ' + signedToken,
      expires: expiresIn
    }
  },

  generateRefreshToken() {
    const expiresIn = '2m';
    const payload = {
      id: uuidv4(),
      type: 'refresh'
    }
    const options = {expiresIn}
    const signedToken = jsonwebtoken.sign(payload, PRIV_KEY, {expiresIn, algorithm: 'RS256'})

    return {
      id: payload.id,
      token: 'Bearer ' + signedToken,
      expires: expiresIn
    }

  },

  replaceDbRefreshToken(tokenId, userId) {
    Token.findOne({where: {userId: userId}}).then(token => {
      token.destroy().then(() => {Token.create({tokenId, userId})})
    })
  },

  verifyToken(token) {
    return jsonwebtoken.verify(token, PUB_KEY)
  }
};