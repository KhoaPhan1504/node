const path = require('path');
const express = require('express');
const  app = express();
const bodyParser = require('body-parser')
const port = 4000;

app.use(bodyParser.urlencoded({ extended: false })) 
app.use(bodyParser.json())

app.use('/public', express.static(path.join(__dirname, 'public')));

const AccountModel = require('./models/account')
const jwt = require('jsonwebtoken');
var cookieParser = require('cookie-parser');

app.use(cookieParser()) ;

const PAGE_SIZE = 2;

app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    next();
  });

// GET LOGIN
app.get('/login', (req, res, next) => {
    res.sendFile(path.join(__dirname, 'login.html'));
})

app.get('/home', (req, res, next) => {
    var token = req.cookies;
    console.log(token);
    next();
} ,(req, res, next) => {
    res.sendFile(path.join(__dirname, 'home.html'));
})

app.post('/add-new',)

// POST LOGIN
app.post('/login',  (req, res, next) => {
    var username = req.body.username;
    var password = req.body.password;

    AccountModel.findOne({
        username: username,
        password: password
    })
    .then(data => {
        if(data) {
            var token = jwt.sign({
                _id: data._id
            }, 'mk')
            return res.json({
                message: "Succesfully!",
                token: token

            });
        } else {
            return res.json('Failure!');
        }
    })
    .catch(err => {
        res.status(500).json('Server Failure!')
    })
})


app.get('/private', (req, res, next) => {
    try {
        var token = req.cookies.token;
        var result = jwt.verify(token, 'mk');

        if(result) {
            next();
        }
    } catch (error) {
        return res.redirect('/login');
    }
}, (req, res, next) => { 
    res.json('WELCOME');
})

var checkLogin = (req, res, next) => {
    // Check Login
    try {
        var token = req.cookies.token;
        var idUser = jwt.verify(token, 'mk');
        AccountModel.findOne({
            _id: idUser
        })
        .then(data => {
            if(data) {
                req.data = data;
                next();
            } else {
                res.json('NOT PERMISSION');
            }
        })
        .catch(err => {
            
        })

    } catch (error) {
        res.status(500).json('Token Invalid!');
    }

}

var checkStudent = (req, res, next) => {
    var role = req.data.role;
   if(role >= 0) {
        next();
   } else {
        res.json('NOT PERMISSION');
   }
}

var checkTeacher = (req, res, next) => {
    var role = req.data.role;
    if(role >= 1) {
        next();
   } else {
        res.json('NOT PERMISSION');
   }
}

var checkManager = (req, res, next) => {
    var role = req.data.role;
   if(role >= 3) {
        next();
   } else {
        res.json('NOT PERMISSION');
   }
}



app.get('/task', checkLogin, checkStudent, (req, res, next) => { 
    console.log(req.data);
    res.json('ALL TASK');
})

app.get('/student', checkLogin, checkTeacher, (req, res, next) => {
    next();
}, (req, res, next) => { 
    res.json('STUDENT');
})

app.get('/teacher', checkLogin ,checkTeacher, checkManager, (req, res, next) => {
    next();
}, (req, res, next) => { 
    res.json('TEACHER');
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
