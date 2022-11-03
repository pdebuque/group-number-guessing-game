$(document).ready(handleReady);

function handleReady() {
  console.log("jquery is loaded!")
  $('#submit-guesses').on('click', postGuesses)
  $('#reset').on('click', resetGame)
}

let roundNumber = 1;
// create the req object from the input values, send them as data in a POST request
function postGuesses() {
  if ($('#player-1-input').val() === $('#player-2-input').val()) {
    alert('please choose different numbers')
  } else {

    console.log('in postGuesses()');
    $.ajax({
      method: 'POST',
      url: '/submit',
      data: {
        roundNum: roundNumber,
        player1: $('#player-1-input').val(),
        player2: $('#player-2-input').val(),
        numBot: Math.floor(Math.random() * 26)
      }
    }).then((res) => {
      console.log('POST successful: ', res);

      // fire a different function to render display
    }).catch((error) => {
      console.log('something went wrong: ', error)
    });

    getGuesses();
    // clear inputs
    $('#player-1-input').val('');
    $('#player-2-input').val('');
    roundNumber++;
  }
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
  $('#celebrate').empty();
  $('#guess-counter').empty();
  $('#guess-list').empty();
  for (let round of array) {
    $('#guess-list').prepend(`
      
      <div class="round-data">
      <div class='round-number'>
        Round <span class="round-num">${round.roundNum}</span>
      </div>
        <div class="p1-data">
          <h2>Player 1</h2>
          <div class="p1-guess">
            guess: ${round.player1} 
          </div>
          <div class="diff p1-diff">
          ${parseDiff(round.p1diff)}
          </div>
        </div>
        <div class="p2-data">
          <h2>Player 2</h2>
          <div class="p2-guess">
            guess: ${round.player2}
          </div>
          <div class="diff p2-diff">
            ${parseDiff(round.p2diff)}
          </div>
        </div>
        <div class="bot-data">
          <h2>numbot</h2>
          <div class="bot-guess">
            guess: ${round.numBot}
          </div>
          <div class="diff bot-diff">
            ${parseDiff(round.botdiff)}
          </div>
        </div>
      </div>
    `)
  }
  const lastRound = array[array.length - 1];
  if (lastRound.p1diff === 0 || lastRound.p2diff === 0 || lastRound.botdiff === 0) {
    $('#celebrate').removeClass('hidden').addClass('not-hidden');
    $('#submit-guesses').prop('disabled', true)
  }
  if (lastRound.p1diff === 0) {
    $('#celebrate').text('Player 1 wins!')
  } else if (lastRound.p2diff === 0) {
    $('#celebrate').text('Player 2 wins!')
  } else if (lastRound.botdiff === 0) {
    $('#celebrate').text('BOW DOWN, FEEBLE FLESH BAGS')
  }


  $('#guess-counter').removeClass('number-change').addClass('number-change');
  $('#guess-counter').text(array.length);

  // logic to interpret p1diff and p2diff
  // diff = 0 => same number. correct guess
  // diff <0 => guess is too low
  // diff >0 => guess is too high
  if (Number(p1diff) === 0 || Number(p2diff) === 0) {
    $('#restart').removeClass('hidden').addClass('not-hidden');
  };
}

function parseDiff(diff) {
  if (diff === 0) {
    return 'You got it!'
  } else if (diff < 0) {
    return 'Too low!'
  } else {
    return 'Too high!'
  }

}

function resetGame() {
  let minFromInput;
  let maxFromInput;
  if (!$('#new-min').val() || !$('#new-max').val()) {
    minFromInput = 1;
    maxFromInput = 25;
  } else {
    minFromInput = $('#new-min').val();
    maxFromInput = $('#new-max').val();
  }

  $.ajax({
    type: 'POST',
    url: 'reset',
    data: {
      newMin: minFromInput,
      newMax: maxFromInput
    }
  }).then((res) => {
    renderDisplay()
  }).catch((err) => {
    console.log('reset didn\'t work: ', err)
  })

  // clear inputs
  $('#new-min').val('');
  $('#new-max').val('');
  roundNumber = 1;
  $('#celebrate').removeClass('not-hidden').addClass('hidden');
  $('#submit-guesses').prop('disabled', false)
}