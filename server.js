const express = require('express');
const routes = require('./controllers')
const app = express();

const sequelize = require('./config/connection');

app.use(express.json());
const PORT = process.env.port || 3001;
// app.use(express.static(path.join(__dirname, 'public')));

app.use(routes); //use api and forum routes

sequelize.sync({ alter: true }).then(() => {
    app.listen(PORT, () => console.log(`Now listening on localhost:${PORT}`));
})