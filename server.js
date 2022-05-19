var express = require('express');
var bodyParser = require('body-parser');
var app = express();
const port = 3000;
const passport = require("passport");
const session = require("express-session");
var urlencodedParser = bodyParser.urlencoded({extended:false});
const sessionMiddleware = session({ secret: "changeit", resave: false, saveUninitialized: false });
var ejs = require('ejs');

app.use(sessionMiddleware);
app.use(urlencodedParser);
app.use(passport.initialize());
app.use(passport.session());
app.set('view engine', 'ejs');

//insert passport.use here

//User routes and use them as middleware, i.e. every time a request url matches '/users' the appropriate route will be followed according to the HTTP verb (app.get/post/put/patch/delete)
const userRoutes = require('./routes/users');
const faqRoutes =require('./routes/faq');
const ticketRoutes =require('./routes/ticket');
const rootRoutes =require('./routes/root');

app.use('/', rootRoutes);
app.use('/users', userRoutes);
app.use('/faq',faqRoutes);
app.use('/ticket',ticketRoutes);

var server = app.listen(port, function () {
    console.log(`application is running at: http://localhost:${port}`);
});
