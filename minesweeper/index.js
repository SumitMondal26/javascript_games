const grid = document.querySelector(".grid")
let squares=[]
let no_mines=20
let row=10
let first_click_done=false

for (let i=0;i<row*row;i++)
{
    const square = document.createElement("div")
    square.classList.add("square")
    if(i%row==0 || i<row-1 ||i>(row*row)-row || i%row==row-1)
    {
        square.classList.add("edge") 
    }
    else{
    square.classList.add("cover")
    square.onclick = 
    function clicked()
    {
        if (!first_click_done)
        {
            clear_squares(i)
            first_click_done=true
            clear_squares(i-(row-1))
        }
        
        square.classList.remove("cover")
        square.onclick=null
        if(!square.classList.contains("mine"))
        {
            square.innerHTML=calculate_mine(i)
        }
        else
        {
            alert("Gameover!")
        }
    }
    }
    
    grid.appendChild(square)
    squares.push(square)
}
function calculate_mine(square_clicked)
{
    let num=0
    try{
        if(squares[square_clicked+1].classList.contains("mine"))
        {
            num+=1
        }
        if(squares[square_clicked-1].classList.contains("mine"))
        {
            num+=1
        }
        if(squares[square_clicked-row].classList.contains("mine"))
        {
            num+=1
        }
        if(squares[square_clicked+row].classList.contains("mine"))
        {
            num+=1
        }
        if(squares[square_clicked-(row-1)].classList.contains("mine")) 
        {
            num+=1
        }
        if(squares[square_clicked-(row+1)].classList.contains("mine"))
        {
            num+=1
        }
        if(squares[square_clicked+(row-1)].classList.contains("mine")) 
        {
            num+=1
        }
        if(squares[square_clicked+(row+1)].classList.contains("mine"))
        {
            num+=1
        }
    }
    catch(rr)
    {
    
    }

    return num

}

function clear_squares(square_clicked)
{

    try {
        let arr=[square_clicked,square_clicked-1,square_clicked+1,square_clicked+row,square_clicked-row]
        for(let i=0;i<arr.length;i++)
        {
            squares[arr[i]].classList.remove("cover")
            squares[arr[i]].onclick=null
            if(!squares[arr[i]].classList.contains("mine"))
                {
                    if(!squares[mine_no].classList.contains("edge"))
                        squares[arr[i]].innerHTML=calculate_mine(i)
                }
        }
        
    } catch (error) {
        
    }
    
}
for (let i=1;i<=no_mines;i++)
{
    let mine_no = Math.floor(Math.random()*(row*row))
    if(!squares[mine_no].classList.contains("edge"))
    {
        squares[mine_no].innerHTML=""
        squares[mine_no].classList.add("mine")
        

    }

}


function checkGame() {
    

for (let i=0;i<squares.length;i++)
{
    if(!squares[i].classList.contains("cover"))
    {
        alert("Gameover!")
    }
}}