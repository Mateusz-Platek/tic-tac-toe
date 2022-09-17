let cells = document.querySelectorAll('.cell');
let background = document.querySelector('.winner');
let message = document.querySelector('.winner > div');
let resetButton = document.querySelector('button');
let player = document.querySelector('.player');

let turn = 'X';
let board = [false, false, false, false, false, false, false, false, false];
let winner = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let reset = function() {
    turn = 'X';
    cells.forEach(cell => {
        cell.textContent = '';
        cell.addEventListener('click', () => eventHandler(cell, turn), {once: true});
    });
    background.classList.remove('show');
    board = [false, false, false, false, false, false, false, false, false];
}

let changeValue = function() {
    if(turn == 'X') {
        turn = 'O';
    } else {
        turn = 'X';
    }
}

let checkDraw = function(){
    let draw = true;
    for(let i = 0; i < board.length; i++) {
        if(board[i] == false) {
            draw = false;
        }
    }
    if(draw == true) {
        background.classList.add('show');
        message.textContent = 'Draw!'
    }
}

let checkWin = function(val) {
    return winner.some(combination => {
        return combination.every(index => {
            return board[index] == val;
        });
    });
}

let placeMark = function(box, val) {
    box.textContent = val;
    let i = box.getAttribute('data');
    board[i] = val;
    if(checkWin(turn)) {
        background.classList.add('show');
        message.textContent = val + ' wins'
    }
    changeValue(val);
}

let eventHandler = function(cell, turn) {
    placeMark(cell, turn);
    checkDraw();
}

cells.forEach(cell => {
    cell.addEventListener('click', () => eventHandler(cell, turn), {once: true});
});

resetButton.addEventListener('click', () => {
    reset();
});