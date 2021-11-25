const plays = ['Rock','Paper','Scissors'];

function makeButtons() {

    const body = document.querySelector('.buttons');

    let btn;
    for (let i = 0; i < plays.length; i++) {
        btn = document.createElement('button');
        btn.textContent = plays[i];
        btn.classList.add('button');
        btn.addEventListener('click', () => playRound(plays[i], computerSelection()));
        body.appendChild(btn);
    }

}

makeButtons();

function computerSelection() {
    return plays[Math.round(Math.random() * 2)];
}

function playRound(playerSelection, computerSelection) {

    p = playerSelection.slice(0,1).toUpperCase();
    c = computerSelection.slice(0,1).toUpperCase();

    let output = '';

    if (p === c) {
        output = 'Tie!';
    }
    else {
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
            output = `You win! ${playerSelection} beats ${computerSelection}.`;
        }
        else {
            output = `You lose! ${computerSelection} beats ${playerSelection}.`;
        }
    }

    alert(output);

}