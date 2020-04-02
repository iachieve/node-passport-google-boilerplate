const express = require('express');
const authRoutes = require('./routes/auth-routes');
const PORT = process.env.PORT || 5000;


const app = express();


// setup routes
app.use('/auth', authRoutes);

app.get('/', (req, res)=>{
  res.render('home')
});
app.get('/privacy', (req, res)=>{
  res.render('privacy')
});

app.set('view engine', 'ejs');
app.listen(PORT, ()=> console.log('listening'))