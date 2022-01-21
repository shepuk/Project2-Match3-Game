document.addEventListener('DOMContentLoaded', () => {

    const grid = document.querySelector('.game-area');
    const playAreaHeight = 9;
    const playAreaWidth = 9;
    const tiles = []; //array to hold created tile/div elements

    const tileColors = [  //colours generated at coolors.co
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
            const tile = document.createElement('div') //Creating a game board tile, already sized in CSS - should make things easily scalable
            let randomColor = Math.floor(Math.random() * tileColors.length) //Random number (0-1) * 5, Mathfloor rounds down to integer. Used to assign colours to tiles
            tile.setAttribute('id', i) //Give each tile an ID - may by handy to refer to this later
            tile.style.backgroundColor = tileColors[randomColor] //Assigns a random colour from the squareColors array to the newly created div
            grid.appendChild(tile) //adding the 'tile' to the dom
            tiles.push(tile) //adding our newly created tile to the array
        }
    }

createBoard();

})