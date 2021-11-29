const TIE = 0;
const PLAYER = 1;
const COMPUTER = 2;
const messages = ['Tie!', 'You win!', 'You lose!'];
const plays = ['Rock','Paper','Scissors'];

let round;

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

const computerSelection = () => plays[Math.round(Math.random() * 2)];

startGame();

function startGame() {

    round = 0;

    player.score = 0;
    player.selection = '';
    computer.score = 0;
    computer.selection = '';

    makeButtons();
    
    let p = document.querySelector('#winner');
    p = document.querySelector('#description');
    p.textContent = '';
    p = document.querySelector('#game-over');
    p.textContent = '';
    p = document.querySelector('#game-result');
    p.textContent = '';

    outputResults(player, computer, 'Make your selection to start the game!'); // clear any previous round results

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

}

function outputResults(player, computer, winnerMsg, description) {

    let p = document.querySelector('#round');
    p.textContent = round.toString();

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

    if (player.score >= 5 || computer.score >= 5) {
        p = document.querySelector('#game-over');
        p.textContent = 'GAME OVER!';

        p = document.querySelector('#game-result');
        if (player.score >= 5) {
            p.textContent = `YOU WIN ${player.score} TO ${computer.score}`;
        } else {
            p.textContent = `COMPUTER WINS ${computer.score} TO ${player.score}`;
        }

        const buttons = document.querySelector('.buttons');
        while (buttons.firstChild) {
            buttons.removeChild(buttons.firstChild);
        }

        let btn = document.createElement('button');
        btn.textContent = 'Play Again';
        btn.classList.add('button');
        btn.addEventListener('click', () => {
            buttons.removeChild(btn);
            startGame();
        });
        buttons.appendChild(btn);
    }

}