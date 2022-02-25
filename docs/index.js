//runs the code when the website is loaded
window.onload = init
//the board
const board = [
    [0,0,0,2,6,0,7,0,1],
    [6,8,0,0,7,0,0,9,0],
    [1,9,0,0,0,4,5,0,0],
    [8,2,0,1,0,0,0,4,0],
    [0,0,4,6,0,2,9,0,0],
    [0,5,0,0,0,3,0,2,8],
    [0,0,9,3,0,0,0,7,4],
    [0,4,0,0,5,0,0,3,6],
    [7,0,3,0,1,8,0,0,0]
]

//the board solved
const solved = [
    [4,3,5,2,6,9,7,8,1],
    [6,8,2,5,7,1,4,9,3],
    [1,9,7,8,3,4,5,6,2],
    [8,2,6,1,9,5,3,4,7],
    [3,7,4,6,8,2,9,1,5],
    [9,5,1,7,4,3,6,2,8],
    [5,1,9,3,2,6,8,7,4],
    [2,4,8,9,5,7,1,3,6],
    [7,6,3,4,1,8,2,5,9]
]

//runs the following code when the website is loaded
function init(){
    //prints the numbers to the board so that the board can be easily changed
    printBoard(board)
    //gets all of the cells
    const cells = document.getElementsByClassName('cell')
    //loops through each cell to allow them to be highlighted
    for (let i=0; i < cells.length; i++){
        //adds an onclick function for each cell
        cells[i].addEventListener('click', function() {
            //gets the element with active in its class name (the currently highlighted cell)
            let currentCell = document.getElementsByClassName("active")
            //replaces the current highlighted cell's class name with the normal class name 'cell'
            currentCell[0].className = currentCell[0].className.replace(" active", "")
            //takes the current cell and adds the active class to it
            this.className += " active"
        })
    }

}

//prints each cell number to the respective cell
function printBoard(board) {
    //gets the table
    const grid = document.getElementById('grid')
    //gets each cell
    const gridCells = grid.getElementsByClassName('cell')
    //loops through each list in the board variable
    for (let i=0; i < board.length; i++){
        //loops through each element in the respective list
        for(let k=0; k < board[i].length; k++){
            //if the element is greater than zero (not an empty blank) it adds the value to the innerHTML
            if (board[i][k] > 0){
                //adds the value to the innerHTML
                gridCells[i*9 + k].innerHTML = board[i][k]
            }
            //if the element is blank then it puts nothing in the innerHTML
            else {
                //adds nothing to the innerHTML
                gridCells[i*9 + k].innerHTML = ''
            }
        }
    }
}

function checkFull() {
    //gets the table in which the cells are located
    const grid = document.getElementById('grid')
    //gets each cell
    const cells = grid.getElementsByClassName('cell')
    //contains a list of numbers that will be used later to determine whether a cell is empty
    const numbers = [1,2,3,4,5,6,7,8,9]
    //count used to determine how many cells have numbers in them
    let count = 0
    //loops through each cell
    for (i=0; i<cells.length; i++) {
        //checks if the innerHTML of each cell is in the numbers list *note: it also checks if the innerHTML contains 9 because for some reason the if statement ignored all 9s
        if (cells[i].innerHTML in numbers || cells[i].innerHTML == 9) {
            //adds one to the count
            count += 1
        }
    }
    //checks to see if the count is 81 (a full board)
    if (count === 81){
        //returns true
        return true
    }
    //if the count is anything else then the code returns false
    else {
        //returns false
        return false
    }
}

//adds the num to the innerHTML and checks wheter it is correct or incorrect
function addNum(num) {
    //gets the highlighted cell (the selected cell)
    const highlighted = document.getElementsByClassName('cell active')
    //gets all of the cells
    const cells = document.getElementsByClassName('cell')
    //sets the count at zero
    let count = 0
    //sets the selected element's innerHTML to 1
    highlighted[0].innerHTML = num
    //loops through each cell
    for (i=0; i<cells.length; i++){
        //checks if the cell is selected
        if (cells[i].className == 'cell active') {
            //sets the position equal to the count
            const pos = count
            //sets the row to the count the count divided by 9 and rounded down
            const row = Math.floor(count/9)
            //sets the column to the count being modulo divided by 9
            const col = count % 9
            //if the value of the solved board at the row and column equals the value in the cell then it adds a solved id to the element
            if (solved[row][col] == cells[count].innerHTML){
                //adds the solved id to the element which colors the number green
                cells[i].id ='solved'
            }
            //if the value is not equal to the solved board's value then it adds the incorrect id to the element
            else {
                //adds the incorrect id to the element which colors the number red
                cells[i].id = 'incorrect'
            }
            //breaks through the loop since the active number has been found and all of the code needed has been executed
            break
        }
        //adds one to the count
        count += 1
    }

}

//resets the board
function restart() {
    //gets all elements with class name cell
    const cells = document.getElementsByClassName('cell')
    //loops through each cell before the board is reset to make sure no values are left green or red
    for (i=0; i<cells.length; i++){
        //if the id equals solved or incorrect then it changes the id to nothing
        if (cells[i].id === 'solved' || cells[i].id === 'incorrect'){
            //changes the id to nothing
            cells[i].id = ''
        }
    }
    //just prints the starting board
    printBoard(board)
}

//erases the value that is selected
function erase() {
    //gets the selected element
    const highlighted = document.getElementsByClassName('cell active')
    //makes the selected element's innerHTML nothing
    highlighted[0].innerHTML = ''
}

//submits the board and checks it
function submit() {
    //checks if the board is full and then executes
    if (checkFull()) {
        //sets the count equal to zero
        let count = 0
        //gets all of the cells
        const cells = document.getElementsByClassName('cell')
        //loops through the board's rows
        for (let i=0; i<solved.length; i++) {
            //loops through the board's rows' values
            for (let j=0; j<solved[i].length; j++) {
                //if the solved board's value is equal to the cell at the position count's value then it executes
                if (solved[i][j] == cells[count].innerHTML) {
                    //sets the id of the cell to solved which colors it green
                    cells[count].id = 'solved'
                    //adds one to count
                    count += 1
                    //continues the code
                    continue
                }
                //if the cell contains an incorrect value then the code executes
                else {
                    //sets the cell's id to incorrect
                    cells[count].id = 'incorrect'
                    //returns false and terminates the function
                    return false
                }
            }
        }
        //returns true if the entire board is solved
        return true
    }
    //if the board is not entirely solved then it terminates the code and returns false
    else {
        //retunrs false
        return false
    }
}
