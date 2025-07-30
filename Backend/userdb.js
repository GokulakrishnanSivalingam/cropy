const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://game:game@cluster1.xfa43.mongodb.net/produce')
    .then(() => console.log('MongoDB connected (userdb)'))
    .catch((err) => console.log(err));

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  confirmpassword:String
});

module.exports = mongoose.model('User', userSchema);