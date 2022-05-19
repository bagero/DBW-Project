const mongoose = require('./mongooseConfigs').mongoose;
const Schema = mongoose.Schema;
const fetch = require('node-fetch');
const {ObjectId} = require("mongodb");
const passport= require('passport');
const LocalStrategy = require("passport-local").Strategy;

//agente schema
const agenteSchema = new mongoose.Schema({
    username: {type:String,unique:true},
    password: String,
    Solved:Number
});
//ticket schema
const ticketSchema=new mongoose.Schema({
    email:String,
    subject:String,
    state:String,
    message:{type:String,unique:true},
    agente:{
        type:Schema.Types.ObjectId,
        ref:'Agente'
    },
    faq:{
        type:Schema.Types.ObjectId,
        ref:'FAQ'
    }
});

const chatSchema=new mongoose.Schema({
    user:String,
    message:String,
    timeStamp:String
})

const faqSchema=new mongoose.Schema({
    category:String,
    question: {type:String,unique:true},
    answer:String,
    pinned:{type:Boolean,default:false}
});
//creeate chatroom model
const Chatroom=mongoose.model('Chatroom',chatSchema);
//create faq model
const FAQ=mongoose.model('FAQ',faqSchema);
//create ticket model
const Ticket=mongoose.model('Ticket',ticketSchema);
//Create agent model
const Agente = mongoose.model('Agente', agenteSchema);

//finds a ticket by id
exports.findTicketById = (id, cb) => {
    Ticket.findById(id, { _id:0, email:1, subject:1,state:1})
        .populate({ path: 'agente',select:'id', model:Agente})
        .populate({ path: 'faq',select:'question',model: FAQ })
        .exec()
        .then(doc => {
            cb(doc);
        })
        .catch(err => cb(null, err));

};
//finds all sharedpool tickets
exports.findByState=(cb)=>{
    Ticket.find({state:"sharedpool"})
        .exec()
        .then(doc=>{
            cb(doc);
        }).catch(err=>cb(null,err));
};
//finds all tickets regarding agent id
exports.findByAgentId=(id,state,cb)=>{
    Ticket.find({agente:id,state:state})
        .exec()
        .then(doc=>{
            cb(doc);
        })
        .catch(err=>cb(null,err));
};

//create new agent
exports.createAgente = (agenteData, cb) => {
    const agente = new Agente(agenteData);
    agente.save()
        .then(doc => cb(doc))
        .catch(err => cb(null, err));
};



//create new ticket
exports.createTicket=(ticketData,cb)=>{
    const ticket=new Ticket(ticketData);
    ticket.save()
        .then(doc=>cb(doc))
        .catch(err=>cb(null,err));
};


//claim ticket
exports.updateTicket = (id, ticketData, cb) => {
    Ticket.findOneAndUpdate({_id: id}, {$set:ticketData})
        .exec()
        .then(doc => {
            cb(doc);
    })
        .catch(err => cb(null, err));
};

//passport login strategy
passport.use(new LocalStrategy(
    function(username, password, done) {
        Agente.findOne({ username: username }, function (err, user) {
            if (err) { return done(err); }
            if (!user) { return done(null, false); }
            if (!user.password===password) { return done(null, false); }
            return done(null, user);
        });
    }
));
//user serialization
passport.serializeUser((user, cb) => {
    console.log(`serializeUser ${user.id}`);
    cb(null, user.id);
});
//user deserialization

passport.deserializeUser((id, cb) => {
    console.log(`deserializeUser ${id}`);
    Agente.findById(id, function (err, user) {
        if (err) { return cb(err); }
        cb(null, user);
    });
});

//create new faq
exports.createFaq=(faqData,cb)=>{
    const faq=new FAQ(faqData);
    faq.save()
        .then(doc=>cb(doc))
        .catch(err=>cb(null,err));

};

//deletes FAQ by id
exports.deleteFaq=(id,cb)=>{
    FAQ.deleteOne({_id:id})
        .exec()
        .then(()=>cb())
        .catch(err=>cb(err));
};
//update FAQ by id
exports.updateFaq=(id,faqData,cb)=>{
    FAQ.findOneAndUpdate({_id:id}, {$set:faqData})
        .exec()
        .then(doc=>{
        cb(doc);
    })
        .catch(err=>cb(null,err));
};
//finds all FAQS
exports.findAllFaqs=(cb)=>{
    FAQ.find({})
        .exec()
        .then(doc=>{
            cb(doc);
        })
        .catch(err=>cb(null,err))
};

//Unpin previous FAQ

exports.unpinFAQ=(cb)=>{
    FAQ.findOneAndUpdate({pinned:Boolean(true)},{$set:{pinned:Boolean(false)}})
        .exec()
        .then(()=>cb())
        .catch(err=>cb(null,err));
};

//pins faq after unpin is done
exports.pinFAQ=(id,cb)=>{
    FAQ.findOneAndUpdate({_id:id},{$set:{pinned:Boolean(true)}})
        .exec()
        .then(()=>cb())
        .catch(erro=>cb(null,erro));
};

exports.findPinnedFAQ=(cb)=>{
    FAQ.findOne({pinned:true})
        .exec()
        .then(doc=>{
            cb(doc);
        })
        .catch(err=>cb(null,err));
};

exports.removeById = (agenteId, cb) => {

    Agente.deleteMany({ _id: agenteId })
        .exec()
        .then(() => cb())
        .catch(err => cb(err));

};

