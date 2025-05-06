const express = require('express');
const app = express();
const menu = require('./menu.json')
app.use(express.static('public'));
app.get('/api/menu', (req,res) => res.json(menu));
app.listen(3000, () => console.log('Website running at http://localhost:3000'));
