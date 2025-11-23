/*requires*/ 
const routes = require("./routes/routes");

const express = require('express');

const app = express();
const path = require("path");

const session = require("express-session") 

const methodOverride = require('method-override');
app.use(methodOverride('_method'));

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({extended:true}));
app.use(express.json());

/*session*/ 
app.use(session({
    secret: "buizel",
    resave: false,
    saveUninitialized: false
})) 

/*multer para las fotos*/ 
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); 
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

/* app.use para valores globales */
app.use((req, res, next) => {
  req.upload = upload;
  next();
});

app.use((req, res, next) => {
  res.locals.userLogged = req.session.userLogged || null;
  next();
});
app.use((req, res, next) => {
    res.locals.userLogged = req.session.userLogged || null;
    res.locals.carrito = req.session.carrito || [];
    next();
});

app.use("/", routes);

/*listen para especificar el puerto */
app.listen(3002, () => {
    console.log("motivación for the win")
})