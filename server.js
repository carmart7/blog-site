const path = require('path');
const express = require('express');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store); //connect-session-sequelize
const exphbs = require('express-handlebars');


const helpers = require('./utils/helpers');
const routes = require('./controllers')
const sequelize = require('./config/connection');

const app = express();

app.use(express.json());
const PORT = process.env.port || 3001;
app.use(express.static(path.join(__dirname, 'public')));

//setup handlebars
const hbs = exphbs.create({ helpers });


const sess = {
    secret: 'blog post secret',
    cookie: {
        maxAge: 300000 //5 minute max age
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
      db: sequelize,
    }),
};

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(session(sess)); 
app.use(routes); //use api and forum routes

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Now listening on localhost:${PORT}`));
});