const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

function initialize(passport, getUserByEmail){
    const authenticateUser = (email,password,done) => {
        const user = getUserByEmail(email)
        if(user == null){
            return done(null, false, {message: 'No user with that email'})
        }
        try{
            if(await bcrypt.compare(password, user.userpassword)){
                return done(null,user)
            }
            else{
                return done(null,done,{message:'Password incorrect'})
            }
        }
        catch(err){
            return done(err)
        }
    }
    passport.use(new LocalStrategy({usernameField: "email"}),authenticateUser)
    passport.serializeUser((user,done) =>{ })
    passport.serializeUser((id, done) => { })
}

modules.export = initialize