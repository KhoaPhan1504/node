const path = require('path');
const express = require('express');
const  app = express();
const bodyParser = require('body-parser')
const port = 4000;

app.use(bodyParser.urlencoded({ extended: false })) 
app.use(bodyParser.json())

app.use('/public', express.static(path.join(__dirname, 'public')));

const AccountModel = require('./models/account')
const PAGE_SIZE = 2;

app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    next();
  });

app.get('/home', (req, res, next) => {
    res.sendFile(path.join(__dirname, 'index.html'));
})

app.get('/user' ,(req, res, next) => {
    var page = req.query.page;
    if(page) {
        // GetPage
        page = parseInt(page);
        var countSkip = (page - 1) * PAGE_SIZE;

        AccountModel.find({})
        .skip(countSkip)
        .limit(PAGE_SIZE)
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.status(500).json("Server Failure!")
        })

    } else {
        // GetAllUser
        AccountModel.find({})
        .then(data => {
            res.json(data);
        })
        .catch(err => { 
            res.status(500).json('Server Failure!');
        })
    }

})

app.listen(port, () => {
    console.log(`App listening on port http://localhost:${port}`);
})
