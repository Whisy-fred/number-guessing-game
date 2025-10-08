// get player name from localStorage
const playerName = localStorage.getItem('playerName') || 'Player';
document.getElementById('wlc-name-header').textContent =
  'Hello, ' + playerName + ' 👋';

function refreshPage() {
  location.reload();
}

let errorMsg = document.getElementById('error-msg');
let inputGuess = document.getElementById('input-guess');
let btnGuess = document.getElementById('btn-guess');
let minNum = 1;
let maxNum = 100;
let attempts = 0;
let answer = Math.floor(Math.random() * 100 + 1);

btnGuess.onclick = function () {
  let guess = Number(inputGuess.value);

  let maxattempts = 10;
  if (attempts === maxattempts) {
    errorMsg.innerText = 'Oops out of guess, Refresh the game to try again';
    btnGuess.innerText = 'Refresh';
    btnGuess.onclick = refreshPage;
    inputGuess.disabled = true;
  } else {
    attempts++;
    if (guess < answer) {
      errorMsg.innerText = 'Too low! Try again';
    } else if (guess > answer) {
      errorMsg.innerText = 'Too high! Try again';
    }
  }
  if (guess === answer) {
    winningSound();
    inputGuess.disabled = true;
    btnGuess.innerText = 'Refresh';
    btnGuess.onclick = refreshPage;
    document.getElementById('note-msg').innerHTML =
      '<span id="note-msg-red">NOTE</span> : Refresh to play the game again.';

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
    errorMsg.innerText = 'Please enter a valid number';
    btnGuess.disabled = true;
    btnGuess.classList.add('btn-disabled');
  } else if (userGuess < minNum || userGuess > maxNum) {
    errorMsg.innerText = 'Please enter a number between 1 and 100';
    btnGuess.disabled = true;
    btnGuess.classList.add('btn-disabled');
  } else {
    errorMsg.innerText = '';
    btnGuess.disabled = false;
    btnGuess.classList.remove('btn-disabled');
  }
});

function winningSound() {
  const winningSound = document.getElementById('winning-sound');

  winningSound.play();
}
