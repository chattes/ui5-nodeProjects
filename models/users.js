var mongoose = require('mongoose'),
    bcrypt = require('bcrypt-nodejs'),
    Schema = mongoose.Schema;


var UsersSchema = new Schema({
    name: {type:String, required:true, trim:true},
    email: {type:String, required: true, trim: true, lowercase:true, unique: true},
    image: {type:String},
    password: {type:String, required: true },
    created: {type: Date, default: Date.now}
});

UsersSchema.methods.generateHash = function(password){
    return bcrypt.hashSync(password,bcrypt.genSaltSync(8),null);
};
UsersSchema.methods.validPassword = function(password){

    return bcrypt.compareSync(password,this.password);
};

module.exports = mongoose.model('Users', UsersSchema);