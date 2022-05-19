var express = require('express');
var userController = require('../controllers/userController');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var passport=require('passport');

const router = express.Router();


/*router.get('/ticket',jsonParser, function (req, res) {
    userController.getById(req, res);
});*/

/*router.post('/', jsonParser, function (req, res) {
    userController.insert(req, res);//create agente
});*/

/*router.post('/faq',jsonParser,(req,res)=>{
    userController.insertFaq(req,res);//working
});*/

router.post("/login",jsonParser,passport.authenticate("local",{
    successRedirect: "/",
    failureRedirect: "/",
})

);

/*router.patch('/:id', jsonParser, function (req, res) {
    userController.patchById(req, res)
});

/*router.delete('/:id', function (req, res) {
    userController.removeById(req, res);
});*/

//Let's expose these routes
module.exports = router;