const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('./config');
const mongoose = require('mongoose');
const authRoutes = require('./authRoutes');
const noteRoutes = require('./noteRoutes'); 
const path = require('path');
const app = express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname))); 

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
  });

mongoose.connect(config.db.uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
  })

.then(() => console.log('Connected to MongoDB...'))
.catch(err => console.error('Could not connect to MongoDB...', err));
``
app.get('/', (req, res) => {
    res.send('Hello, your server is up and running!');
});

app.post('/api/auth/register', (req, res) => {
});

app.post('/api/auth/login', (req, res) => {
});

app.get('/api/notes', (req, res) => {
});

app.post('/api/notes', (req, res) => {
});

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

const users = [];
const notes = []; 


const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; 
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, 'your-secret-key', (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

// Create a note
app.post('/notes', authenticateToken, (req, res) => {
    const { title, content } = req.body;
    const note = { id: notes.length + 1, username: req.user.username, title, content };
    notes.push(note);
    res.status(201).json(note);
});


app.get('/notes', authenticateToken, (req, res) => {
    res.json(notes.filter(note => note.username === req.user.username));
});

app.put('/notes/:id', authenticateToken, (req, res) => {
    const { title, content } = req.body;
    const noteIndex = notes.findIndex(n => n.id === parseInt(req.params.id) && n.username === req.user.username);
    if (noteIndex > -1) {
        notes[noteIndex] = { ...notes[noteIndex], title, content };
        res.json(notes[noteIndex]);
    } else {
        res.sendStatus(404);
    }
});

app.delete('/notes/:id', authenticateToken, (req, res) => {
    const noteIndex = notes.findIndex(n => n.id === parseInt(req.params.id) && n.username === req.user.username);
    if (noteIndex > -1) {
        notes.splice(noteIndex, 1);
        res.sendStatus(204);
    } else {
        res.sendStatus(404);
    }
});

app.listen(3000, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
