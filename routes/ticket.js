var express = require('express');
var userController = require('../controllers/userController');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;
const ensureLoggedOut = require('connect-ensure-login').ensureLoggedOut;


const router = express.Router();

router.get('/',(req, res) => {
    const isAuthenticated = !!req.user;
    if (isAuthenticated) {
        console.log(`user is authenticated, session is ${req.session.id}`);
        res.redirect('/'+req.user.id);
    } else {
        res.redirect('/createticket');
        console.log("unknown user");
    }
});

router.post('/createticket',jsonParser,(req,res)=>{
    userController.insertTicket(req,res);//insert ticket
});


router.get('/:id/:state',(req,res)=>{
  userController.getById(req,res); //gets all tickets for user works
});

router.patch('/:id',jsonParser,(req,res)=>{
    userController.updateTicketById(req,res);//claim ticket done
});

/*router.get('/:id',(req,res)=>{
    userController.getSharedPool(req,res); //gets sharedpool tickets
});*/






module.exports = router;