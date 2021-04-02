const grid=document.querySelector(".grid")
let enemytimer 
let shooterCurrentPosition= 217
let direction=1
let going_right=true
for(let i=0;i<225;i++)
{
    const squares=document.createElement("div")
    squares.classList.add("spaces")
    grid.appendChild(squares)
}

const enemy_posotion=[
    0,1,2,3,4,5,6,7,8,9,
    15,16,17,18,19,20,21,22,23,24,
    30,31,32,33,34,35,36,37,38,39
]
const a=Array.from(document.querySelectorAll(".grid div"))

function drawEnemy()
{
    for (let i =0;i<enemy_posotion.length;i++)
    {
     a[enemy_posotion[i]].classList.add("enemy")
    }
}
drawEnemy()
function remove() {
    for (let i = 0; i < enemy_posotion.length; i++) {
        a[enemy_posotion[i]].classList.remove("enemy")
    }
  }
function moveEnemy()
{
    
    remove()
    if (enemy_posotion.length==0)
    {
        alert("game Over You Win!")
        clearInterval(enemytimer)
    }
    if (enemy_posotion[(enemy_posotion.length)-1] == 210) 
    {
        alert("game Over !")
        clearInterval(enemytimer)
    }
    else 
    {
        let right =enemy_posotion[enemy_posotion.length-1] % 15 === 14
        let left=enemy_posotion[0]%15==0

        if(right && going_right)
        {
            for (let i =0 ;i<enemy_posotion.length;i++)
            {
    
                enemy_posotion[i]+=16
                direction=-1
                going_right=false
            }
            
        }
        if(left && !going_right)
        {
            for (let i =0 ;i<enemy_posotion.length;i++)
            {
            
                enemy_posotion[i]+=14
                direction=1
                going_right=true
            }
            
        }

        for (let i =0 ;i<enemy_posotion.length;i++)
        {
            a[enemy_posotion[i]].classList.remove("enemy")
            enemy_posotion[i]+=direction
        }
        drawEnemy()
    }   
}

enemytimer=setInterval(moveEnemy,500)

function drawshooter()
{
    a[shooterCurrentPosition].classList.add("shooter")
}
drawshooter()

function shoot(e)
{
    let laserTimer
    let laserCurrentPosition=shooterCurrentPosition

    function movelaser()
    {   a[laserCurrentPosition].classList.remove('laser')
        laserCurrentPosition-=15
        a[laserCurrentPosition].classList.add('laser')

        if (a[laserCurrentPosition].classList.contains("enemy"))
        {
            index=enemy_posotion.indexOf(laserCurrentPosition)
            enemy_posotion.splice(index,1)
            a[laserCurrentPosition].classList.remove('laser')
            a[laserCurrentPosition].classList.remove('enemy')
            a[laserCurrentPosition].classList.add('boom')

            setTimeout(()=>a[laserCurrentPosition].classList.remove('boom'),500)
            
            clearInterval(laserTimer)
        }
    }
    switch(e.key)
        {
            case "ArrowUp":
            {
                laserTimer=setInterval(movelaser,30)    
                break
            }  
        }
}

function moveShooter(e)
{
  switch(e.key)
  {
      case "ArrowLeft":
          {
              if (shooterCurrentPosition>210)
              {
                a[shooterCurrentPosition].classList.remove("shooter")
                shooterCurrentPosition-=1
                drawshooter()
            
                break
              }
          }
      case "ArrowRight":
          {
            if (shooterCurrentPosition<224)
            {
                a[shooterCurrentPosition].classList.remove("shooter")
                shooterCurrentPosition+=1
                drawshooter()
                break
            }
          } 
  }
}

document.addEventListener("keydown",moveShooter)
document.addEventListener("keydown",shoot)