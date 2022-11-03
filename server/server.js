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
const randomNumGen = require('./modules/randomNumGen');
let magicNum = randomNumGen(1, 25);
console.log(magicNum)
// GET & POST Routes go here

// GET: send the array of guesses



// POST: push the guesses into the array
// req: object with guesses in it, e.g, {player1: <num>, player2: <num>}
app.post('/submit', (req, res) => {
  console.log('new guesses: ', req.body);
  const newGuess = {
    roundNum: req.body.roundNum,
    player1: req.body.player1,
    player2: req.body.player2,
    numBot: req.body.numBot,
    p1diff: Number(req.body.player1) - Number(magicNum),
    p2diff: Number(req.body.player2) - Number(magicNum),
    botdiff: Number(req.body.numBot) - Number(magicNum)
  }
  guesses.push(newGuess);
  console.log(`-------------- GUESSES SO FAR:`, guesses, `-------------------`)

  // check guesses
  res.sendStatus(200);
})

app.get('/guesses', (req, res) => {
  console.log('GET request at /guesses', guesses);
  res.send(guesses);
})

app.post('/reset', (req, res) => {
  console.log('resetting the game with new min and max: ', req.body);
  // empty guesses array
  guesses.splice(0, guesses.length);
  console.log(guesses);
  // choose a new magic number
  magicNum = randomNumGen(Number(req.body.newMin), Number(req.body.newMax));
  console.log('new magicNum: ', magicNum);
  res.sendStatus(200);
}
)

app.listen(PORT, () => {
  console.log('Server is running on port', PORT)
})




