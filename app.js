const routes = require("./routes/routes");

const express = require('express');

const app = express();
const path = require("path");

const methodOverride = require('method-override');
app.use(methodOverride('_method'));

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({extended:true}));
app.use(express.json());

const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // carpeta donde guardar temporalmente
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

app.use((req, res, next) => {
  req.upload = upload;
  next();
});

app.use("/", routes);

app.listen(3002, () => {
    console.log("motivación for the win")
})