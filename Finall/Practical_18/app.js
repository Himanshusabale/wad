// Perform the following tasks using node.js, Express.js and MongoDB. The
// following operation should be performed only on Nodejs and Express.js.
// a) Create a Database called music.
// b) Create a collection called song details
// c) Insert array of 5 song documents in above Collection.
// [Documenthave following field:
// Songname, Film, Music_director,singer]
// d) Display total count of documents and List all the
// documents inbrowser.
// e) List specified Music Director songs.
// f) List specified Music Director songs sung by specified Singer
// g) Delete the song which you don’t like.
// h) Add new song which is your favourite.
// i) List Songs sung by Specified Singer from specified film.
// j) Update the document by adding Actor and Actress name.
// k) Display the above data in Browser in tabular format.
// Song
// Name
// Film
// Name
// Music
// Director
// Singer Actor Actress
// ABC DEF GHI JKL MNO PQR
// C18 Design and develop Student Management System using Salesforce Cloud
const express = require('express');
const mongoose = require('mongoose');
const Song = require('./models/song');
const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/music', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("Connected to DB"));

// Insert 5 songs initially
app.get('/insert', async (req, res) => {
  const songs = [
    { Songname: "Song A", Film: "Film A", Music_director: "Director 1", Singer: "Singer X" },
    { Songname: "Song B", Film: "Film B", Music_director: "Director 2", Singer: "Singer Y" },
    { Songname: "Song C", Film: "Film C", Music_director: "Director 1", Singer: "Singer X" },
    { Songname: "Song D", Film: "Film D", Music_director: "Director 3", Singer: "Singer Z" },
    { Songname: "Song E", Film: "Film E", Music_director: "Director 1", Singer: "Singer Y" },
  ];
  await Song.insertMany(songs);
  res.send("Inserted 5 songs.");
});

// Homepage — all songs
app.get('/', async (req, res) => {
  const songs = await Song.find();
  const count = await Song.countDocuments();
  res.render('index', { songs, count });
});

// Filter by Music Director (form)
app.get('/director', async (req, res) => {
  const songs = await Song.find({ Music_director: req.query.name });
  res.render('index', { songs, count: songs.length });
});

// Filter by Music Director + Singer (form)
app.get('/search-director-singer', async (req, res) => {
  const { dir, singer } = req.query;
  const songs = await Song.find({ Music_director: dir, Singer: singer });
  res.render('index', { songs, count: songs.length });
});

// Filter by Film + Singer (form)
app.get('/search-film-singer', async (req, res) => {
  const { film, singer } = req.query;
  const songs = await Song.find({ Film: film, Singer: singer });
  res.render('index', { songs, count: songs.length });
});

// Delete a song
app.get('/delete/:song', async (req, res) => {
  await Song.deleteOne({ Songname: req.params.song });
  res.redirect('/');
});

// Add new song
app.post('/add', async (req, res) => {
  const { Songname, Film, Music_director, Singer } = req.body;
  await Song.create({ Songname, Film, Music_director, Singer });
  res.redirect('/');
});

// Update Actor/Actress
app.post('/update', async (req, res) => {
  const { Songname, Actor, Actress } = req.body;
  await Song.updateOne({ Songname }, { $set: { Actor, Actress } });
  res.redirect('/');
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
