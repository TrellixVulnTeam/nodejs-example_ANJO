const express = require('express') ;
const path = require('path') ;
const morgan = require('morgan') ;
const handlebars = require('express-handlebars') ;

const app = express() ;

const port = 3000;

const route = require("./routes");
const db = require('./config/db/index');

db.connect();

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());

app.use(morgan('combined'));
// Template Engine
app.engine('hbs', handlebars.engine({extname: '.hbs'}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resource', 'views'));

// Route init
route(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
})