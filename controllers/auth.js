/**
 * Created by I055463 on 5/27/2016.
 */
var User = require('../models/index').Users;
module.exports = {

    register: function(req, res){
    User.find({email:req.body.email},function(err, user){
            if (user.length > 0){
                res.json(500, {
                    error: "Email is already registered."
                });
            }
            else{
                User.create({name:req.body.name,
                             email:req.body.email,
                             password:req.body.password
                            },function(err){
                                            if(err){
                                                res.json(500, {error: "User cannot be registered. Try again later."});
                                                return;
                                            }
                                            res.json(200,{
                                             success:"User created Succesfully"
                                            });
                });
            }
        });
}

};