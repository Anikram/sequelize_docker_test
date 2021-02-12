require('dotenv').config();
const express = require('express');
const app = express();

const dbConnect = require('./db/dbConnect');
const db = require('./db/models/index').sequelize;

const morgan = require('morgan');

const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
// const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');
const routes = require('./routes/index');



app.use(flash());
app.use(morgan('dev'))
app.use(cookieParser())
app.use(bodyParser())
app.use(express.json())

// app.use(session({
//   secret: process.env.SECRET,
//   store: sessionStore,
//   resave: false,
//   saveUninitialized: true,
//   cookie: {
//     maxAge: 1000*24*60*60
//   }
// }))

require('./config/passport')(passport)
app.use(passport.initialize());
// app.use(passport.session({ cookie: { maxAge: 60000 }})); // persistent login sessions
app.use('/api', routes)


app.listen(process.env.WEB_PORT, async () => {
  console.log(`Server is running on port ${process.env.WEB_PORT}`)
  await dbConnect(db)
})



