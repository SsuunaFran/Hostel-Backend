const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Password = require('./password');
const connection = require('./database');
const User = connection.models.Users;

const customFields = {
    usernameField: "uname",
    passwordField: "pwd"
}

const Userdetails = (username, password, done) => {
    // Check if user exists in database 
    User.findOne({ name: username })
        .then((User) => {
            if (!User) {
                console.log("No user");
                return done(null, false)
            }
            if (User) {
                console.log("User exists")
                if (Password.validatePassword(password, User.salt).hash === User.hash) {
                    return (done(null, User))
                } else {
                    console.log('Incorrect password')
                    return done(null, false)
                }
            }
        }).catch((err) => {
            console.log('Encountered an error!')
            return done(err)
        })

}

const strategy = new LocalStrategy(customFields, Userdetails);

passport.use(strategy)

passport.serializeUser((user, done) => {
    done(null, user.id);
})

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user)
    }).catch((err) => done(err))
})