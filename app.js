const PORT = process.env.PORT || 3000;
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require('express');
const cookieSession = require('cookie-session');
const passport = require('passport');
const authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile-routes');
const passportSetup = require('./config/passport-setup');
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000,
  keys: [process.env.SESSION_COOKIE_KEY]
}));

app.use(passport.initialize());
app.use(passport.session());


mongoose.connect(process.env.MONGO_URI, 
  { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => { console.log('connected to mongodb'); })
  .catch(err => console.log('==> db network failure', err))

// set up routes
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);

// create home route
app.get('/', (req, res) => {
  res.render('home', {user: req.user});
});


app.get('*', (req, res) => {
  res.render('404');
});

app.listen(PORT, () => {
  console.log('app now listening for requests on port 3000');
});