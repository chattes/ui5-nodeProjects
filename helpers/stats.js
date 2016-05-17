var Model = require('../models/index'),
    async = require('async');

module.exports = function (callback) {

    async.parallel(
        {
            images: function (next) {
                //next(null,0);
                //Here next is the Callback which will be called
                //when the IO(call to Mongo)  has finished executing

                Model.Image.count({}, function (err, total) {
                    next(err, total);
                })
            },
            comments: function (next) {
                //next(null, 0);
                //We can Directly use the callback next here as the signatures are same
                Model.Comment.count({}, next);
            },
            views: function (next) {

                Model.Image.aggregate({
                    $group: {
                        _id: '1',
                        viewsTotal: {
                            $sum: '$views'
                        }
                    }
                }, function (err, result) {
                    var viewsTotal = 0;
                    if (result.length > 0) {
                        viewsTotal += result[0].viewsTotal;
                    }
                    next(null, viewsTotal);
                });
            },
            likes: function (next) {

                //                next(null, 0);

                Model.Image.aggregate({
                    $group: {
                        _id: '1',
                        likesTotal: {
                            $sum: '$likes'
                        }
                    }
                }, function (err, result) {
                    var likesTotal = 0;
                    if (result.length > 0) {
                        likesTotal += result[0].likesTotal;
                    }
                    next(null, likesTotal);
                });



            }

        },
        function (err, results) {
            callback(null, {
                images: results.images,
                comments: results.comments,
                views: results.views,
                likes: results.likes
            });

        }

    );

};