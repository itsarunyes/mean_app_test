var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/meanstack', {useNewUrlParser: true})


var config = require('./../config');
var envSettings = config.getEnvSettings(process.env.NODE_ENV);

const connection = (closure)=>{
    return MongoClient.connect(envSettings.base_url+'meanstack', { useNewUrlParser: true },(err,db)=>{
        if(err){
            return console.log('error');
        }
        closure(db);
    });
}

let response = {
    status: 200,
    message: null,
    data:[]
}

let sendError=(err,res)=>{
    response.status=501;
    response.message = typeof err == 'Object'?err.message:err;
    res.status(501).json(response);
}

router.get('/users',(req,res)=>{
    connection((db)=>{
        var database = db.db('meanstack');
        database.collection('Users').find().toArray().then((users)=>{
            response.data = users;
            res.json(response);
        })
    })
})﻿

router.get('/users/:id',(req,res)=>{
    connection((db)=>{
        let id = req.params.id;
        var database = db.db('meanstack');
        database.collection('Users').find({ _id: id }).then((user)=>{
            response.data = user;
            
            res.json(response);
        })
    })
})﻿



module.exports = router;