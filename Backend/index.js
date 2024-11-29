const express = require('express');
const app = express();
const cors = require('cors');

const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Producer = require('./producerdb')

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = 5172;

app.post('/producer', async(req, res) => {
    const { name, number, address, variety } = req.body;
    try {
        const newProducer = new Producer({ name, number, address, variety });
        await newProducer.save();
        res.status(201).json({ message: 'Producer saved successfully!' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to save producer.' });
    }
});

app.get('/getproducer', async(req, res) => {
    try {
        const producers = await Producer.find();
        res.status(200).json(producers);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch producers.' });
    }
});
app.delete('/producer/:id', async(req, res) => {
    const { id } = req.params;
    try {
        await Producer.findByIdAndDelete(id);
        res.status(200).json({ message: 'Producer deleted successfully!' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete producer.' });
    }
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});