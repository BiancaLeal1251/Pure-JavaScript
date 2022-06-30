let width = 10;
let currentIndex = 0;
let appleIndex = 0;
let currentSnake = [2, 1, 0];
let direction = 1;
let score = 0;
let speed = 0.8;
let intervalTime = 0;
let interval = 0;

window.addEventListener("keypress", control(event));

document.addEventListener("DOMContentLoaded", function () {
    document.addEventListener("keyup", control);
    createBoard();
    startGame();
    document.querySelector(".playAgain").addEventListener("click", replay);
});

function createBoard() {
    document.querySelector(".popup-modal").style.display = "none";
    for (let i = 0; i < 100; i++) {
        let div = document.createElement("div");
        document.querySelector(".grid").appendChild(div);
    }
}

function startGame() {
    let squares = document.querySelectorAll(".grid div");
    randomApple(squares);
    //random apple
    direction = 1;
    document.querySelector(".score").innerHTML = score;
    intervalTime = 800;
    currentSnake = [2, 1, 0];
    currentIndex = 0;
    currentSnake.forEach((index) => squares[index].classList.add("snake"));
    interval = setInterval(moveOutcome, intervalTime);
}

function moveOutcome() {
    let squares = document.querySelectorAll(".grid div");
    if (checkForHits(squares)) {
        document.querySelector(".popup-modal").style.display = "flex";
        return clearInterval(interval);
    } else {
        moveSnake(squares);
    }
}

function moveSnake(squares) {
    let tail = currentSnake.pop();
    squares[tail].classList.remove("snake");
    currentSnake.unshift(currentSnake[0] + direction);
    // movement ends here  
    eatApple(squares, tail);
    squares[currentSnake[0]].classList.add("snake");
}

function checkForHits(squares) {
    if (
        (currentSnake[0] + width >= (width * width) && direction === width) ||
        (currentSnake[0] % width === width - 1 && direction === 1) ||
        (currentSnake[0] % width === 0 && direction === -1) ||
        (currentSnake[0] - width <= 0 && direction === -width) ||
        squares[currentSnake[0] + direction].classList.contains("snake")
    ) {
        return true;
    } else {
        return false;
    }
}

function eatApple(squares, tail) {
    if (squares[currentSnake[0]].classList.contains("apple")) {
        squares[currentSnake[0]].classList.remove("apple");
        squares[tail].classList.add("snake");
        currentSnake.push(tail);
        randomApple(squares);
        score++;
        document.querySelector(".score").textContent = score;
        clearInterval(interval);
        intervalTime = intervalTime * speed;
        interval = setInterval(moveOutcome, intervalTime);
    }
}

function randomApple(squares) {
    do {
        appleIndex = Math.floor(Math.random() * squares.length);
    } while (squares[appleIndex].classList.contains("snake"));
    squares[appleIndex].classList.add("apple");
}

function control(e) {
    if (e) {
        if (e.keyCode === 39) {
            direction = +1; // right 
        } else if (e.keyCode === 38) {
            direction = -width; //if we press the up arrow, the snake will go ten divs up
        } else if (e.keyCode === 37) {
            direction = -1; // left, the snake will go left one div
        } else if (e.keyCode === 40) {
            direction = +width; // down the snake head will instantly appear 10 divs below from the current div 
        }
    }
}

function clickTop() {
    direction = 0 - width;
}

function clickBottom() {
    direction = 0 + width;
}

function clickLeft() {
    direction = -1;
}

function clickRight() {
    direction = 1;
}

function replay() {
    document.querySelector(".grid").innerHTML = "";
    createBoard();
    startGame();
    document.querySelector(".popup-modal").style.display = "none";
}