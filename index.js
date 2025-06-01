const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/login', (req, res) => {
  const { username } = req.body;
  if (username) {
    res.cookie('user', username, { maxAge: 900000 });
  }
  res.redirect('/');
});

app.post('/logout', (req, res) => {
  res.clearCookie('user');
  res.redirect('/');
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
