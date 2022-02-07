const playAreaHeight = 10;
const playAreaWidth = 10;
const tiles = []; //array to hold created tile/div elements
let score = 0;
let highScores = [];

let timer = setInterval(updateTimer, 1000);
let remainingTime = 10; // seconds
let timerMoving = false;
let gameMode = 60;

let soundActive = false;
let matchSound;
let uiSound;
matchSound = new Audio("assets/sounds/match.wav");
uiSound = new Audio("assets/sounds/ui.ogg");

const tileColors = [ //colours generated at coolors.co
    'url(assets/images/tiles/blue.png)',
    'url(assets/images/tiles/green.png)',
    'url(assets/images/tiles/purple.png)',
    'url(assets/images/tiles/red.png)',
    'url(assets/images/tiles/teal.png)',
    'url(assets/images/tiles/yellow.png)'
]

/**
 * Creates a 10x10 set of divs (game tiles), assigns each a random colour, 
 * a uniqie ID and appends as a child to the main game area div
 */
function createBoard() {
    for (let i = 0; i < playAreaHeight * playAreaWidth; i++) { //Looping through our 9x9 game board
        const tile = document.createElement(`div`); //Creating a game board tile, already sized in CSS - should make things easily scalable
        tile.classList.add('tile');
        tile.setAttribute('draggable', true); //Will allow mouse controls - Researched at https://developer.mozilla.org/en-US/docs/Web/API/Element/setAttribute
        let randomColor = Math.floor(Math.random() * tileColors.length); //Random number (0-1) * 5, Mathfloor rounds down to integer. Used to assign colours to tiles
        tile.setAttribute('id', i); //Give each tile an ID - may by handy to refer to this later
        tile.style.backgroundImage = tileColors[randomColor]; //Assigns a random colour from the squareColors array to the newly created div
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
    draggedTileColor = this.style.backgroundImage;
    idOfDraggedTile = parseInt(this.id);
}

/**
 * logs the colour and id of the tile to be replaced
 * switches the colours of the dragged and replaced tiles
 */
function onDrop() {
    replacedTileColor = this.style.backgroundImage;
    idOfReplacedTile = parseInt(this.id);
    this.style.backgroundImage = draggedTileColor;
    tiles[idOfDraggedTile].style.backgroundImage = replacedTileColor;
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
    } else if (idOfReplacedTile && !legalMove) {
        tiles[idOfReplacedTile].style.backgroundImage = replacedTileColor;
        tiles[idOfDraggedTile].style.backgroundImage = draggedTileColor;
    } else tiles[idOfDraggedTile].style.backgroundImage = draggedTileColor;

}

/**
 * checks if timermoving variable is true, if it is, setinterval is started
 * timermoving variable is controlled by the menu buttons
 */
function updateTimer() {
    if (!timerMoving)
        return;

    $('.progress-bar').css({
        width: remainingTime * 100 / 60 + '%'
    });

    remainingTime = remainingTime - 1;
    if (remainingTime >= 0)
        $('.timer').html(remainingTime);
    else {
        $('.timer').html('0');
        gameOver();
        //Add logic to stop game
    }
}

function gameOver() {
    timerMoving = false;
    highScores.push(score);
    highScores.sort(function (a, b) {
        return b - a
    }); //https://www.w3schools.com/js/js_array_sort.asp
    $('.resume-button').remove();
    $(".game-menu").fadeIn('medium');
    $(".game-menu").css('pointer-events', 'auto');
    $(".container-game-menu").css('pointer-events', 'auto');
    $('.high-score-one').text(highScores[0]);
    $('.high-score-two').text(highScores[1]);
    $('.high-score-three').text(highScores[2]);
}

/**
 * loops through tiles on the game board, when an empty tile is found,
 * get the colour value of the above tile and replace the epmty tile with that colour
 */
function repopulateEmptyTiles() {
    //Move tiles down
    for (i = 0; i < playAreaHeight * playAreaWidth - playAreaWidth; i++) {
        if (tiles[i + playAreaWidth].style.backgroundImage === '') {
            tiles[i + playAreaWidth].style.backgroundImage = tiles[i].style.backgroundImage;
            tiles[i].style.backgroundImage = '';
        }

        const topRow = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        const isTopRow = topRow.includes(i);

        //Repopulate empty tiles with random colours
        if (isTopRow && tiles[i].style.backgroundImage === '') {
            let randomColor = Math.floor(Math.random() * tileColors.length);
            tiles[i].style.backgroundImage = tileColors[randomColor];
        }
    }
}

function checkFiveHorizontal() {
    for (i = 0; i < playAreaHeight * playAreaWidth - 3; i++) { //this loop stops at the tile four left of bottom right
        let fiveHorizontal = [i, i + 1, i + 2, i + 3, i + 4];
        let selectedColor = tiles[i].style.backgroundImage;
        const blankTile = tiles[i].style.backgroundImage === '';

        const lastFourRows = [
            playAreaWidth - 4,
            playAreaWidth - 3,
            playAreaWidth - 2,
            playAreaWidth - 1,
            playAreaWidth * 2 - 4,
            playAreaWidth * 2 - 3,
            playAreaWidth * 2 - 2,
            playAreaWidth * 2 - 1,
            playAreaWidth * 3 - 4,
            playAreaWidth * 3 - 3,
            playAreaWidth * 3 - 2,
            playAreaWidth * 3 - 1,
            playAreaWidth * 4 - 4,
            playAreaWidth * 4 - 3,
            playAreaWidth * 4 - 2,
            playAreaWidth * 4 - 1,
            playAreaWidth * 2 - 4,
            playAreaWidth * 5 - 3,
            playAreaWidth * 5 - 2,
            playAreaWidth * 5 - 1,
            playAreaWidth * 6 - 4,
            playAreaWidth * 6 - 3,
            playAreaWidth * 6 - 2,
            playAreaWidth * 6 - 1,
            playAreaWidth * 7 - 4,
            playAreaWidth * 7 - 3,
            playAreaWidth * 7 - 2,
            playAreaWidth * 7 - 1,
            playAreaWidth * 8 - 4,
            playAreaWidth * 8 - 3,
            playAreaWidth * 8 - 2,
            playAreaWidth * 8 - 1,
            playAreaWidth * 9 - 4,
            playAreaWidth * 9 - 3,
            playAreaWidth * 9 - 2,
            playAreaWidth * 9 - 1,
            playAreaWidth * 10 - 4,
            playAreaWidth * 10 - 3,
            playAreaWidth * 10 - 2,
            playAreaWidth * 10 - 1,
        ]

        if (lastFourRows.includes(i)) continue;

        if (fiveHorizontal.every(index => tiles[index].style.backgroundImage === selectedColor && !blankTile)) {
            score += 5;
            printScore();
            if (soundActive) {
                matchSound.play();
            }
            fiveHorizontal.forEach(index => {
                tiles[index].style.backgroundImage = '';
            })
        }
    }
}

function checkFiveVertical() {
    for (i = 0; i < playAreaHeight * playAreaWidth - playAreaWidth - playAreaWidth - playAreaWidth - playAreaWidth; i++) { //this loop ends four tiles north of bottom right
        let fiveVertical = [i, i + playAreaWidth, i + playAreaWidth * 2, i + playAreaWidth * 3, i + playAreaWidth * 4];
        let selectedColor = tiles[i].style.backgroundImage;
        const blankTile = tiles[i].style.backgroundImage === '';
        if (fiveVertical.every(index => tiles[index].style.backgroundImage === selectedColor && !blankTile)) {
            score += 5;
            printScore();
            if (soundActive) {
                matchSound.play();
            }
            fiveVertical.forEach(index => {
                tiles[index].style.backgroundImage = '';
            })
        }
    }
}

function checkFourHorizontal() {
    for (i = 0; i < playAreaHeight * playAreaWidth - 3; i++) { //this loop stops at the tile three left of bottom right
        let fourHorizontal = [i, i + 1, i + 2, i + 3];
        let selectedColor = tiles[i].style.backgroundImage;
        const blankTile = tiles[i].style.backgroundImage === '';

        const lastThreeRows = [
            playAreaWidth - 3,
            playAreaWidth - 2,
            playAreaWidth - 1,
            playAreaWidth * 2 - 3,
            playAreaWidth * 2 - 2,
            playAreaWidth * 2 - 1,
            playAreaWidth * 3 - 3,
            playAreaWidth * 3 - 2,
            playAreaWidth * 3 - 1,
            playAreaWidth * 4 - 3,
            playAreaWidth * 4 - 2,
            playAreaWidth * 4 - 1,
            playAreaWidth * 5 - 3,
            playAreaWidth * 5 - 2,
            playAreaWidth * 5 - 1,
            playAreaWidth * 6 - 3,
            playAreaWidth * 6 - 2,
            playAreaWidth * 6 - 1,
            playAreaWidth * 7 - 3,
            playAreaWidth * 7 - 2,
            playAreaWidth * 7 - 1,
            playAreaWidth * 8 - 3,
            playAreaWidth * 8 - 2,
            playAreaWidth * 8 - 1,
            playAreaWidth * 9 - 3,
            playAreaWidth * 9 - 2,
            playAreaWidth * 9 - 1,
            playAreaWidth * 10 - 3,
            playAreaWidth * 10 - 2,
            playAreaWidth * 10 - 1,
        ]

        if (lastThreeRows.includes(i)) continue;

        if (fourHorizontal.every(index => tiles[index].style.backgroundImage === selectedColor && !blankTile)) {
            score += 4;
            printScore();
            if (soundActive) {
                matchSound.play();
            }
            fourHorizontal.forEach(index => {
                tiles[index].style.backgroundImage = '';
            })
        }
    }
}

function checkFourVertical() {
    for (i = 0; i < playAreaHeight * playAreaWidth - playAreaWidth - playAreaWidth - playAreaWidth; i++) { //this loop ends at the tile three north of bottom-right
        let fourVertical = [i, i + playAreaWidth, i + playAreaWidth * 2, i + playAreaWidth * 3];
        let selectedColor = tiles[i].style.backgroundImage;
        const blankTile = tiles[i].style.backgroundImage === '';
        if (fourVertical.every(index => tiles[index].style.backgroundImage === selectedColor && !blankTile)) {
            score += 4;
            printScore();
            if (soundActive) {
                matchSound.play();
            }
            fourVertical.forEach(index => {
                tiles[index].style.backgroundImage = '';
            })
        }
    }
}

function checkThreeHorizontal() {
    for (i = 0; i < playAreaHeight * playAreaWidth - 2; i++) { //this loop stops at the tile two left of bottom right
        let threeHorizontal = [i, i + 1, i + 2];
        let selectedColor = tiles[i].style.backgroundImage;
        const blankTile = tiles[i].style.backgroundImage === '';

        const lastTwoRows = [
            playAreaWidth - 2,
            playAreaWidth - 1,
            playAreaWidth * 2 - 2,
            playAreaWidth * 2 - 1,
            playAreaWidth * 3 - 2,
            playAreaWidth * 3 - 1,
            playAreaWidth * 4 - 2,
            playAreaWidth * 4 - 1,
            playAreaWidth * 5 - 2,
            playAreaWidth * 5 - 1,
            playAreaWidth * 6 - 2,
            playAreaWidth * 6 - 1,
            playAreaWidth * 7 - 2,
            playAreaWidth * 7 - 1,
            playAreaWidth * 8 - 2,
            playAreaWidth * 8 - 1,
            playAreaWidth * 9 - 2,
            playAreaWidth * 9 - 1,
            playAreaWidth * 10 - 2,
            playAreaWidth * 10 - 1,
        ]

        if (lastTwoRows.includes(i)) continue;

        if (threeHorizontal.every(index => tiles[index].style.backgroundImage === selectedColor && !blankTile)) {
            score += 3;
            printScore();
            if (soundActive) {
                matchSound.play();
            }
            threeHorizontal.forEach(index => {
                tiles[index].style.backgroundImage = '';
            })
        }
    }
}

function checkThreeVertical() {
    for (i = 0; i < playAreaHeight * playAreaWidth - playAreaWidth - playAreaWidth; i++) { //this loop ends at the tile two north of bottom-right
        let threeVertical = [i, i + playAreaWidth, i + playAreaWidth * 2];
        let selectedColor = tiles[i].style.backgroundImage;
        const blankTile = tiles[i].style.backgroundImage === '';
        if (threeVertical.every(index => tiles[index].style.backgroundImage === selectedColor && !blankTile)) {
            score += 3;
            printScore();
            if (soundActive) {
                matchSound.play();
            }
            threeVertical.forEach(index => {
                tiles[index].style.backgroundImage = '';
            })
        }
    }
}

function printScore() {
    $('.score').html(score);
}

window.setInterval(function () {
    repopulateEmptyTiles()
}, 150)

window.setInterval(function () {
    checkFiveHorizontal(),
    checkFiveVertical(),
    checkFourHorizontal(),
    checkFourVertical(),
    checkThreeHorizontal(),
    checkThreeVertical()
}, 100)

//Menu

//New game button
const startNewGameButton = document.getElementsByClassName("new-game-button");
startNewGameButton[0].addEventListener("click", startNewGame);

function startNewGame() {
    $(".game-menu").fadeOut('medium');
    $(".credits-menu").hide();
    $(".game-menu").css('pointer-events', 'none');
    $(".container-game-menu").css('pointer-events', 'none');
    score = 0;
    printScore();
    $(".resume-container").remove();
    $(".game-menu > div:nth-child(1)").after('<div class="resume-container"><button class="resume-button">RESUME</button></div>');
    remainingTime = gameMode;
    timerMoving = true;
    updateTimer();
    if (soundActive) {
        uiSound.play();
    }


    //Resume button
    const resumeButton = document.getElementsByClassName("resume-button");
    resumeButton[0].addEventListener("click", resumeGame);

    function resumeGame() {
        timerMoving = true;
        updateTimer();
        $(".game-menu").fadeOut('medium');
        $(".credits-menu").hide();
        $(".game-menu").css('pointer-events', 'none');
        $(".container-game-menu").css('pointer-events', 'none');
        if (soundActive) {
            uiSound.play();
        }
    }
}

//Game length selector buttons
const sixtyButton = document.getElementsByClassName("mode60-button");
sixtyButton[0].addEventListener("click", gameTimeSixty);

function gameTimeSixty() {
    gameMode = 60;
    $(".mode60-button").css('background-color', '#168aad');
    $(".mode30-button").css('background-color', '#21373f');
    if (soundActive) {
        uiSound.play();
    }
}

const thirtyButton = document.getElementsByClassName("mode30-button");
thirtyButton[0].addEventListener("click", gameTimeThirty);

function gameTimeThirty() {
    gameMode = 30;
    $(".mode60-button").css('background-color', '#21373f');
    $(".mode30-button").css('background-color', '#168aad');
    if (soundActive) {
        uiSound.play();
    }
}

//Pause button
const pauseButton = document.getElementsByClassName("pause-button");
pauseButton[0].addEventListener("click", pauseGame);

function pauseGame() {
    $(".game-menu").fadeIn('medium');
    timerMoving = false;
    $(".game-menu").css('pointer-events', 'auto');
    $(".container-game-menu").css('pointer-events', 'auto');
    if (soundActive) {
        uiSound.play();
    }
}

//Credits button & toggler
const creditsButton = document.getElementsByClassName("credits-button");
creditsButton[0].addEventListener("click", showCredits);

function showCredits() {
    $('.credits-button').remove();
    $(".game-menu-credits > div:nth-child(1)").append('<div><button class="credits-toggler">CREDITS</button></div>');
    $(".game-menu-credits > div:nth-child(2)").append('<div class="credits-menu"><p>A Match-3 style game made by Paul Shepherd</p></div>');

    //Credits button toggle code taken from https://www.w3schools.com/jquery/eff_toggle.asp
    $(".credits-toggler").click(function () {
        $(".credits-menu").toggle();
        if (soundActive) {
            uiSound.play();
        }
    });
}

//Audio button & toggler
const soundButton = document.getElementsByClassName("sound-toggle-button");
soundButton[0].addEventListener("click", toggleSound);

function toggleSound() {
    if (!soundActive) {
        soundActive = true;
        $(".sound-toggle-button").text("");
        $('.sound-toggle-button').append('<i class="fas fa-volume-up"></i>')
        if (soundActive) {
            uiSound.play();
        }
        return;
    }
    if (soundActive) {
        soundActive = false;
        $(".sound-toggle-button").text("");
        $('.sound-toggle-button').append('<i class="fas fa-volume-mute"></i>')
        if (soundActive) {
            uiSound.play();
        }
    }
}



//bug resolved - in the repopoulate empty tiles function, errors were thrown when the loop was firing. Because + playareawidth on the bottom row did not exist. Fixed by ending the loop one row from bottom
//Bug found - colour change not working when switching tiles with first tile in the array (top left)
//bug resolved - sometimes not all tiles repopulate at the top row when making matches - resolved by moving the repopulate code out of the repopulateEmptyTiles first if statement and executing this function before the match detecting functions
//bug resolved - credit menu flashed on screen as dom is loading, resolved by creating the credits menu from a button click rather than loading it in on initial load


//TODO!

//CURRENT DESIRED FEATURE LIST
//stop board creating before player clicks new game
//animate feedback - notify players of moves and non-valid moves etc.
//Animate tiles - both swapping tiles and hovering over tiles
//contact page using email API