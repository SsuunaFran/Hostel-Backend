const express=require('express');
const app=express();
const passport=require('passport');
const connection=require('./database');
const User=connection.models.Users;
const pass=require("./password");
const mongoose = require('mongoose');
const session=require('express-session');
const MongoStore = require('connect-mongo');
const Auth = require('./auth').isAuth;

const sessionStore= new MongoStore({
    mongoUrl:'mongodb://localhost:27017/Hostel',
    collection:'Sessions'
})

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
        maxAge: 1000*30
    }
  }))
  


app.get('/',(req,res)=>{
    console.log(req.session)
    res.send('<h1>HELLO SSUUNA</h1>');
})


require('./passport');
app.use(passport.initialize())
app.use(passport.session())

app.use((req,res,next)=>{
    console.log(req.session)
    console.log(req.user)
    next();
})

app.use((req,res,next)=>{
    // console.log(req.session)
    // console.log(req.user)
    next();
})

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.post('/login',passport.authenticate('local',{failureRedirect:'/notpermitted',successRedirect:'/permitted'}));
app.post('/register',(req,res)=>{

    const Obj=pass.getPassword(req.body.pwd)
    const salt=Obj.salt
    const hash=Obj.hash
    const newUser=new User({
        name:req.body.uname,
        hash:hash,
        salt:salt
    });
    newUser.save().then((user)=>{
        console.log(`Saved user ${user}`)
    })

    res.redirect('/loginpage');
})
app.get('/notpermitted',(req,res)=>{
    res.send(`<h1> Cant log you in</h1>`)
})

app.get('/permitted',Auth,(req,res)=>{
    res.send(`<h1> Sucess you logged in </h1><a href="/logout">LOGOUT</a>`)
})

app.get('/loginpage',(req,res)=>{
    const form = `<form method="post" action="/login">
    <h1>LOGIN</h1>
    <label>Username : <input type="text" name="uname"></label><br><br>
    <label>Password : <input type="password" name="pwd"></label><br>
    <button type="submit">SUBMIT</button>
</form>`
res.send(form)
})

app.get('/register',(req,res)=>{
    const form = `<form method="post" action="/register">
    <h1>REGISTER</h1>
    <label>Enter Username : <input type="text" name="uname"></label><br><br>
    <label>Enter Password : <input type="password" name="pwd"></label><br>
    <button type="submit">SUBMIT</button>
</form>`
res.send(form)
})

app.get('/logout',(req,res,next)=>{
    req.logout((err)=>{
        if(err){
            console.log(err)
        }else{
            res.redirect('/loginpage')
        }
    });
    
})
const PORT=process.env.PORT || 8090;
app.listen(PORT,(req,res)=>{
    console.log(`App Listening on PORT ${PORT}`);
})
