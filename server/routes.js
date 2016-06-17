var express = require('express'),
    router = express.Router(),
    home = require('../controllers/home'),
    auth = require('../controllers/auth'),
    path = require('path'),
    multer = require('multer'),
    image = require('../controllers/image');


module.exports = function (app,passport) {
    var myPath = path.join(__dirname, 'public/upload/');
    var upload = multer({ dest: myPath });

    router.get('/', auth.checkAuthenticaton,home.index);
    router.get('/images/:image_id', image.index);
    router.get('/auth/check',function (req,res,next) {
        if(req.isAuthenticated()){
           console.log("User is auth");
        }else{
            console.log("User not auth");
        }


    });
    router.post('/images',upload.single('file'), image.create);
    router.post('/images/:image_id/like', image.like);
    router.post('/images/:image_id/comment', image.comment);
    router.delete('/images/:image_id', image.remove);
    router.post('/auth/register',passport.authenticate('local-signup'),function (req,res) {

        res.status('200').json(req.user.email);

    });
    router.post('/auth/login',passport.authenticate('local-login'),function (req,res) {
        res.status('200').json(req.user.name);
    })
    app.use(router);
    

};




