var Models = require('../models/index');
module.exports = {
    popular: function(callback) {
        
        var images;
        
        Models.Image.find({},{},{ limit : 9, sort:{ likes: -1 }}, function(err, images){
            
            if(err) throw err;
            callback(err, images);
        });
        
    }
};