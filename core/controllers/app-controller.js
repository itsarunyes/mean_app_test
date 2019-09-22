
var api = require('./api');
var businessRoute = require('./business');

module.exports = function(app) {
    //V1 API Controllers
    app.use('/',api);
    app.use('/business', businessRoute);
}