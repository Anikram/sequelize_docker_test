const express = require('express');
const passport = require('passport');
const router = express.Router();
const playersRoutes = require('./players');
const authRoutes = require('./auth')
const gamesRoutes = require('./games')

//players routes
router.get("/players", passport.authenticate('jwt', {session: false}), playersRoutes.listPlayers)
router.get("/top5players", passport.authenticate('jwt', {session: false}), playersRoutes.top5Players)
router.get('/player',passport.authenticate('jwt', {session: false}),playersRoutes.playerProfile)
router.put('/playerNewTopScore',passport.authenticate('jwt', {session: false}),playersRoutes.updatePlayerTopScore)
// router.get("/:id", playersRoutes.getUser)
// router.post("/", playersRoutes.createUser)
// router.delete("/:id",playersRoutes.deleteUser)

//auth routes
router.post('/signup', authRoutes.signUp)
router.get('/logout', authRoutes.logout)
router.post('/login', authRoutes.signIn)
router.post('/refresh_token', authRoutes.refreshTokens)

//games routes
router.get('/top10games', gamesRoutes.top10GamesForPlayer)
router.get('/game', gamesRoutes.getGame) //!??
router.post('/createGame', gamesRoutes.createGame) //!??
router.put('/updateGame', gamesRoutes.updateGame)
router.delete('/deleteGame', gamesRoutes.deleteGame)


module.exports = router;

