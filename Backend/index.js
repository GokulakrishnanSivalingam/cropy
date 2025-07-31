const express = require('express');
const app = express();
const cors = require('cors');

const User = require('./userdb'); // Assuming you have a User model in userdb.js
const Idea = require('./producerdb'); // Now it's an idea, not a producer

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = 5172;

const loadingQuotes = [
  "⚡ Our server is slow like a tractor on a muddy road... Please be patient!",
  "🕰️ Good things take time. Hang in there!",
  "🚜 Loading crops from the field... please wait!",
  "🐌 Server is working at village speed...",
  "🌾 Harvesting data... stay with us!"
];

app.get('/loading-quote', (req, res) => {
  const quote = loadingQuotes[Math.floor(Math.random() * loadingQuotes.length)];
  res.status(200).json({ quote });
});

app.post('/producer', async (req, res) => {
  const { name, number, address, variety, quantity } = req.body;
  try {
    const newProducer = new Producer({ name, number, address, variety, quantity });
    await newProducer.save();
    res.status(201).json({ message: 'Producer saved successfully!' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save producer.' });
  }
});

app.get('/getproducer', async (req, res) => {
  try {
    const { name, number } = req.query;
    let query = {};
    if (name) query.name = name;
    if (number) query.number = number;
    const producers = await Producer.find(query);
    res.status(200).json(producers);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch producers.' });
  }
});

app.delete('/producer/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Producer.findByIdAndDelete(id);
    res.status(200).json({ message: 'Producer deleted successfully!' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete producer.' });
  }
});

// Simple login by name (no password for demo)
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email, password });
    if (user) {
      res.status(200).json({ name: user.name, email: user.email });
    } else {
      res.status(401).json({ error: 'Invalid email or password' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Login failed' });
  }
});

app.post('/register', async (req, res) => {
  const { name, email, password ,confirmpassword} = req.body;   
  try {
    const newUser = new User({ name, email, password , confirmpassword});
    console.log(newUser);
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully!' });
  } catch (err) {
    res.status(500).json({ message: 'Registration failed.' });
  }
});

app.post('/idea', async (req, res) => {
  const { name, imageUrl, district, title, description, about } = req.body;
  try {
    const newIdea = new Idea({ name, imageUrl, district, title, description, about });
    await newIdea.save();
    res.status(201).json({ message: 'Idea saved successfully!' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save idea.' });
  }
});

app.get('/getideas', async (req, res) => {
  try {
    const { name } = req.query;

    // Validate input
    if (!name || name.trim() === "") {
      return res.status(400).json({ error: 'Username is required to fetch ideas.' });
    }

    // Only fetch ideas by this user
    const ideas = await Idea.find({ name });
    res.status(200).json(ideas);
  } catch (err) {
    console.error("Error fetching ideas:", err);
    res.status(500).json({ error: 'Failed to fetch ideas.' });
  }
});
app.get('/getidea', async (req, res) => {
  try {
    const { name } = req.query;
    const query = name ? { name } : {}; // If name exists, filter by it
    const ideas = await Idea.find(query).sort({ createdAt: -1 });
    res.status(200).json(ideas);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch ideas.' });
  }
});

app.delete('/idea/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Idea.findByIdAndDelete(id);
    res.status(200).json({ message: 'Idea deleted successfully!' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete idea.' });
  }
});

app.put('/idea/:id', async (req, res) => {
  const { id } = req.params;
  const { name, imageUrl, district, title, description, about } = req.body;
  try {
    const updated = await Idea.findByIdAndUpdate(
      id,
      { name, imageUrl, district, title, description, about },
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ error: 'Idea not found.' });
    }
    res.status(200).json({ message: 'Idea updated successfully!' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update idea.' });
  }
});
const multer = require('multer');
const fs = require('fs');
const cloudinary = require('./Cloudinary');

const upload = multer({ dest: 'uploads/' });

app.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'crop_images',
    });
    fs.unlinkSync(req.file.path); // Delete temp file
    res.status(200).json({ url: result.secure_url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Upload failed' });
  }
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
