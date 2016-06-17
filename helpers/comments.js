var Models = require('../models/index');
var async = require('async');

module.exports = {
    newest: function (callback) {
        Models.Comment.find({}, {}, { limit: 5, sort: { 'timestamp': -1 } }, function (err, comments) {

            var attachImage = function (comment, next) {
                Models.Image.findOne({ _id: comment.image_id }, function(err,image){
                    if(err){ throw err; }
                    comment.image = image;
                   //Test for rest Service- JSON Object
                   comment._doc.relImage = image;
                    next(err);
                });
            };
            
            async.each(comments,attachImage,function(err){
                if(err) throw err;
                callback(err,comments);
            });
            
        });

    }

};