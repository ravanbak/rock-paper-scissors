const TIE = 0;
const PLAYER = 1;
const COMPUTER = 2;
const messages = ['Tie!', 'You win!', 'You lose!'];
const plays = ['Rock','Paper','Scissors'];
const count = [0, 0, 0];

let round;

let lastTime = null;
let angle = 0;

const player = { 
    type : PLAYER,
    score : 0,
    selection : undefined
}
const computer = { 
    type : COMPUTER,
    score : 0,
    selection : undefined
}

function gameOver() {
    
    return (player.score >= 5 || computer.score >= 5);

}

function keyPressed(event) {

    if (gameOver()) {
        
        if (event.key == 'Enter') newGame();

    } else {

        switch (event.key) {
            case 'r':
            case 'R':
                playRound(plays[0], computerSelection());
                break;
            case 'p':
            case 'P':
                playRound(plays[1], computerSelection());
                break;
            case 's':
            case 'S':
                playRound(plays[2], computerSelection());
                break;
        }

    }

}

function addKeyboardEventListeners() {

    window.addEventListener("keydown", keyPressed);    

}

function computerSelection() {
    let i = Math.floor(Math.random() * plays.length);
    return plays[i];
}

addKeyboardEventListeners();
newGame();
requestAnimationFrame(animateButton);

function newGame() {

    round = 0;

    player.score = 0;
    player.selection = '';
    computer.score = 0;
    computer.selection = '';

    const b = document.querySelector('#play-again');
    if (b) b.parentNode.removeChild(b);

    makeButtons();
    
    let p = document.querySelector('#winner');
    p = document.querySelector('#description');
    p.textContent = '';
    p = document.querySelector('#game-over');
    p.textContent = '';
    p = document.querySelector('#game-result');
    p.textContent = '';

    outputResults(player, computer, 'Click Play to start the game!'); // clear any previous round results

}

function endGame() {

    const buttons = document.querySelector('.buttons');
    if (buttons) {
        while (buttons.firstChild) {
            buttons.removeChild(buttons.firstChild);
        }
    }

    let btn = document.createElement('button');
    btn.textContent = 'Play';
    btn.classList.add('button');
    btn.id = 'play-again';
    btn.addEventListener('click', newGame);
    buttons.appendChild(btn);

}

function makeButtons() {

    const buttons = document.querySelector('.buttons');

    let btn;
    for (let i = 0; i < plays.length; i++) {
        btn = document.createElement('button');
        btn.textContent = plays[i].toUpperCase();
        btn.classList.add('button');
        btn.addEventListener('click', () => playRound(plays[i], computerSelection()));
        buttons.appendChild(btn);
    }

}

function getRoundWinner(player, computer) {

    p = player.selection.slice(0,1).toUpperCase();
    c = computer.selection.slice(0,1).toUpperCase();

    let winner = TIE;

    if (p !== c) {
        switch (p) {
            case 'R':
                winner = c === 'P' ? COMPUTER : PLAYER;
                break;
            case 'P':
                winner = c === 'S' ? COMPUTER : PLAYER;
                break;
            case 'S':
                winner = c === 'R' ? COMPUTER : PLAYER;
                break;
        }
    }

    return winner;

}

function getRoundMessage(winner, loser) {
    if (winner.selection == loser.selection) {
        return '';
    }
    else {
        return `${winner.selection} beats ${loser.selection}`;
    }
}

function playRound(playerSelection, computerSelection) {

    round++;

    player.selection = playerSelection;
    computer.selection = computerSelection;

    let winner = getRoundWinner(player, computer);

    let description = '';

    if (winner === PLAYER) {
        player.score++;
        description = getRoundMessage(player, computer);
    }
    else if (winner === COMPUTER) {
        computer.score++;
        description = getRoundMessage(computer, player);
    }

    outputResults(player, computer, messages[winner],  description);

    checkScores();
}

function outputResults(player, computer, winnerMsg, description) {

    let p = document.querySelector('#round');
    p.textContent = (round === 0) ? '-' : round.toString();

    p = document.querySelector('#player-selection');
    p.textContent = (player.selection) ? player.selection.toUpperCase() : '---';
    p = document.querySelector('#player-score');
    p.textContent = (player.score) ? player.score : '0';

    p = document.querySelector('#computer-selection');
    p.textContent = (computer.selection) ? computer.selection.toUpperCase() : '---';
    p = document.querySelector('#computer-score');
    p.textContent = (computer.score) ? computer.score : '0';
    
    p = document.querySelector('#winner');
    p.textContent = winnerMsg;
    p = document.querySelector('#description');
    p.textContent = description;

}

function checkScores() {

    if (player.score < 5 && computer.score < 5) return;

    p = document.querySelector('#game-over');
    p.textContent = 'GAME OVER!';

    p = document.querySelector('#game-result');
    if (player.score >= 5) {
        p.textContent = `YOU WIN ${player.score} TO ${computer.score}`;
    } else {
        p.textContent = `COMPUTER WINS ${computer.score} TO ${player.score}`;
    }

    endGame();
}

function animateButton(time) {

    if (lastTime != null) {
        angle = (angle + (time - lastTime) * 0.001) % (Math.PI * 2);
    }
    lastTime = time;

    const r = 250; // ((Math.sin(angle) + 1) * 127).toFixed(0);
    const g = 190; //((Math.sin(angle + 1) + 1) * 127).toFixed(0);
    const b = (100 + Math.sin(angle) * 50).toFixed(0); // ((Math.sin(angle + 2) + 1) * 127).toFixed(0);
    const buttons = document.querySelectorAll('button');
    const c = `rgb(${r},${g},${b})`;
    buttons.forEach(b => b.style.background = c);

    requestAnimationFrame(animateButton);

}