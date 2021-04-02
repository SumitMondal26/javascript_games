const grid = document.querySelector(".grid")
const width = 30
let snakePosition = 225
let direction = 1
let snakeTimer
let speed = 120
let snake = [snakePosition]
let snakeLength = 3
let points = 0
let apple_pos
let appleTimer
let score = document.querySelector(".score")
score.classList.add("score")

for (let i = 0; i < width * width; i++) {
    const square = document.createElement("div")
    if (i % width == 0 || (i % width) == width - 1 || i < width || i > (width * width) - width) square.classList.add("border")
    else square.classList.add("squares")
    grid.appendChild(square)
}

const squares = Array.from(document.querySelectorAll(".grid div"))

function apple() {
    if (score % 5 == 0) speed = speed - 5
    apple_pos = parseInt(Math.random() * squares.length)
    console.log(apple_pos)
    if (squares[apple_pos].classList.contains("border")) {
        console.log("on edge")
        squares[apple_pos].classList.remove("apple")
        apple_pos = 250
        squares[250].classList.add("apple")
    }
    else {
        console.log("not on edge")
        squares[apple_pos].classList.add("apple")
    }
}
apple()
function drawSnake() {
    for (let i = 1; i < snake.length; i++) {
        if (snake[0] === snake[i]) {
            alert("GameOver")
            clearInterval(snakeTimer)
        }
    }
    if (squares[snake[0]].classList.contains("border")) {
        alert("GameOver")
        clearInterval(snakeTimer)
    }
    if (squares[snake[0]].classList.contains("apple")) {
        console.log("apple eaten")
        points += 1
        score.innerHTML = "Score : " + points
        snakeLength += 1
        squares[apple_pos].classList.remove("apple")
        apple()
    }
    if (snake.length > snakeLength) {
        end = snake.pop()
        squares[end].classList.remove("snake-tail")
    }
    snakePosition += direction
    snake.unshift(snakePosition)

    for (let i = 1; i < snake.length - 2; i++) {
        squares[snake[0]].classList.add("snake-head")
        squares[snake[i]].classList.remove("snake-head")
        squares[snake[i]].classList.add("snake-body")
        squares[snake[snake.length - 1]].classList.remove("snake-body")
        squares[snake[snake.length - 1]].classList.add("snake-tail")
    }
}
function moveSnake(e) {
    clearInterval(snakeTimer)
    snakeTimer = setInterval(drawSnake, speed);
    switch (e.key) {
        case "ArrowDown":
            {
                if (direction != -width) {
                    direction = width

                    drawSnake()
                }
                break;
            }
        case "ArrowLeft":
            {
                if (direction != 1) {
                    direction = -1
                    drawSnake()
                }
                break;
            }
        case "ArrowUp":
            {
                if (direction != width) {
                    direction = -width
                    drawSnake()

                }
                break;
            }
        case "ArrowRight":
            {
                if (direction != -1) {
                    direction = 1
                    drawSnake()
                }
                break;
            }
        case "q":
            {
                clearInterval(snakeTimer)
                window.location.reload()
                break;
            }
    }
}

document.addEventListener("keydown", moveSnake)