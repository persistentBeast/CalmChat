const express=require('express')
const path=require('path')
const app=express();
const ejsMate=require('ejs-mate');




// Our static folder
app.use(express.static(path.join(__dirname, 'public')));
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'views'));



app.get('/', (req, res)=>{
    res.render("home");
})

app.get('/register', (req, res)=>{
    res.render("register");
})

app.get('/login', (req, res)=>{
    res.render("login");
})

app.get('/room', (req, res)=>{
    res.render('room');
})




app.listen(7000, ()=> console.log("It's Live !!"))
