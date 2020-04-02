const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require('express');
const authRoutes = require('./routes/auth-routes');
const passportSetup = require('./config/passport-setup');
const mongoose = require('mongoose');
const keys = require('./config/keys_dev');
const cookieSession = require('cookie-session');
const passport = require('passport');
const app = express();

// set view engine
app.set('view engine', 'ejs');

app.use(cookieSession({
  maxAge: 60 * 60 * 1000,
  keys: [keys.session.cookieKey]
}));

app.use(passport.initialize());
app.use(passport.session());

// connect to mongodb
mongoose.connect(keys.mongodb.dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('connected to mongodb');
  })
  .catch(err => console.log(err));
mongoose.set('useCreateIndex', true);


// set up routes
app.use('/auth', authRoutes);

// create home route
app.get('/', (req, res) => {
  res.render('home');
});

app.listen(PORT, () => {
  console.log('app now listening for requests on port 3000');
});