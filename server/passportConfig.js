/**
 * Created by I055463 on 5/27/2016.
 */
var localStrategy = require('passport-local');
var User = require('../models/index').Users;

module.exports = function(passport){
    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    passport.serializeUser(function (user,done) {
        done(null,user.id);
    });
    passport.deserializeUser(function (id,done) {

        User.findById(id,function(err,user){
            done(err,user);
        });

    });

    passport.use('local-signup',new localStrategy({
        usernameField:'email',
        passswordField:'password',
        passReqToCallback : true
    },function(req,email,password,done){
        //Process.nextTick- https://howtonode.org/understanding-process-next-tick
        process.nextTick(function () {
            //TODO
            User.findOne({email:email},function (err,user) {
              if(err) return done(err);
                if(user){
                    return done(null,false,{message:'User already registered'});
                }else{
                    var newUser = new User();
                    newUser.email = email;
                    newUser.name = req.body.name;
                    newUser.password = newUser.generateHash(password);
                    newUser.save(function (err) {
                        if(err) throw err;
                        return done(null,newUser);

                    });
                }


            });
        });
    }));


};