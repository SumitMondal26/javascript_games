const gridWidth = 505
const gridHeight = 400
const blockheight = 20
const blockwidth = 85
const userStart = [200, 0]
const userCurrentPosition = [userStart[0], userStart[1]]
const ballStart = [250, blockheight]
const ballCurrentPosition = [ballStart[0], ballStart[1]]
const balldiameter = 20
let ballspeed = 3
let xDirection = -ballspeed
let yDirection = ballspeed
let score = 0

class Block {
    constructor(xAxis, yAxis) {
        this.bottomLeft = [xAxis, yAxis]
        this.bottomRight = [xAxis + blockwidth, yAxis]
        this.topLeft = [xAxis, yAxis + blockheight]
        this.topRight = [xAxis + blockwidth, yAxis + blockheight]
    }
}
const blocks = []

for (let k = 370; k > 300; k = k - (blockheight + 10)) {
    for (let j = 10; j < 501; j = j + 100) {
        blocks.push(new Block(j, k))
    }
}

function addBlock() {
    for (let i = 0; i < blocks.length; i++) {
        const grid = document.querySelector(".grid")
        const block = document.createElement("div")
        block.classList.add('block')
        block.style.left = blocks[i].bottomLeft[0] + 'px'
        block.style.bottom = blocks[i].bottomLeft[1] + 'px'
        grid.appendChild(block)
    }

}
addBlock()

function drawUser() {
    user.style.left = userCurrentPosition[0] + 'px'
    user.style.bottom = userCurrentPosition[1] + 'px'
}

const grid = document.querySelector(".grid")
const user = document.createElement("div")
user.classList.add('user')
drawUser()
grid.appendChild(user)

function moveUser(e) {
    switch (e.key) {
        case "ArrowLeft":
            {
                if (userCurrentPosition[0] > 0) {
                    userCurrentPosition[0] -= 10
                    drawUser()
                }
                break
            }
        case "ArrowRight":
            {
                if (userCurrentPosition[0] < gridWidth - blockwidth) {
                    userCurrentPosition[0] += 10
                    drawUser()
                }
                break
            }   
    }
}
addEventListener('keydown', moveUser)

function drawball() {
    ball.style.left = ballCurrentPosition[0] + 'px'
    ball.style.bottom = ballCurrentPosition[1] + 'px'
}
const ball = document.createElement("div")
ball.classList.add('ball')
drawball()
grid.appendChild(ball)

function moveBall() {

    ballCurrentPosition[0] += xDirection
    ballCurrentPosition[1] += yDirection
    drawball()
    checkCollision()
}

let timer = setInterval(moveBall, 30)

function checkCollision() {
    if (ballCurrentPosition[0] >= (gridWidth - balldiameter) ||
        ballCurrentPosition[1] >= (gridHeight - balldiameter) ||
        ballCurrentPosition[0] < 0) {
        changedirection()
    }
    if (ballCurrentPosition[0] > userCurrentPosition[0] && ballCurrentPosition[0] < userCurrentPosition[0] + blockwidth
        && ballCurrentPosition[1] > userCurrentPosition[1] && ballCurrentPosition[1] < userCurrentPosition[1] + blockheight) {
        changedirection()
    }
    for (let i = 0; i < blocks.length; i++) {
        if (ballCurrentPosition[0] > blocks[i].bottomLeft[0] &&
            ballCurrentPosition[0] < blocks[i].bottomRight[0] &&
            ballCurrentPosition[1] + balldiameter > blocks[i].bottomLeft[1] &&
            ballCurrentPosition[1] < blocks[i].topLeft[1]) {
            const allblocks = Array.from(document.querySelectorAll('.block'))
            allblocks[i].classList.remove('block')
            blocks.splice(i, 1)
            changedirection()
            score += 1
            document.getElementById("score").innerHTML = "Score : " + score
        }
    }

    if (ballCurrentPosition[1] < 0) {
        clearInterval(timer)
        document.getElementById("score").innerHTML = "game Over!"
    }
    if (blocks.length == 0) {
        clearInterval(timer)
        document.getElementById("score").innerHTML = "game Over!"
    }
}

function changedirection() {
    if (xDirection === ballspeed && yDirection === ballspeed) {
        yDirection = -ballspeed
        return
    }
    if (xDirection === ballspeed && yDirection === -ballspeed) {
        xDirection = -ballspeed
        return
    }
    if (xDirection === -ballspeed && yDirection === -ballspeed) {
        yDirection = ballspeed
        return
    }
    if (xDirection === -ballspeed && yDirection === ballspeed) {
        xDirection = ballspeed
        return
    }
}
