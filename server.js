const express =  require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const knex =  require('knex');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const register = require('./Controllers/Register');
const signin = require('./Controllers/Signin');
const profile = require('./Controllers/Profile');
const image = require('./Controllers/Image');


const db =knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : 'lovejaN#@107',
      database : 'smartbrain'
    }
  });


//create app by running express
const app = express();

app.use(bodyParser.json());
app.use(cors());


app.get('/', (req,res) => {
    res.send('it is working');
});

app.post('/signin', (req,res) => {signin.handleSignin(req,res,db,bcrypt)});
app.post('/register', (req,res) => {register.handleRegister(req,res,db,bcrypt,saltRounds)});
app.get('/profile/:id', (req,res) => {profile.handleProfileGet(req,res,db)});
app.put('/image', (req,res) => {image.handleImage(req,res,db)});

app.listen(process.env.PORT || 3000, ()=> {
    console.log('app is running on port ${process.env.PORT}');
})



// What we wanna Create.
/**
 *  --> res  = This is Working
 * /Sign in --> POST = Success/Fail.
 * /register --> POST = User
 * /Profile/:userID -->GET = User
 * /image --> PUT --> User
 */