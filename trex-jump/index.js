var dinoPostion = 0
var jumpHeight = 110
var topreached =false
var timer
var isGameOver=false

const grid = document.querySelector(".grid")
const dino = document.createElement("div")
drawDino()
dino.classList.add("dino")
grid.appendChild(dino)

function drawDino()
{
    dino.style.bottom=dinoPostion + "px"
}

function jumpDino()
{
    if (topreached == false)
    {
        dinoPostion+=10
        drawDino()
        if (dinoPostion == jumpHeight) topreached=true
    }
    if (topreached == true)
    {
        dinoPostion-=10
        drawDino()
        if (dinoPostion == 0) 
        {
            topreached=false
            clearInterval(timer)
        }
    }
  
}

function jumpkey(e)
{switch(e.key)
    {case "ArrowUp" :
            {
                if (dinoPostion === 0)
                {
                    timer = setInterval(jumpDino,25) 
                }
            }
    }
}
addEventListener("keydown",jumpkey)

function generateObstacle()
{   
    let ObstaclePostion = 700-20
    const obstacle = document.createElement("div")
    drawObstacle()
    obstacle.classList.add("obstacle")
    grid.appendChild(obstacle)
    function drawObstacle()
    {
        obstacle.style.left=ObstaclePostion+"px"
    }     
    let obstacleTimer= setInterval(moveObstacle,30)
    function moveObstacle()
    {
        ObstaclePostion-=10
        drawObstacle()
        if (ObstaclePostion==0) 
        {
            clearInterval(obstacleTimer)
            grid.removeChild(obstacle)
        }
        if ( dinoPostion<50 && ObstaclePostion==100)
        {
            alert("Game Over !")
            clearTimeout(t)
            isGameOver=true
            var divsToRemove = document.getElementsByClassName("obstacle");
            for (var i = 0; i < divsToRemove.length; i++) {
            divsToRemove[i].remove();
                }
        }
    }
    if (isGameOver ==false ) 
    {
        var t=setTimeout(generateObstacle,Math.random()*4000)
    }
}
generateObstacle()