const mongoose = require('mongoose');


mongoose.connect('mongodb+srv://game:game@cluster1.xfa43.mongodb.net/produce')
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log(err));

const producerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    imageUrl: { type: String, required: true },
    district: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    about: { type: String, required: true }
}, {
    timestamps: true  
});

const Idea = mongoose.model('Idea', producerSchema);

module.exports = Idea;
