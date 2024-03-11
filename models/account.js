const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/KagaShop', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const Schema = mongoose.Schema;

const AccountSchema = new Schema({
  username: { type: String},
  password: { type: String}
}, {
   collection: 'account'
});

const AccountModel = mongoose.model('account', AccountSchema)


module.exports = AccountModel;
