var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/meanstack', {useNewUrlParser: true})


const connection = (closure)=>{
    return MongoClient.connect('mongodb://localhost:27017/meanstack', { useNewUrlParser: true },(err,db)=>{
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