const express = require('express');
const app = express();
const users = require('./users.json');
app.use(express.static('public'));
app.get('/api/users', (req, res) => res.json(users));
app.listen(3000, () => console.log('Server running on http://localhost:3000'));
