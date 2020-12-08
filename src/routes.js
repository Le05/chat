const express = require('express');
const routes = express.Router();
const jwt = require('./configs/authorization/functionsJWT');
const path = require('path');

routes.get('/',function(req,res){
    res.sendFile('C:/Users/Leo/Documents/ProjetosNode/chatBase');
});

module.exports = routes;