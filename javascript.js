let cells = document.querySelectorAll('.cell');
let btnReset = document.querySelector('.reset');
let btnRestart = document.querySelector('.restart');
let listener = [];
let turn = 'X';

let gameFlow = (() => {
    let background = document.querySelector('.winner');
    let message = document.querySelector('.winner > div');
    let player = document.querySelector('.player');
    let oVal = document.querySelector('.o-val');
    let xVal = document.querySelector('.x-val');

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
    let x = 0;
    let o = 0;

    let checkWin = function(val) {
        return winner.some(combination => {
            return combination.every(index => {
                return board[index] == val;
            });
        });
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
    let changeValue = function() {
        if(turn == 'X') {
            turn = 'O';
        } else {
            turn = 'X';
        }
        player.textContent = turn + ' turn';
    }
    let eventHandler = function(cell, turn) {
        if(placeMark(cell, turn)) {
            return
        }
        checkDraw();
    }
    let placeMark = function(box, val) {
        box.textContent = val;
        let i = box.getAttribute('data');
        board[i] = val;
        if(checkWin(turn)) {
            background.classList.add('show');
            message.textContent = val + ' wins';
            if(turn == 'X') {
                x++;
                xVal.textContent = x;
            } else {
                o++;
                oVal.textContent = o;
            }
            return true;
        }
        changeValue();
    }
    let reset = function() {
        changeValue();
        player.textContent = turn + ' turn';
        cells.forEach(cell => {
            cell.removeEventListener('click', listener[cell.getAttribute('data')]);
            cell.textContent = '';
            cell.addEventListener('click', listener[cell.getAttribute('data')], {once: true})
        });
        background.classList.remove('show');
        board = [false, false, false, false, false, false, false, false, false];
    }
    let restart = function() {
        reset();
        x = 0;
        xVal.textContent = x;
        o = 0;
        oVal.textContent = o;
    }
    return {
        eventHandler,
        reset,
        restart
    }
})();

cells.forEach(cell => {
    listener[cell.getAttribute('data')] = () => {
        gameFlow.eventHandler(cell, turn);
    };
    cell.addEventListener('click', listener[cell.getAttribute('data')], {once: true});
});
btnReset.addEventListener('click', gameFlow.reset);
btnRestart.addEventListener('click', gameFlow.restart);