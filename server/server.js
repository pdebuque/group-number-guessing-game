const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const PORT = 5000;

// app.use(express.json)

// This must be added before GET & POST routes.
app.use(bodyParser.urlencoded({ extended: true }))

// Serve up static files (HTML, CSS, Client JS)
app.use(express.static('server/public'));

const guesses = [];
//set up the random number. this will reset when the server reloads
const randomNum = Math.floor(Math.random() * 26)

// GET & POST Routes go here

// GET: send the array of guesses



// POST: push the guesses into the array
// req: object with guesses in it, e.g, {player1: <num>, player2: <num>}
app.post('/submit', (req, res) => {
  // console.log('new guesses: ', req);
  guesses.push(req.body);
  console.log(`-------------- GUESSES SO FAR:`, guesses, `-------------------`)

  // check guesses
  res.sendStatus(200);
})

app.get('/guesses', (req, res) => {
  console.log('GET request at /guesses', guesses);
  res.send(guesses);
})

app.listen(PORT, () => {
  console.log('Server is running on port', PORT)
})




