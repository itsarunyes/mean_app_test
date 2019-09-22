
var userRoute = require('./user-controller');
var businessRoute = require('./business');

module.exports = function(app) {
    //V1 API Controllers
    app.use('/',userRoute);
    app.use('/business', businessRoute);
}