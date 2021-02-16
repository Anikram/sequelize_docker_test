const express = require('express');
const passport = require('passport');
const router = express.Router();
const playersRoutes = require('./players');
const authRoutes = require('./auth')

//users routes
router.get("/players",passport.authenticate('jwt',{session: false}), playersRoutes.listUsers)
// router.get("/:id", playersRoutes.getUser)
// router.post("/", playersRoutes.createUser)
// router.delete("/:id",playersRoutes.deleteUser)

//auth routes
router.post('/signup', authRoutes.signUp)
router.get('/logout', authRoutes.logout)
router.post('/login', authRoutes.signIn)
router.post('/refresh_token', authRoutes.refreshTokens)


module.exports = router;

