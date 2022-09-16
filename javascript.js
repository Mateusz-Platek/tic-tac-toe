let gameboard = document.querySelector('.gameboard');
let resetButton = document.querySelector('button');

let game = function() {
    let board = ['X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X'];
    let print = function() {
        for(let i = 0; i < board.length; i++) {
            let box = document.createElement('div');
            box.classList.add('white');
            box.setAttribute('data', `${i}`);
            box.textContent = board[i];
            gameboard.appendChild(box);
        }
    }
    let reset = function() {
        board = ['', '', '', '', '', '', '', '', ''];
        gameboard.textContent = '';
        print();
    }

    return {
        print,
        reset
    };
}

let board = game();
board.print();

resetButton.addEventListener('click', () => {
    board.reset();
});