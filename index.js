const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// In-memory store for users
let users = [];

// Create a new user
app.post('/users', (req, res) => {
    const { username, password, active } = req.body;
    
    if (!username || !password) {
        return res.status(400).send('Username and password are required');
    }

    const newUser = {
        id: users.length + 1,
        username,
        password,
        active: active !== undefined ? active : true
    };

    users.push(newUser);
    res.status(201).json(newUser);
});

// Read all users
app.get('/users', (req, res) => {
    res.json(users);
});

// Read a single user by ID
app.get('/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));

    if (!user) {
        return res.status(404).send('User not found');
    }

    res.json(user);
});

// Update a user by ID
app.put('/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));

    if (!user) {
        return res.status(404).send('User not found');
    }

    const { username, password, active } = req.body;

    if (username) user.username = username;
    if (password) user.password = password;
    if (active !== undefined) user.active = active;

    res.json(user);
});

// Delete a user by ID
app.delete('/users/:id', (req, res) => {
    const userIndex = users.findIndex(u => u.id === parseInt(req.params.id));

    if (userIndex === -1) {
        return res.status(404).send('User not found');
    }

    users.splice(userIndex, 1);
    res.status(204).send();
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});