var sidebar = require('../helpers/sidebar');
var fs = require('fs');
var path = require('path');
var Models = require('../models/index');
var md5 = require('MD5');

module.exports = {
    index: function (req, res) {

        var viewModel = {
            image: {},
            comments: []
        };
        Models.Image.findOne({ fileName: { $regex: req.params.image_id } }, function (err, image) {

            if (err) { throw err; }
            if (image) {
                image.views = image.views + 1;
                viewModel.image = image;
                image.save();
                Models.Comment.find({ image_id: image._id }, {}, { sort: { timestamp: 1 } }, function (err, comments) {
                    if (err) { throw err; }
                    viewModel.comments = comments;
                    sidebar(viewModel, function (viewModel) {
                        //res.render('image', viewModel);
                        //Rest API
                        //res.json(viewModel);
                        
                if (process.argv[2]) {
                    // Testing Rest APIs                     
                    
                    res.render('image', viewModel);
                } else {
                    // Normal Execution
                    res.json(viewModel);
                }                         
                        
                    });
                });
            } else {
                res.redirect('/');
            }


        });




    },

    create: function (req, res) {
        console.log("We are in Create");

        var saveimage = function () {
            var possible = 'abcdefghijklmnopqrstuvwxyz0123456789',
                imgUrl = '';
            for (var i = 0; i < 6; i++) {

                imgUrl += possible.charAt(Math.floor(Math.random() * possible.length));
            }

            Models.Image.find({
                fileName: imgUrl
            }, function (err, images) {

                if (images.length > 0) {

                    saveimage();

                } else {


                    var tempPath = req.file.path,
                        ext = path.extname(req.file.originalname).toLowerCase(),
                        targetPath = path.resolve('./public/upload/' + imgUrl + ext);


                    if (ext === '.png' || ext === '.jpg' || ext === '.jpeg' || ext === '.gif') {
                        fs.rename(tempPath, targetPath, function (err) {
                            if (err) throw err;

                            //Save Image to DB
                            var newImg = new Models.Image({
                                title: req.body.title || 'MyUpload',
                                fileName: imgUrl + ext,
                                description: req.body.description
                            });
                            newImg.save(function (err, image) {
                                //res.redirect('/images/' + image.uniqueId);
                                res.json(200,{uniqueId:image.uniqueId})
                            });

                        });
                    } else {
                        fs.unlink(tempPath, function () {
                            if (err) throw err;
                            res.json(500, {
                                error: 'Only image files are allowed.'
                            });
                        });
                    }

                }
            });
        };

        saveimage();
    },

    like: function (req, res) {
        //res.send('The image:like POST controller');
        if(req.params.image_id !== "undefined" ){
            Models.Image.findOne({
                fileName: { $regex: req.params.image_id }

            }, function (err, image) {
                if (!err && image) {
                    image.likes = image.likes + 1;
                    image.save(function (err) {
                        if (err) {
                            res.json(err);
                        } else {
                            res.json({ likes: image.likes });
                        }

                    });
                }
            });
        }else{
            res.json({
                error: "Not Found"
            });
        }

    },
    comment: function (req, res) {

        Models.Image.findOne({
            fileName: { $regex: req.params.image_id }
        }, function (err, image) {
            if (!err && image) {
                var newComment = new Models.Comment(req.body);
                newComment.gravatar = md5(newComment.email);
                newComment.image_id = image._id;
                newComment.save(function (err, comment) {
                    if (err) {
                        throw err;
                    }
                    res.redirect('/images/' + image.uniqueId + '#' + comment._id);
                });
            } else {
                res.redirect('/');
            }
        }

        );

    },

    remove: function (req, res) {

        Models.Image.findOne({ fileName: { $regex: req.params.image_id } }, function (err, image) {
            if (err) throw err;
            fs.unlink(path.resolve('./public/upload/' + image.fileName), function (err) {
                if (err) throw err;
                Models.Comment.remove({ image_id: image._id }, function (err) {
                    if (err) throw err;
                    image.remove(function (err) {
                        if (!err) {
                            res.json(true);
                        } else {
                            res.json(false);
                        }
                    });
                });
            });

        });

    }
}; 