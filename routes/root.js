var express = require('express');
var userController = require('../controllers/userController');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;
const ensureLoggedOut = require('connect-ensure-login').ensureLoggedOut;

const router = express.Router();

router.get('/',(req,res)=>{
    const isAuthenticated = !!req.user
    if (isAuthenticated){
        res.render("index");
    }

});
module.exports = router;