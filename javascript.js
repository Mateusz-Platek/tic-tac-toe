let cells = document.querySelectorAll('.cell');

let turn = 'X';
let board = [false, false, false, false, false, false, false, false, false];

let changeValue = function() {
    if(turn == 'X') {
        turn = 'O';
    } else {
        turn = 'X';
    }
}

let eventHandler = function(box, val) {
    box.textContent = val;
    let i = box.getAttribute('data');
    board[i] = val;
    changeValue(val);
}

cells.forEach(cell => {
    cell.addEventListener('click', () => eventHandler(cell, turn), {once: true});
});