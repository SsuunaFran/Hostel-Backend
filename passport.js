const passport=require('passport');
const LocalStrategy=require('passport-local').Strategy;
const Password =require('./password');

//This is a sample user
const User={
    username:'ssuuna',
    salt:'eeeeeeeeeeeeeeeeeeeeeeejjjjjjjjjjjjjjxnnnnnn',
    hash:'mmmmmmmmmmmmmmm'
}

function Userdetails(username,password,done){  
    // Check if user exists in database 
    if(User.username){
        // if user exists, return user
        if(Password.validatePassword(password,salt)===User.hash){
            return(done(null,User))
        }else{
            return(null,false)
        }
    }else{
        return 
    }
}