const express = require('express');
const passport = require('passport');
const router = express.Router();
const playersRoutes = require('./players');
const authRoutes = require('./auth')
const gamesRoutes = require('./games')

const isAuth = (_req,_res,next) => {
  passport.authenticate('jwt', {session: false})
  next()
}

//auth routes
router.post('/signup', authRoutes.signUp)
router.get('/logout', authRoutes.logout)
router.post('/login', authRoutes.signIn)
router.post('/refresh_token', authRoutes.refreshTokens)

//players routes
router.get("/players",isAuth, playersRoutes.listPlayers)
router.get("/top5players", isAuth, playersRoutes.top5Players)
router.get('/player',isAuth,playersRoutes.playerProfile)
router.put('/playerNewTopScore',isAuth,playersRoutes.updatePlayerTopScore)

//games routes
router.get('/top10games', isAuth, gamesRoutes.getTop10Games)
router.get('/game/:game_id', isAuth, gamesRoutes.getGame) //!??
router.post('/createGame', isAuth,gamesRoutes.createGame)
router.put('/updateGame', isAuth, gamesRoutes.updateGame)
router.delete('/deleteGame/:game_id', isAuth, gamesRoutes.deleteGame)

module.exports = router;

