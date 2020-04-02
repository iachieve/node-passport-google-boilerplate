const express = require('express');
const authRoutes = require('./routes/auth-routes');


const app = express();


// setup routes
app.use('/auth', authRoutes);

app.get('/', (req, res)=>{
  res.render('home')
})

app.set('view engine', 'ejs');
app.listen(3000, ()=> console.log('listening'))