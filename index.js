const express=require('express')
const path=require('path')
const app=express();
const ejsMate=require('ejs-mate');
const passport= require('passport');
const passportLocal= require('passport-local');
const mongoose=require('mongoose');
const User = require("./models/user");
const Room = require("./models/room");
const loginRoutes = require('./routes/login');
const registerRoutes = require('./routes/register');
const roomRoutes = require('./routes/room');
const logoutRoutes = require('./routes/logout');
const session = require('express-session');
const userRoutes = require('./routes/user');


const sessionConfig = {
    secret : 'abhu1998',
    resave : false,
    saveUninitialized : true,

    // setting cookie object
    cookie : {
        // For security
        httpOnly : true,
        // Say to expire in a week, Date.now() gives date in millisecinds
        expires :  Date.now() + 1000 * 60 * 60 * 24 * 7, 
        maxAge :  1000 * 60 * 60 * 24 * 7
    }

};

mongoose.connect('mongodb://localhost:27017/calmChat', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

const db=mongoose.connection;
db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", ()=>{
    console.log("Database Connected");
});



// Our static folder
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({extended : true}));
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'views'));

app.use(session(sessionConfig)); 
app.use(passport.initialize()); // middleware to initialize Passport
app.use(passport.session());
passport.use(new passportLocal(User.authenticate())); // .authenticate and other methods are added by passport-local mongoose to our User model
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) =>{
    res.locals.userLoggedIn=req.user;
    // res.locals.success=req.flash('success');
    // res.locals.error=req.flash('error');
    next(); // To move to next route handlers

})

app.get('/', (req, res)=>{
    res.render("home");
})

app.use('/register', registerRoutes);

app.use('/login', loginRoutes);

app.use('/room', roomRoutes);

app.use('/logout', logoutRoutes);

app.use('/user', userRoutes);



app.listen(7000, ()=> console.log("It's Live !!"))
