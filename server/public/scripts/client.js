$(document).ready(handleReady);

function handleReady() {
  console.log("jquery is loaded!")
  $('#submit-guesses').on('click', postGuesses)

}

// create the req object from the input values, send them as data in a POST request
function postGuesses() {
  console.log('in postGuesses()');
  $.ajax({
    method: 'POST',
    url: '/submit',
    data: {
      player1: $('#player-1-input').val(),
      player2: $('#player-2-input').val()
    }
  }).then((res) => {
    console.log('POST successful: ', res);

    // fire a different function to render display
  }).catch((error) => {
    console.log('something went wrong: ', error)
  });

  getGuesses();
  // clear inputs
  $('#player-1-input').val('')
  $('#player-2-input').val('')

}

function getGuesses() {
  console.log('in getGuesses()');
  $.ajax({
    method: 'GET',
    url: '/guesses'
  }).then((res) => {
    renderDisplay(res)
  })
  // GET request to /guesses
  // retrieve all previous guesses


}
// function to render the display element

function renderDisplay(array) {
  $('#display').empty();
  for (let round of array) {
    $('#display').append(`
      Player 1 guess: ${round.player1}; Player 2 guess: ${round.player2}
    `)
  }
}