var express = require('express');
var userController = require('../controllers/userController');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

const router = express.Router();

router.post('/inserefaq',jsonParser,(req,res)=>{
    userController.insertFaq(req,res);
});

router.post('/deletefaq/:id',jsonParser,(req,res)=>{
   userController.removeFaq(req,res);
});

router.patch('/editfaq/:id',jsonParser,(req,res)=>{
    userController.editFaq(req,res);
});

router.get('/',(req,res)=>{
    userController.getAllFaqs(req,res);

});

router.get('/updatepin/:id',(req,res)=>{
    userController.updatePin(req,res);
});

router.get('/pinnedfaq',jsonParser,(req,res)=>{
    userController.getPinnedFAQ(req,res);
    }
)

module.exports = router;