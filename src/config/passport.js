const LocalStrategy = require('passport-local').Strategy;

const User = require('../app/models/user');

module.exports = function (passport) {
    
    passport.serializeUser(function(user, done){
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done){
        User.findById(id, function(err, user){
            done(err, user);
        });
    });

    //signup
    passport.use('local-signup', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
    function(req, email, password, done){
        User.findOne({'local.email': email}, function(err, user){
            if(err){return done(err);}
            if(user){
                return done(null, false, req.flash('signupMessage', 'The email is already taken.'));
            }else{
                var newuser = new User();
                newuser.local.email = email;
                newuser.local.password = newuser.generateHash(password);
                newuser.save(function(err){
                    if (err){throw err;}
                    return done(null, newuser);
                });

            }
        })
    }));

//login
passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
},
function(req, email, password, done){
    User.findOne({'local.email': email}, function(err, user){
        if(err){return done(err);}
        if(!user){
            return done(null, false, req.flash('loginMessage', 'No user found'));
        }
        if (!user.validatePassword(password)){
            return done(null, false, req.flash('loginMessage', 'Wrong password'));
        }
        return done(null, user);
    })
}));
}