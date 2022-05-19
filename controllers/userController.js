const UserModel = require('../models/user');


//create new agent

exports.insert = (req, res) => {
    UserModel.createAgente(req.body, (doc, err) => {
        if(!err) res.status(201).send({id: doc._id});
        else res.status(500).send({message: err.message});
    });
};
//create new faq
exports.insertFaq = (req, res) => {
    UserModel.createFaq(req.body, (doc, err) => {
        if(!err) res.status(201).send({category:doc.category,question:doc.question,answer:doc.answer});
        else
            res.status(500).send({message: err.message});
    });
};
//create new ticket
exports.insertTicket=(req,res)=>{
    UserModel.createTicket(req.body,(doc,err)=>{
        if(!err) res.status(201).send({email: doc.email,subject:doc.subject,faq:doc.faq});
        else res.status(500).send({message: err.message});
    });
};

//Gets sharedpool objects
exports.getSharedPool=(req,res)=>{
    UserModel.findByState((doc,err)=>{
        if (!err)
            res.status(200).send(doc);
        else
            res.status(500).send({message:err.message});
    });
};

//gets agents tickets
exports.getById = (req, res) => {
    UserModel.findByAgentId(req.params.id,req.params.state,(doc, err) => {
        if(!err) res.status(200).send(doc);
        else res.status(500).send({message: err.message});
    });
};

//gets specific ticket by id
exports.getTicketById = (req, res) => {
    UserModel.findTicketById(req.params.id, (doc, err) => {
        if(!err) res.status(200).send(doc);
        else res.status(500).send({message: err.message});
    });
};

//claim ticket
exports.updateTicketById = (req, res) => {
    UserModel.updateTicket(req.params.id, req.body, (doc, err) => {
        if(!err)
            res.status(200).send(doc);
        else
            res.status(500).send({message: err.message});
    });
};
//removes faq
exports.removeFaq=(req,res)=>{
    UserModel.deleteFaq(req.params.id,(err)=>{
        if(!err)
            res.status(200).send('FAQ DELETED');
        else
            res.status(500).send({message: err.message});
    });
};

exports.editFaq=(req,res)=>{
    UserModel.updateFaq(req.params.id,req.body,(doc,err)=>{
        if(!err)
            res.status(200).send(doc);
        else
            res.status(500).send({message:err.message});
    });
};

exports.updatePin=(req,res)=>{
    UserModel.unpinFAQ((err)=>{
        if(!err){
            UserModel.pinFAQ(req.params.id,(doc,erro)=>{
                if(!erro)
                    res.status(200).send(doc);
                else
                    res.status(500).send({message:erro.message});
            })}
        else
            res.status(500).send({message:err.message});
    });
};

exports.getPinnedFAQ=(req,res)=>{
    UserModel.findPinnedFAQ((doc,err)=>{
        if (!err)
            res.status(200).send(doc);
        else
            res.status(500).send({message:err.message});
    });
};

exports.getAllFaqs=(req,res)=>{
    UserModel.findAllFaqs((doc,err)=>{
        if (!err)
            res.status(200).send({category:doc.category,question:doc.question,answer:doc.answer});
        else
            res.status(500).send({message:err.message});
    })
};

exports.removeById = (req, res) => {
    UserModel.removeById(req.params.id, (err) => {
        if(!err) res.status(204).send({});
        else res.status(500).send({message: err.message});
    });
};
