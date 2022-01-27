document.addEventListener('DOMContentLoaded', () => {

    const playAreaHeight = 9;
    const playAreaWidth = 9;
    const tiles = []; //array to hold created tile/div elements
    let score = 0;

    const tileColors = [ //colours generated at coolors.co
        '#7B7554',
        '#17183B',
        '#A11692',
        '#FF4F79',
        '#FFB49A',
        '#D36060'
    ]

    /**
     * Creates a 9x9 set of divs (game tiles), assigns each a random colour, 
     * a uniqie ID and appends as a child to the main game area div
     */
    function createBoard() {
        for (let i = 0; i < playAreaHeight * playAreaWidth; i++) { //Looping through our 9x9 game board
            const tile = document.createElement(`div`); //Creating a game board tile, already sized in CSS - should make things easily scalable
            tile.classList.add('tile');
            tile.setAttribute('draggable', true); //Will allow mouse controls - Researched at https://developer.mozilla.org/en-US/docs/Web/API/Element/setAttribute
            let randomColor = Math.floor(Math.random() * tileColors.length); //Random number (0-1) * 5, Mathfloor rounds down to integer. Used to assign colours to tiles
            tile.setAttribute('id', i); //Give each tile an ID - may by handy to refer to this later
            tile.style.backgroundColor = tileColors[randomColor]; //Assigns a random colour from the squareColors array to the newly created div
            $('.game-area').append(tile); //jQuery adding the 'tile' to the dom
            tiles.push(tile); //adding our newly created tile to the array
        };
    }

    createBoard();

    tiles.forEach(tile => tile.addEventListener('dragstart', dragStart));
    tiles.forEach(tile => tile.addEventListener('drop', onDrop));
    tiles.forEach(tile => tile.addEventListener('dragend', dragEnd));

    let draggedTileColor; //variable to store the colour value of picked up tile
    let replacedTileColor; //variable to store the colour value of the tile which is replaced
    let idOfDraggedTile; //variable to store the id number of a picked up tile
    let idOfReplacedTile; //variable to store the id number of tile which is replaced

    //The two below preventDefault functions allow the drop event to be triggered in chrome
    //Fix from https://stackoverflow.com/questions/21339924/drop-event-not-firing-in-chrome
    $('.tile').on('dragenter', function (event) {
        event.preventDefault();
    })
    $('.tile').on('dragover', function (event) {
        event.preventDefault();
    })

    /**
     * logs the colour and id of a picked up tile
     */
    function dragStart() {
        draggedTileColor = this.style.backgroundColor;
        idOfDraggedTile = parseInt(this.id);
        console.log(this.id, 'picked up');
    }

    /**
     * logs the colour and id of the tile to be replaced
     * switches the colours of the dragged and replaced tiles
     */
    function onDrop() {
        replacedTileColor = this.style.backgroundColor;
        idOfReplacedTile = parseInt(this.id);
        this.style.backgroundColor = draggedTileColor;
        tiles[idOfDraggedTile].style.backgroundColor = replacedTileColor;
        console.log(this.id, 'droped');
    }

    function dragEnd() {
        let adjacentTiles = [
            idOfDraggedTile - playAreaWidth, // up (using playAreaWidth variable allows functionality to change board size instead of using intergers)
            idOfDraggedTile + playAreaWidth, // down
            idOfDraggedTile - 1, //left
            idOfDraggedTile + 1 //right
        ]

        let legalMove = adjacentTiles.includes(idOfReplacedTile); //if the id number of a replaced tile is included in the adjacenttiles array, then legalMove is truthy

        if (idOfReplacedTile && legalMove) {
            idOfReplacedTile = null;
            console.log('legal move');
        } else if (idOfReplacedTile && !legalMove) {
            tiles[idOfReplacedTile].style.backgroundColor = replacedTileColor;
            tiles[idOfDraggedTile].style.backgroundColor = draggedTileColor;
            console.log('not a legal move');
        } else tiles[idOfDraggedTile].style.backgroundColor = draggedTileColor, console.log('not a legal move');

    }

    /**
     * loops through tiles on the game board, when an empty tile is found,
     * get the colour value of the above tile and replace the epmty tile with that colour
     */
    function repopulateEmptyTiles() {
        //Move tiles down
        for (i = 0; i < playAreaHeight * playAreaWidth - playAreaWidth; i++) {
            if (tiles[i + playAreaWidth].style.backgroundColor === '') {
                tiles[i + playAreaWidth].style.backgroundColor = tiles[i].style.backgroundColor;
                tiles[i].style.backgroundColor = '';  
            }

            const topRow = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
            const isTopRow = topRow.includes(i);

            //Repopulate empty tiles with random colours
            if (isTopRow && tiles[i].style.backgroundColor === '') {
                let randomColor = Math.floor(Math.random() * tileColors.length);
                tiles[i].style.backgroundColor = tileColors[randomColor];
            }
        }
    }

    function checkFiveHorizontal() {
        for (i = 0; i < playAreaHeight * playAreaWidth - 3; i++) { //this loop stops at the tile four left of bottom right
            let fiveHorizontal = [i, i+1, i+2 , i+3, i+4];
            let selectedColor = tiles[i].style.backgroundColor;
            const blankTile = tiles[i].style.backgroundColor === '';

            const lastFourRows = [
                playAreaWidth -4,
                playAreaWidth -3,
                playAreaWidth - 2,
                playAreaWidth -1,
                playAreaWidth * 2 -4,
                playAreaWidth * 2 -3,
                playAreaWidth * 2 -2,
                playAreaWidth * 2 -1,
                playAreaWidth * 3 -4,
                playAreaWidth * 3 -3,
                playAreaWidth * 3 -2,
                playAreaWidth * 3 -1,
                playAreaWidth * 4 -4,
                playAreaWidth * 4 -3,
                playAreaWidth * 4 -2,
                playAreaWidth * 4 -1,
                playAreaWidth * 2 -4,
                playAreaWidth * 5 -3,
                playAreaWidth * 5 -2,
                playAreaWidth * 5 -1,
                playAreaWidth * 6 -4,
                playAreaWidth * 6 -3,
                playAreaWidth * 6 -2,
                playAreaWidth * 6 -1,
                playAreaWidth * 7 -4,
                playAreaWidth * 7 -3,
                playAreaWidth * 7 -2,
                playAreaWidth * 7 -1,
                playAreaWidth * 8 -4,
                playAreaWidth * 8 -3,
                playAreaWidth * 8 -2,
                playAreaWidth * 8 -1,
                playAreaWidth * 9 -4,
                playAreaWidth * 9 -3,
                playAreaWidth * 9 -2,
                playAreaWidth * 9 -1,
                playAreaWidth * 10 -4,
                playAreaWidth * 10 -3,
                playAreaWidth * 10 -2,
                playAreaWidth * 10 -1,
                playAreaWidth * 11 -4,
                playAreaWidth * 11 -3,
                playAreaWidth * 11 -2,
                playAreaWidth * 11 -1,
                playAreaWidth * 12 -4,
                playAreaWidth * 12 -3,
                playAreaWidth * 12 -2,
                playAreaWidth * 12 -1,
            ]

            if (lastFourRows.includes(i)) continue;

            if (fiveHorizontal.every(index => tiles[index].style.backgroundColor === selectedColor && !blankTile)) {
                score += 5;
                printScore();
                fiveHorizontal.forEach(index => {
                    tiles[index].style.backgroundColor = '';
                })
            }
        }
    }

    function checkFiveVertical() {
        for (i = 0; i < playAreaHeight * playAreaWidth - playAreaWidth - playAreaWidth -playAreaWidth -playAreaWidth; i++) { //this loop ends four tiles north of bottom right
            let fiveVertical = [i, i+playAreaWidth, i+playAreaWidth*2, i+playAreaWidth*3, i+playAreaWidth*4];
            let selectedColor = tiles[i].style.backgroundColor;
            const blankTile = tiles[i].style.backgroundColor === '';
            if (fiveVertical.every(index => tiles[index].style.backgroundColor === selectedColor && !blankTile)) {
                score += 5;
                printScore();
                fiveVertical.forEach(index => {
                    tiles[index].style.backgroundColor = '';
                })
            }
        }
    }

    function checkFourHorizontal() {
        for (i = 0; i < playAreaHeight * playAreaWidth - 3; i++) { //this loop stops at the tile three left of bottom right
            let fourHorizontal = [i, i+1, i+2 , i+3];
            let selectedColor = tiles[i].style.backgroundColor;
            const blankTile = tiles[i].style.backgroundColor === '';

            const lastThreeRows = [
                playAreaWidth -3,
                playAreaWidth - 2,
                playAreaWidth -1,
                playAreaWidth * 2 -3,
                playAreaWidth * 2 -2,
                playAreaWidth * 2 -1,
                playAreaWidth * 3 -3,
                playAreaWidth * 3 -2,
                playAreaWidth * 3 -1,
                playAreaWidth * 4 -3,
                playAreaWidth * 4 -2,
                playAreaWidth * 4 -1,
                playAreaWidth * 5 -3,
                playAreaWidth * 5 -2,
                playAreaWidth * 5 -1,
                playAreaWidth * 6 -3,
                playAreaWidth * 6 -2,
                playAreaWidth * 6 -1,
                playAreaWidth * 7 -3,
                playAreaWidth * 7 -2,
                playAreaWidth * 7 -1,
                playAreaWidth * 8 -3,
                playAreaWidth * 8 -2,
                playAreaWidth * 8 -1,
                playAreaWidth * 9 -3,
                playAreaWidth * 9 -2,
                playAreaWidth * 9 -1,
                playAreaWidth * 10 -3,
                playAreaWidth * 10 -2,
                playAreaWidth * 10 -1,
                playAreaWidth * 11 -3,
                playAreaWidth * 11 -2,
                playAreaWidth * 11 -1,
                playAreaWidth * 12 -3,
                playAreaWidth * 12 -2,
                playAreaWidth * 12 -1,
            ]

            if (lastThreeRows.includes(i)) continue;

            if (fourHorizontal.every(index => tiles[index].style.backgroundColor === selectedColor && !blankTile)) {
                score += 4;
                printScore();
                fourHorizontal.forEach(index => {
                    tiles[index].style.backgroundColor = '';
                })
            }
        }
    }

    function checkFourVertical() {
        for (i = 0; i < playAreaHeight * playAreaWidth - playAreaWidth - playAreaWidth -playAreaWidth; i++) { //this loop ends at the tile three north of bottom-right
            let fourVertical = [i, i+playAreaWidth, i+playAreaWidth*2, i+playAreaWidth*3];
            let selectedColor = tiles[i].style.backgroundColor;
            const blankTile = tiles[i].style.backgroundColor === '';
            if (fourVertical.every(index => tiles[index].style.backgroundColor === selectedColor && !blankTile)) {
                score += 4;
                printScore();
                fourVertical.forEach(index => {
                    tiles[index].style.backgroundColor = '';
                })
            }
        }
    }

    function checkThreeHorizontal() {
        for (i = 0; i < playAreaHeight * playAreaWidth - 2; i++) { //this loop stops at the tile two left of bottom right
            let threeHorizontal = [i, i+1, i+2];
            let selectedColor = tiles[i].style.backgroundColor;
            const blankTile = tiles[i].style.backgroundColor === '';

            const lastTwoRows = [
                playAreaWidth - 2,
                playAreaWidth -1,
                playAreaWidth * 2 -2,
                playAreaWidth * 2 -1,
                playAreaWidth * 3 -2,
                playAreaWidth * 3 -1,
                playAreaWidth * 4 -2,
                playAreaWidth * 4 -1,
                playAreaWidth * 5 -2,
                playAreaWidth * 5 -1,
                playAreaWidth * 6 -2,
                playAreaWidth * 6 -1,
                playAreaWidth * 7 -2,
                playAreaWidth * 7 -1,
                playAreaWidth * 8 -2,
                playAreaWidth * 8 -1,
                playAreaWidth * 9 -2,
                playAreaWidth * 9 -1,
                playAreaWidth * 10 -2,
                playAreaWidth * 10 -1,
                playAreaWidth * 11 -2,
                playAreaWidth * 11 -1,
                playAreaWidth * 12 -2,
                playAreaWidth * 12 -1,
            ]

            if (lastTwoRows.includes(i)) continue;

            if (threeHorizontal.every(index => tiles[index].style.backgroundColor === selectedColor && !blankTile)) {
                score += 3;
                printScore();
                threeHorizontal.forEach(index => {
                    tiles[index].style.backgroundColor = '';
                })
            }
        }
    }

    function checkThreeVertical() {
        for (i = 0; i < playAreaHeight * playAreaWidth - playAreaWidth - playAreaWidth; i++) { //this loop ends at the tile two north of bottom-right
            let threeVertical = [i, i+playAreaWidth, i+playAreaWidth*2];
            let selectedColor = tiles[i].style.backgroundColor;
            const blankTile = tiles[i].style.backgroundColor === '';
            if (threeVertical.every(index => tiles[index].style.backgroundColor === selectedColor && !blankTile)) {
                score += 3;
                printScore();
                threeVertical.forEach(index => {
                    tiles[index].style.backgroundColor = '';
                })
            }
        }
    }

    function printScore() {
        $('.score').html(score);
    }

    window.setInterval(function() {
        repopulateEmptyTiles()
    }, 150)

    window.setInterval(function() {
        checkFiveHorizontal(),
        checkFiveVertical(),
        checkFourHorizontal(),
        checkFourVertical(),
        checkThreeHorizontal(),
        checkThreeVertical()
    }, 100)


    //Menu
    const element = document.getElementsByClassName("button");
    element[0].addEventListener("click", myFunction);

    function myFunction() {
        $( ".game-menu" ).slideUp('slow');
        score = 0;
        printScore();
    }

})


//TODO!

//bug resolved - in the repopoulate empty tiles function, errors were thrown when the loop was firing. Because + playareawidth on the bottom row did not exist. Fixed by ending the loop one row from bottom
//Bug found - colour change not working when switching tiles with first tile in the array (top left)
//bug resolved - sometimes not all tiles repopulate at the top row when making matches - resolved by moving the repopulate code out of the repopulateEmptyTiles first if statement and executing this function before the match detecting functions

//CURRENT DESIRED FEATURE LIST
//Allow movement only with valid moves
//non-sucessful moves should revert tiles back
//spawn game board with at least a handful of moveable tiles as to not game over immidiately
//spawn game board without any sucessful moves at the start
//animate feedback - notify players of moves and non-valid moves etc.
//Animate tiles - both swapping tiles and hovering over tiles (possibly achieve this with jQuery)
//menu to start game and show controls
//contact page using email API
//high scores
//incorporate timer and / or score
//images on tiles for a better overall look
//allow player to change game board size