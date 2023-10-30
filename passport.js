const passport=require('passport');
const LocalStrategy=require('passport-local').Strategy;
const Password =require('./password');
const connection=require('./database');
const User = connection.models.User;

function Userdetails(username,password,done){  
    // Check if user exists in database 
    User.findOne({name:username},(err,User)=>{
        if(err){
            console.log('Encountered an error!')
            return done(err)
        }
        if(!User){
        console.log("No user");
        return done(null,false)
        }
        if(User){
            console.log("User exists")
            if(Password.validatePassword(password,User.salt)===User.hash){
                return(done(null,User))
            }else{
                return done(null,false)
            }
        }
    })
}

module.exports=Userdetails;