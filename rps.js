const plays = ['Rock','Paper','Scissors'];

let computerPlay = () => plays[Math.round(Math.random() * 2)];

function playRound(playerPlay, computerPlay) {
    p = playerPlay.slice(0,1).toUpperCase();
    c = computerPlay.slice(0,1).toUpperCase();

    if (p === c) return 'Tie!';

    let winner;

    switch (p) {
        case 'R':
            winner = c === 'P' ? c : p;
            break;
        case 'P':
            winner = c === 'S' ? c : p;
            break;
        case 'S':
            winner = c === 'R' ? c : p;
            break;
    }

    if (winner === p) {
        return `You win! ${playerPlay} beats ${computerPlay}.`;
    }
    else {
        return `You lose! ${computerPlay} beats ${playerPlay}.`;
    }
}

function game() {
    for (let i = 1; i <= 5; i++) {

        let playerPlay = prompt("Please enter rock, paper, or scissors:");
        console.log(playRound(playerPlay, computerPlay()));

    }
}