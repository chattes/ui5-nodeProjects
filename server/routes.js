var express = require('express'),
    router = express.Router(),
    home = require('../controllers/home'),
    path = require('path'),
    multer = require('multer'),
    image = require('../controllers/image');


module.exports = function (app) {
    var myPath = path.join(__dirname, 'public/upload/');
    var upload = multer({ dest: myPath });

    router.get('/', home.index);
    router.get('/images/:image_id', image.index);
    router.post('/images',upload.single('file'), image.create);
    router.post('/images', image.create);
    router.post('/images/:image_id/like', image.like);
    router.post('/images/:image_id/comment', image.comment);
    router.delete('/images/:image_id', image.remove);
    app.use(router);
    

};




