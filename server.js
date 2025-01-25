const express = require('express')
const bodyParser = require('body-parser')

const mongodb = require('./data/database')

const app = express();

const port = process.env.PORT || 8000;

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    res.setHeader("Access-Control-Allow-Methods", 'GET, POST, PUT, DELETE, OPTIONS');
    next();
})

app.use('/', require('./routes'));

mongodb.intDb((err) => {
    if (err) {
        console.log(err)
    }else{
        app.listen(port, () => (console.log(`Data Base is listening and Server started on port ${port}`)));
    }
}) 