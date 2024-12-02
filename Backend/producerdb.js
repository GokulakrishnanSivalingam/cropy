const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://game:game@cluster1.xfa43.mongodb.net/produce')
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log(err));


const producerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    number: {
        type: String,
        required: true,
    },

    address: {
        type: String,
        required: true,
    },
    variety: {
        type: String,
        required: true,
    },
    quantity: {
        type: String,
        required: true,
    }
});

const Producer = mongoose.model('Producer', producerSchema);
module.exports = Producer;