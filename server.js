const express = require('express');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store); //connect-session-sequelize

const routes = require('./controllers')
const sequelize = require('./config/connection');

const app = express();

app.use(express.json());
const PORT = process.env.port || 3001;
// app.use(express.static(path.join(__dirname, 'public')));

//setup handlebars

const sess = {
    secret: 'blog post secret',
    cookie: {
        maxAge: 86400
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
      db: sequelize,
    }),
};

app.use(session(sess)); 
app.use(routes); //use api and forum routes

sequelize.sync({ alter: true }).then(() => {
    app.listen(PORT, () => console.log(`Now listening on localhost:${PORT}`));
});