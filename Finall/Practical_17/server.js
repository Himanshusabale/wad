const express = require('express');
const app = express();
const employees = require('./employees.json');
app.use(express.static('public'));
app.get('/api/employees', (req, res) => res.json(employees));
app.listen(3000, () => console.log('Server running at http://localhost:3000'));
