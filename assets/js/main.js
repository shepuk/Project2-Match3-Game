const playAreaHeight = 10;
const playAreaWidth = 10;
const tiles = [];
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

let isMenuShowing;

const tileColors = [
    "url(assets/images/tiles/blue.png)",
    "url(assets/images/tiles/green.png)",
    "url(assets/images/tiles/silver.png)",
    "url(assets/images/tiles/red.png)",
    "url(assets/images/tiles/brown.png)",
    "url(assets/images/tiles/yellow.png)"
];

window.setInterval(function () {
    repopulateEmptyTiles();
}, 150);

window.setInterval(function () {
    checkFiveHorizontal();
    checkFiveVertical();
    checkFourHorizontal();
    checkFourVertical();
    checkThreeHorizontal();
    checkThreeVertical();
}, 100);

/*
 * Creates a 10x10 set of tiles (divs), assigns each an ID and random colour,
 * adds tiles to DOM and tiles array
 */
function createBoard() {
    for (let i = 0; i < playAreaHeight * playAreaWidth; i++) {
        const tile = document.createElement(`div`);
        tile.classList.add("tile");
        tile.setAttribute("draggable", true);
        let randomColor = Math.floor(Math.random() * tileColors.length);
        tile.setAttribute("id", i);
        tile.style.backgroundImage = tileColors[randomColor];
        $(".game-area").append(tile);
        tiles.push(tile);
    };
}

createBoard();

tiles.forEach(tile => tile.addEventListener("dragstart", dragStart));
tiles.forEach(tile => tile.addEventListener("drop", onDrop));
tiles.forEach(tile => tile.addEventListener("dragend", dragEnd));

let draggedTileColor;
let replacedTileColor;
let idOfDraggedTile;
let idOfReplacedTile;

//The two below preventDefault actions allow the drop event to
//be triggered in chrome. Fix from
//https://stackoverflow.com/questions/21339924/drop-event-not-firing-in-chrome
$(".tile").on("dragenter", function (event) {
    event.preventDefault();
})
$(".tile").on("dragover", function (event) {
    event.preventDefault();
})

/*
 * Places the ID and colour of a picked up tile into variables
 */
function dragStart() {
    draggedTileColor = this.style.backgroundImage;
    idOfDraggedTile = parseInt(this.id);
}

/*
 * Swaps the colours of dragged and dropped tiles
 */
function onDrop() {
    idOfReplacedTile = parseInt(this.id);
    replacedTileColor = this.style.backgroundImage;
    this.style.backgroundImage = draggedTileColor;
    tiles[idOfDraggedTile].style.backgroundImage = replacedTileColor;
}

/*
 * Establish adjacent tiles by taking the (parsed)ID number of a dragged
 * tile and specifying the ID number of up, down, left & right tiles.
 * If statement checks if move is legal or not, and changes (or doesn't change)
 * tile colours accordingly.
 */
function dragEnd() {
    let adjacentTiles = [
        idOfDraggedTile - playAreaWidth,
        idOfDraggedTile + playAreaWidth,
        idOfDraggedTile - 1,
        idOfDraggedTile + 1
    ]

    let legalMove = adjacentTiles.includes(idOfReplacedTile);

    if ((idOfReplacedTile >= 0 && idOfReplacedTile <= 99) && legalMove) {
        idOfReplacedTile = null;
    } else if (idOfReplacedTile && !legalMove) {
        tiles[idOfReplacedTile].style.backgroundImage = replacedTileColor;
        tiles[idOfDraggedTile].style.backgroundImage = draggedTileColor;
    } else {
        tiles[idOfDraggedTile].style.backgroundImage = draggedTileColor;
        tiles[idOfReplacedTile].style.backgroundImage = replacedTileColor;
    }
}

/*
 * Checks if timermoving variable is true, if it is, setinterval is started
 * Runs game over function once time reaches zero
 */
function updateTimer() {
    if (!timerMoving)
        return;

    $(".progress-bar").css({
        width: remainingTime * 100 / 60 + "%"
    });

    remainingTime = remainingTime - 1;
    if (remainingTime >= 0)
        $(".timer").html(remainingTime);
    else {
        $(".timer").html("0");
        gameOver();
    }
}

/*
 * Prints current score to score counter in DOM
 */
function printScore() {
    $(".score").html(score);
}

/*
 * Stops timer, adds high scores to array, sorts high scores into decending,
 * displays menu and prints high scores into DOM. Array sorting code from:
 * https://www.w3schools.com/js/js_array_sort.asp
 */
function gameOver() {
    timerMoving = false;
    highScores.push(score);
    highScores.sort(function (a, b) {
        return b - a
    });
    $(".resume-button").remove();
    $(".game-menu").fadeIn("medium");
    $(".game-menu").css("pointer-events", "auto");
    $(".container-game-menu").css("pointer-events", "auto");
    $(".high-score-one").text(highScores[0]);
    $(".high-score-two").text(highScores[1]);
    $(".high-score-three").text(highScores[2]);
}

/*
 * Loops through tiles on the game board, when an empty tile is found,
 * get the colour value of the above tile and replace the epmty tile
 * with that colour. Then removes backgroundImage from that tile.
 */
function repopulateEmptyTiles() {
    //Move tiles down
    for (i = 0; i < playAreaHeight * playAreaWidth - playAreaWidth; i++) {
        if (tiles[i + playAreaWidth].style.backgroundImage === "") {
            tiles[i + playAreaWidth].style.backgroundImage =
                tiles[i].style.backgroundImage;
            tiles[i].style.backgroundImage = "";
        }

        const topRow = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        const isTopRow = topRow.includes(i);

        //Repopulate empty tiles with random colours
        if (isTopRow && tiles[i].style.backgroundImage === "") {
            let randomColor = Math.floor(Math.random() * tileColors.length);
            tiles[i].style.backgroundImage = tileColors[randomColor];
        }
    }
}


/*
 * Checks for 5 horizontal matching colours (excluding last four
 * rows to prevent wrapping) Adds 5 to score, removes background image.
 */
function checkFiveHorizontal() {
    for (i = 0; i < playAreaHeight * playAreaWidth - 3; i++) {
        let fiveHorizontal = [i, i + 1, i + 2, i + 3, i + 4];
        let selectedColor = tiles[i].style.backgroundImage;
        const blankTile = tiles[i].style.backgroundImage === "";

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

        if (fiveHorizontal.every(index =>
            tiles[index].style.backgroundImage ===  selectedColor && !blankTile)) {
            score += 5;
            printScore();
            if (soundActive) {
                matchSound.play();
            }
            fiveHorizontal.forEach(index => {
                tiles[index].style.backgroundImage = "";
            })
        }
    }
}

/*
 * Checks for 5 vertical matching colours (excluding last
 * four vertical tiles to prevent wrapping). Adds 5 to score,
 * removes background image.
 */
function checkFiveVertical() {
    for (i = 0; i < playAreaHeight * playAreaWidth - playAreaWidth - playAreaWidth - playAreaWidth - playAreaWidth; i++) {
        let fiveVertical = [i, i + playAreaWidth, i + playAreaWidth * 2, i + playAreaWidth * 3, i + playAreaWidth * 4];
        let selectedColor = tiles[i].style.backgroundImage;
        const blankTile = tiles[i].style.backgroundImage === "";
        if (fiveVertical.every(index => tiles[index].style.backgroundImage === selectedColor && !blankTile)) {
            score += 5;
            printScore();
            if (soundActive) {
                matchSound.play();
            }
            fiveVertical.forEach(index => {
                tiles[index].style.backgroundImage = "";
            })
        }
    }
}

/*
 * Checks for 4 horizontal matching colours (excluding last three rows to prevent wrapping)
 * Adds 4 to score, removes background image.
 */
function checkFourHorizontal() {
    for (i = 0; i < playAreaHeight * playAreaWidth - 3; i++) {
        let fourHorizontal = [i, i + 1, i + 2, i + 3];
        let selectedColor = tiles[i].style.backgroundImage;
        const blankTile = tiles[i].style.backgroundImage === "";

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
                tiles[index].style.backgroundImage = "";
            })
        }
    }
}

/*
 * Checks for 4 vertical matching colours (excluding last four vertical tiles to prevent wrapping)
 * Adds 4 to score, removes background image.
 */
function checkFourVertical() {
    for (i = 0; i < playAreaHeight * playAreaWidth - playAreaWidth - playAreaWidth - playAreaWidth; i++) {
        let fourVertical = [i, i + playAreaWidth, i + playAreaWidth * 2, i + playAreaWidth * 3];
        let selectedColor = tiles[i].style.backgroundImage;
        const blankTile = tiles[i].style.backgroundImage === "";
        if (fourVertical.every(index => tiles[index].style.backgroundImage === selectedColor && !blankTile)) {
            score += 4;
            printScore();
            if (soundActive) {
                matchSound.play();
            }
            fourVertical.forEach(index => {
                tiles[index].style.backgroundImage = "";
            })
        }
    }
}

/*
 * Checks for 3 horizontal matching colours (excluding last two rows to prevent wrapping)
 * Adds 3 to score, removes background image.
 */
function checkThreeHorizontal() {
    for (i = 0; i < playAreaHeight * playAreaWidth - 2; i++) {
        let threeHorizontal = [i, i + 1, i + 2];
        let selectedColor = tiles[i].style.backgroundImage;
        const blankTile = tiles[i].style.backgroundImage === "";

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
                tiles[index].style.backgroundImage = "";
            })
        }
    }
}

/*
 * Checks for 3 vertical matching colours (excluding last two horizontal tiles to prevent wrapping)
 * Adds 5 to score, removes background image.
 */
function checkThreeVertical() {
    for (i = 0; i < playAreaHeight * playAreaWidth - playAreaWidth - playAreaWidth; i++) {
        let threeVertical = [i, i + playAreaWidth, i + playAreaWidth * 2];
        let selectedColor = tiles[i].style.backgroundImage;
        const blankTile = tiles[i].style.backgroundImage === "";
        if (threeVertical.every(index => tiles[index].style.backgroundImage === selectedColor && !blankTile)) {
            score += 3;
            printScore();
            if (soundActive) {
                matchSound.play();
            }
            threeVertical.forEach(index => {
                tiles[index].style.backgroundImage = "";
            })
        }
    }
}

//Menu

//New game button
const startNewGameButton = document.getElementsByClassName("new-game-button");
startNewGameButton[0].addEventListener("click", startNewGame);

function startNewGame() {
    $(".game-menu").fadeOut("medium");
    $(".credits-menu").hide();
    $(".game-menu").css("pointer-events", "none");
    $(".container-game-menu").css("pointer-events", "none");
    score = 0;
    printScore();
    $(".resume-container").remove();
    $(".resume-button-container").append('<div class="resume-container"><button class="resume-button">RESUME</button></div>');
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
        if (isMenuShowing) {
            timerMoving = true;
            updateTimer();
            $(".game-menu").fadeOut("medium");
            isMenuShowing = false;
            $(".credits-menu").hide();
            $(".game-menu").css("pointer-events", "none");
            $(".container-game-menu").css("pointer-events", "none");
            if (soundActive) {
                uiSound.play();
            } else {
                return;
            }
        }
    }
}

//Game length selector buttons
const sixtyButton = document.getElementsByClassName("mode60-button");
sixtyButton[0].addEventListener("click", gameTimeSixty);

function gameTimeSixty() {
    gameMode = 60;
    $(".mode60-button").css("background-color", "#00ADB5");
    $(".mode30-button").css("background-color", "#21373f");
    if (soundActive) {
        uiSound.play();
    }
}

const thirtyButton = document.getElementsByClassName("mode30-button");
thirtyButton[0].addEventListener("click", gameTimeThirty);

function gameTimeThirty() {
    gameMode = 30;
    $(".mode60-button").css("background-color", "#21373f");
    $(".mode30-button").css("background-color", "#00ADB5");
    if (soundActive) {
        uiSound.play();
    }
}

//Pause button
const pauseButton = document.getElementsByClassName("pause-button");
pauseButton[0].addEventListener("click", pauseGame);

function pauseGame() {
    $(".game-menu").fadeIn("medium");
    isMenuShowing = true;
    timerMoving = false;
    $(".game-menu").css("pointer-events", "auto");
    $(".container-game-menu").css("pointer-events", "auto");
    if (soundActive) {
        uiSound.play();
    }
}

//Credits button & toggler
const creditsButton = document.getElementsByClassName("credits-button");
creditsButton[0].addEventListener("click", showCredits);

function showCredits() {
    if (soundActive) {
        uiSound.play();
    }
    $(".credits-button").remove();
    $(".game-menu-credits > div:nth-child(1)").append('<div><button class="credits-toggler">CREDITS</button></div>');
    $(".game-menu-credits > div:nth-child(2)").append('<div class="credits-menu"><p>A Match-3 style game made by Paul Shepherd</p></div>');
    $(".credits-menu").parent().css("margin", "auto auto auto 5px");

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
        $(".sound-toggle-button").append('<i class="fas fa-volume-up"></i>')
        if (soundActive) {
            uiSound.play();
        }
        return;
    }
    if (soundActive) {
        soundActive = false;
        $(".sound-toggle-button").text("");
        $(".sound-toggle-button").append('<i class="fas fa-volume-mute"></i>')
        if (soundActive) {
            uiSound.play();
        }
    }
}



//bug resolved - in the repopoulate empty tiles function, errors were thrown when the loop was firing. Because + playareawidth on the bottom row did not exist. Fixed by ending the loop one row from bottom
//Bug found - colour change not working when switching tiles with first tile in the array (top left) - RESOLVED rather than checking for wheather the id of a tile is truthy, I specified the range (<= 0, >+ 99) as 0 returns as NaN when using parseInt
//bug resolved - sometimes not all tiles repopulate at the top row when making matches - resolved by moving the repopulate code out of the repopulateEmptyTiles first if statement and executing this function before the match detecting functions
//bug resolved - credit menu flashed on screen as dom is loading, resolved by creating the credits menu from a button click rather than loading it in on initial load

//Solution for glitching corner [0] tile found at
    //https://stackoverflow.com/questions/14718561/how-to-check-if-a-number-is-between-two-values/14718577

// Validator error - The element a must not appear as a descendant (or parent) of the button element. Resolved by placing button inside a form
//update to this error - using a form refreshed the page, removing high scores. Styles a <p> element to look like a button instead

//Draggable researched at https://developer.mozilla.org/en-US/docs/Web/API/Element/setAttribute

//TODO
//CURRENT DESIRED FEATURE LIST
//stop board creating before player clicks new game
//animate feedback - notify players of moves and non-valid moves etc.
//Animate tiles - both swapping tiles and hovering over tiles
//contact page using email API