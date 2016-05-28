var express = require('express'),
    path = require('path'),
    config = require('./server/configure');
app = express();
var mongoose = require('mongoose');

app.set('port', process.env.PORT || 3300);
app.set('views', __dirname + '/views');

app = config(app);
app.use('/public', express.static(path.join(__dirname, '/public')));
app.use(express.static(path.join(__dirname,'/WebContent')));

mongoose.connect('mongodb://localhost/imgPloadr');
var db = mongoose.connection;
db.on('open',function () {
    console.log('Mongoose connected');
    
    

});

app.listen(app.get('port'), function () {
    console.log('Server up: http://localhost:' + app.get('port'));
});
