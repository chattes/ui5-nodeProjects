var sidebar = require('../helpers/sidebar');
var ImageModel = require('../models/index').Image;

module.exports = {

    index: function (req, res) {

        

        var viewModel = {

            images: []

        };

        ImageModel.find({}, {}, { sort: { timestamp: -1 } }, function (err, images) {
            if (err) { throw err; }
            viewModel.images = images;

            sidebar(viewModel, function (viewModel) {
 
                if (process.argv[2]) {
                    // Testing Rest APIs                     
                    
                    res.render('index', viewModel);
                } else {
                    // Normal Execution
                    res.json(viewModel);
                } 
                

            });
            
            
            

        });

        //        res.render('index', viewModel);







    }
};