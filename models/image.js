var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    path = require('path');

var ImageSchema = new Schema({

                      title:{type: String},
                      description:{type: String},
                      fileName:{type:String},
                      views:{type:Number, 'default':0},
                      likes:{type:Number, 'default':0},
                      timestamp:{type:Date, 'default': Date.now}

});

ImageSchema.virtual('uniqueId').get(function () {

    return this._doc.fileName.replace(path.extname (this._doc.fileName), '');
});

module.exports = mongoose.model('Image', ImageSchema);