var express= require('express');
var bodyParser = require('body-parser');
cors = require('cors');
var path =require('path');
var http = require('http');
mongoose = require('mongoose');
config = require('./DB');

mongoose.Promise = global.Promise;
mongoose.connect(config.DB,{useNewUrlParser: true}).then(
    ()=> {console.log("Database is connected")},
    err=>{console.log('Cannot connect to database - '+err)}
    );

var app= express();

//var api = require('./server/api');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cors());
app.use(express.static(path.join(__dirname,'dist')));

app.get('*'),(req,res)=>{
    res.sendFile(path.join(__dirname,'dist/index.html'));
}

var port = process.env.PORT || '3000';
var server = http.createServer(app);
server.listen(port,()=> console.log('Server is running'));

app.start = app.listen = function () {
    return server.listen.apply(server, arguments)
}

app.start(port)
require('./core/controllers/app-controller')(app);
//app.set('port',port);


module.exports = app;

// var server = http.createServer(app);
// server.listen(port,()=> console.log('Server is running'));