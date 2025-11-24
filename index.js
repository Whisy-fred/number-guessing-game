// get player name from localStorage
const playerName = localStorage.getItem('playerName') || 'Player';
document.getElementById('wlc-name-header').textContent =
  'Hello, ' + playerName + ' 👋';

function refreshPage() {
  location.reload();
}

let restartbtn = document.getElementById('restartbtn');
let errorMsg = document.getElementById('error-msg');
let noteMsg = document.getElementById('note-msg');
let inputGuess = document.getElementById('input-guess');
let btnGuess = document.getElementById('btn-guess');
const gameReuslt = document.querySelector('.game-result');
let minNum = 1;
let maxNum = 100;
let attempts = 0;
let answer = Math.floor(Math.random() * 100 + 1);
const guesses = [];

btnGuess.onclick = function () {
  let guess = Number(inputGuess.value);
  guesses.push(guess);

  let maxattempts = 10;
  if (attempts === maxattempts) {
    inputGuess.disabled = true;
    document.querySelector('main').style.pointerEvents = 'none';
    gameReuslt.style.opacity = '1';
    gameReuslt.innerHTML = `
        <h2>You Lost</h2>
        <p>Answer: ${answer}</p>
        <div>Your guesses so far: 
          <p class="guesses">${guesses.join(', ')}</p>
        </div>
        <p id="error-msg">Refresh to try again</p>
restartButton();
    `;
  } else {
    attempts++;
    if (guess < answer) {
      noteMsg.innerText = 'Too low! Try again';
    } else if (guess > answer) {
      noteMsg.innerText = 'Too high! Try again';
    }
  }
  if (guess === answer) {
    winningSound();
    inputGuess.disabled = true;
    gameReuslt.style.opacity = '1';
    gameReuslt.innerHTML = `
        <h2>You Won</h2>
        <p>Answer: ${answer}</p>
        <div>Your guesses so far: 
          <p>${guesses.join(', ')}</p>
        </div>

        <p id="error-msg">Refresh to play again</p>
restartButton();
    `;

    if (attempts >= 1 && attempts < 3) {
      document.getElementById(
        'error-msg'
      ).innerText = `🎉 Congrats, you nailed it!🔥 The answer was ${answer} — you crushed it in just ${attempts} attempts!`;
    } else if (attempts >= 3 && attempts < 7) {
      document.getElementById(
        'error-msg'
      ).innerText = `🥳 Great job! You figured it out — the answer was ${answer}. You took ${attempts} attempts.`;
    } else if (attempts >= 7 && attempts < 10) {
      document.getElementById(
        'error-msg'
      ).innerText = `😊 You did it! The answer was ${answer} — took ${attempts} attempts, but you stayed with it.`;
    }
  }
};

inputGuess.addEventListener('input', function () {
  const userGuess = Number(inputGuess.value);

  if (isNaN(userGuess)) {
    noteMsg.innerText = 'Please enter a valid number';
    btnGuess.disabled = true;
    btnGuess.classList.add('btn-disabled');
  } else if (userGuess < minNum || userGuess > maxNum) {
    noteMsg.innerText = 'Please enter a number between 1 and 100';
    btnGuess.disabled = true;
    btnGuess.classList.add('btn-disabled');
  } else {
    noteMsg.innerText = '';
    btnGuess.disabled = false;
    btnGuess.classList.remove('btn-disabled');
  }
});

function restartButton(){
  const restartButton = document.getElementById('restartbtn').innerHTML = restart to play again:
restartButton.onclick = refreshPage();

  
}


function winningSound() {
  const winningSound = document.getElementById('winning-sound');

  winningSound.play();
}
