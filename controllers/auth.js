/**
 * Created by I055463 on 5/27/2016.
 */
var User = require('../models/index').Users;
module.exports = {

    checkAuthenticaton: function (req,res,next) {

        if(req.isAuthenticated()){
            console.log("User is authentic");
            return next();
        }else{
            res.status('401').json({message:"Kindly Login to the application"});
        }
    }

};