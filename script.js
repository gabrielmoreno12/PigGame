'use strict';

// Selecting elements
const player0Element = document.querySelector('.player--0')
const player1Element = document.querySelector('.player--1')
const score0Element = document.getElementById('score--0');
const score1Element = document.getElementById('score--1');
const current0Element = document.getElementById('current--0');
const current1Element = document.getElementById('current--1');
const diceElement = document.querySelector('.dice');
const btnNewElement = document.querySelector('.btn--new');
const btnRollElement = document.querySelector('.btn--roll');
const btnHoldElement = document.querySelector('.btn--hold');

// Starting conditions
score0Element.textContent = 0;
score1Element.textContent = 0;
diceElement.classList.add('hidden');

let scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let dice = 0;   
let playing = true; 

const updateScore = function(dice) {
    currentScore += dice;
    document.getElementById(`current--${activePlayer}`)
        .textContent = currentScore;
}

const switchPlayer = function() {
    document.getElementById(`current--${activePlayer}`)
        .textContent = 0;
    document.getElementById(`score--${activePlayer}`)
        .textContent = scores[activePlayer];
    currentScore = 0;
    activePlayer = (activePlayer === 0) ? 1 : 0;
    player0Element.classList.toggle('player--active');
    player1Element.classList.toggle('player--active');
};

// Rolling dice functionality
btnRollElement.addEventListener('click', function() {
    if (playing) {
        // 1. Generating a random dice roll
        dice = Math.trunc(Math.random() * 6) + 1

        // 2. Display dice
        diceElement.classList.remove('hidden');
        diceElement.src = `./assets/img/dice-${dice}.png`;
        console.log(dice);

        // 3. Check for rolled 1: if true, switch to next player
        (dice !== 1) 
            ? updateScore(dice)
            : switchPlayer();
    }
});

btnHoldElement.addEventListener('click', function() {
    if (playing) {
        // 1. Add current score to active player's score
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`)
            .textContent = scores[activePlayer];
        currentScore = 0;

        // 2. Check if player's score is >= 100
        if (scores[activePlayer] >= 20) {
            // Finish the game 
            playing = false; 
            document
                .querySelector(`.player--${activePlayer}`)
                .classList.add('player--winner');
            document
                .querySelector(`.player--${activePlayer}`)
                .classList.remove('player--active');
        }
        else 
            switchPlayer(); 
    }
});

btnNewElement.addEventListener('click', function() {
    // Starting conditions
    playing = true; 
    document.querySelector(`.player--${activePlayer}`)
        .classList.remove('player--winner');
    player0Element.classList.add('player--active');
    player1Element.classList.remove('player--active');
    score0Element.textContent = 0;
    score1Element.textContent = 0;
    current0Element.textContent = 0;
    current1Element.textContent = 0;
    diceElement.classList.add('hidden');
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    dice = 0;   
});