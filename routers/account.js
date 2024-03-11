const express = require('express');
const router = express.Router();
const AccountModel = require('../models/account');

router.get('/', (req, res, next) => {
    AccountModel.find({})
    .then(data => {
        res.json(data);
    })
    .catch(err => {
        res.status(500).json('Server Failure!');
    })
})

router.get('/:id', (req, res, next) => {
    const id = req.params.id
    AccountModel.findById(id)
    .then(data => {
        res.json(data);
    })
    .catch(err => {
        res.status(500).json('Server Failure!');
    })
})

router.post('/', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    AccountModel.create({
        username: username,
        password: password
    })
    .then(data => {
        res.json('Create account successfully!');
    })
    .catch(err => {
        res.status(500).json('Server Failure!');
    })
})

router.put('/:id', (req, res, next) => {
    const id = req.params.id;
    const newPassword = req.body.newPassword;
    AccountModel.findByIdAndUpdate(id, {
        password: newPassword
    })
    .then(data => {
        res.json('Update account successfully!');
    })
    .catch(err => {
        res.status(500).json('Server Failure!');
    })
})

router.delete('/:id', (req, res, next) => {
    const id = req.params.id;
    AccountModel.findByIdAndDelete(id)
    .then(data => {
        res.json('Delete account successfully!');
    })
    .catch(err => {
        res.status(500).json('Server Failure!');
    })
})





module.exports = router;