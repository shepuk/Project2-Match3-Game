# CRATE MATCH

## Interactive Front End Project

### Objectives
- Build a Match-3 style game using front end tecnology.
- JavaScript, jQuery, emailJS, CSS, HTML, Bootstrap
- Goal - to build a fun, functional website with several features.
- The content should be justified, accessible, responsive and presented logically.

## Live Project
[View the live project here.](https://shepuk.github.io/Project2-Match3-Game/)

## Screenshots
![The Game Menu](https://github.com/shepuk/Project2-Match3-Game/blob/main/assets/images/screenshots/menuresponsivescreenshot.JPG?raw=true)
![The Game board](https://github.com/shepuk/Project2-Match3-Game/blob/main/assets/images/screenshots/ingameresponsivescreenshot.JPG?raw=true)

## User Experience (UX)

-   ### Target Audience
    - The target audience for this app is broad, and can be enjoyed by all ages.
-   ### User journey
    - A typical user journey should involve reading the rules starting the game, then playing 1 or more rounds of Crate Match.
    - Additionally, users may want to learn more about the creator or get in touch via the contact page.
-   ### User stories
    -   #### New Visitor Goals
        1. As a new visitor, I want to learn about the website and game.
        2. As a new visitor, I want to learn how to play the game.
        3. As a new visitor, I want to have fun and play the game. 
    -   #### Returning Visitor Goals
        1. As a returning visitor I want to beat my high scores and find a challenge.
        2. As a returning visitor I want to find out about the creator and get in touch with them.

-  ### Design
    -   #### Colour Scheme
        - A simple three-tone colour scheme was decided from the beginning, allowing the game interface to stand out more:
![Colours used in website design](https://github.com/shepuk/Project2-Match3-Game/blob/main/assets/images/screenshots/colours.JPG?raw=true)
    -   #### Typography
        - Anton and Assistant were chosen as my primary heading and text fonts.
        - Anton is a bold, blocky font which matches an 'industrial' feel to the shipping crates in the Crate Match imagery.
        - Assistant is a very readable sans-serif font which compliments the Anton font and allows for great versatility thanks to a wide selection of font weights.
    -   #### Imagery
        - Images are only used throughout the website for the tiles on the game board:
![Crate designs for the Crate Match game](https://github.com/shepuk/Project2-Match3-Game/blob/main/assets/images/screenshots/crates.JPG?raw=true)
        - Elsewhere, CSS patterns were used to enhance the look and feel of the website. For example, [Magic Pattern Toolbox](https://www.magicpattern.design/tools/css-backgrounds) was used to provide patterned background imagery for both the game and menus. [Get Waves](https://getwaves.io/) was used for a 'wavey' seperator between the game and how to play sections.

- ### Wireframes
    - Final designs did not differ greatly from my initial wireframing. Thanks to a simple layout and well thought-out logic I was able to match the design closely. The main change was moving the menu interface out of the main game area. This was done for two reasons - to reduce the complexity and the layerd nature of the menu, and to make the UI more accessible.
    - [Home page wireframe](https://github.com/shepuk/Project2-Match3-Game/blob/main/assets/images/wireframes/wireframe1.JPG)
    - [Game menu wireframe](https://github.com/shepuk/Project2-Match3-Game/blob/main/assets/images/wireframes/wireframe2.JPG)
    - [Game interface wireframe](https://github.com/shepuk/Project2-Match3-Game/blob/main/assets/images/wireframes/wireframe3.JPG)


- ## Features
    - The game and website have a rich selection of features:

    - ### Game & Logic
        - A fully interactive 10 x 10 game board, in which users can drag and drop board tiles with responsive feedback.
        - Tiles can be moved one space, and only swap with adjacent tiles. Illegal moves result in no swap.
        - A row of three, four or five horizontal/vertical tiles results in a match. Matched tiles are destroyed.
        - New tiles fall from the top of the game area to repopulate destroyed tiles.
        - Three, four and five tile matches add to the score respectively with 3, 4 or 5 points.
        - Score is tracked in an array, sorted and pushed to the game UI (top three) upon a timeout.
        - A timer is present in the UI, and will start when the player clicks 'new game'.
        - A pause button can be clicked when in game, and will pause the timer and display the main menu.
        - Game modes can be changed between 60 seconds and 30 seconds.

    - ### Game UI
        - A row of buttons above the main gameplay area provide quick and easy control of the game.
        - Buttons which are not always required, such as a 'resume' button, only display when required.
        - Remaining time, score and a pause button are hidden behind the menu UI and only display when in-game.
        - Top three high scores are displayed clearly in the menu UI.
        - When hovering over a tile, a shadow will surround it to make clear where the user is pointing.
        - A shrinking timer bar is visible, in addition to a numbered timer.

    - ### Game Audio
        - Disabled by default, players can toggle audio from the game menu.
        - When enabled, UI buttons will 'click', and matching three or more tiles will result in a chime sound effect.

    - ### Other Features
        - JavaScript logic is built into the contact page with emailJS, allowing for a fully functional contact form.
        - JavaScript logic is also present in the 404 page, and a countdown will eventually trigger a return to the home page.
        - Bootstrap 5 is used for responsive design throughout the website.

    - ### Features to implement in the future
        - Mobile support - I plan to add mobile support in the future, with a library such as [Interact JS.](https://interactjs.io/)
        - 'L' shaped matches would allow for a greater range of gameplay possibilities.
        - Powerups would also help to increase fun-factor and user choice.
        - Currently, the board is  created once, during initial DOM load. This is to prevent score immidiately increasing upon a fresh game load every time. With some additional logic, I would like to create the game board without any matches resulting in instant score accumulation instantly. I could also then trigger a new board shuffle when new game is clicked.
        - I would also like to eventually animate player feedback - notify players of moves and non-valid moves with the tiles physically moving, rather than an instant colour swap.

### Technologies / Libraries / Programs
- [JavaScript](https://www.javascript.com/) was used for the game logic, UI interaction, email logic and 404 redirect.
- [jQuery](https://jquery.com/) is used throughout, mostly for DOM manipulation.
- [HTML5](https://en.wikipedia.org/wiki/HTML5) provided the main structure of the page.
- [CSS3](https://en.wikipedia.org/wiki/Cascading_Style_Sheets) allowed me to style elements of the website, and also customize Bootstrap styling.
- [Bootstrap 5](https://getbootstrap.com/) was used throughout the project for its modern and responsive layouts. Forms and grid were the main components used.
- [Font Awesome](https://fontawesome.com/) provided several icons to help make the website look more attractive and give text more emphasis.
- [Google Fonts](https://fonts.google.com/) was used to import two fonts into the project; Anton for headings and titles, and Assistant for other text. 
- [Git](https://git-scm.com/) was used via the terminal for version control.
- [Github](https://github.com/) was used to host and store the project files.
- [Gitpod](https://www.gitpod.io/) was my primary IDE during project development.
- [Coolors](https://coolors.co/) is a palette tool which groups complimentary colours together and was used to select my main website colours.
- [Am I Responsive](http://ami.responsivedesign.is/) is a tool which allowed me to see and show pages of the website in different screen sizes.


## Testing
#### A mixture of manual and validator testing was performed on the website throughout development and after completion.

### Target audience appeal & user journey
- Thanks to easy controls and clear UI, the game and website successfuly appeal to a large audience. Careful selection was taken to use images which can be identified without their colour - allowing visually impaired users to play as well.
#### A typical user journey should involve reading the rules starting the game, then playing 1 or more rounds of Crate Match.
- Elements and sections are easily accesible, clear and provide the exact information they are intended to. 
#### Additionally, users may want to learn more about the creator or get in touch via the contact page.
- A functional contact page (made with MailJS) allows users to get in touch with the website creator as designed.

### User Stories

- ### First time visitor goals
    1. As a new visitor, I want to learn about the website and game.
        - The aim and use of the website is made immidiately apparent as the game interface dominates the screen upon initial load. A how to play button is handily placed on the game interface to allow users to learn how to interact with the game, and the aim.
    2. As a new visitor, I want to learn how to play the game.
        - A comprehensive how to play section is linked and included on the home page. Here, the player can find out about objectives, controls, score and more.
    3. As a new visitor, I want to have fun and play the game. 
        - Time was put into the game and its design to make it fun to play. A score counter provides satisfaction to inputs, the timer keeps the action flowing and a high score counter adds replay value.
- ### Returning Visitor Goals
    1. As a returning visitor I want to beat my high scores and find a challenge.
        - A top-3 high score system allows users to record multiple scores and also gives players a milestone to reach next time they play.
    2. As a returning visitor I want to find out about the creator and get in touch with them.
        - A prominent contact link in the navigation bar points users to a contact page where they can find out more and get in touch with the website creator.

### Testing the code
Throughout the project, I used validator tools to find and fix various typos or errors in my code.
##### [JSLint](https://www.jslint.com/)
##### [W3C Markup Validator](https://jigsaw.w3.org/css-validator/#validate_by_input)
##### [W3C CSS Validator](https://jigsaw.w3.org/css-validator/#validate_by_input)

#### Bug examples
1. Bug: In the repopoulateEmptyTiles function, errors were thrown when the loop was firing.
    - Cause & fix: Checking playAreaWidth on the bottom row caused the error because this row did not physically exist below the bottom row. Fixed by ending the loop one row from the bottom.
2. Bug: Tile colour change was not working when switching tiles with first tile in the array (top left)
    -  Cause & fix: When parseInt-ing a tile ID and checking it, this was returning falsy on the first tile in the array (0 = falsy/NaN). Rather than checking for wheather the id of a tile is truthy, I specified the range (<= 0, >+ 99).
3. Bug: Sometimes not all tiles were repopulating at the top row when making matches.
    - Cause & fix: When checking the top row for empties, I was checking extra spaces which wrapped round to the next row and prevented the tiles above to be repopulated. Resolved by correcting this.
4. Bug: Credit menu popup flashed on screen as DOM was loading
    - Cause & fix: Because the credits popup was removed by jQuery, the DOm would load first, followed by the script tag. I resolved this by creating the credits menu from a button click rather than loading it in the DOM straight away.
5. Validator error - The element a must not appear as a descendant (or parent) of the button element. 
    - Resolved by placing button inside a form initially. However this then caused the page to refresh when clicked, resulting in high scores being lost. Final fix was to replace the button with a p element and style that element to look exactly like the other buttons.

#### JSLint errors
- [main.js results]()
    - Lines being longer than 80 characters. Cutting these lines down makes the code less readable so I will ignore these for now. The line with the longest character count in main.js is 118 characters. Only 18 lines of code exceed 80 characters.
    - Using single quotes instead of doubles. All of my code uses double quotes apart from jQuery DOM manipulation code in which I am creating an emelent with an attribute. Using incorrect quotes here would result in broken code. I could use a seperate line of code to add a class, avoinding the JSLint errors - but doing this in a single line is better.
    - JSLint shows an error concerning a for loop in my createBoard function. Upon researching this, [JSLint does not reccomend the use of for loops.](https://www.jslint.com/help.html#for) However the code executes as intended and shows no errors.
- [redirect.js results]()
    - One line longer than 80 characters here. Again, the code is more readable this way and in total the JS file is only 14 lines long - no need to change this.
- [sendEmail.js results]()
    - 'Undeclared console' issue provided by JSLint as it is global and JSLint does not take this into account.
    - Also showing an 'expected }' error - this code was provided by EmailJS documentation and I will keep the code correct to match their specification.

## Setup, Backups & Depoyment
[Gitpod](https://www.gitpod.io/) was used as my primary IDE.
A template was provided by Code Institute which I cloned for my project repository.
Opening the repository in Gitpod is made simple thanks to a [Chrome Extension](https://chrome.google.com/webstore/detail/gitpod-always-ready-to-co/dodmmooeoklaejobgleioelladacbeki).
index.html and other files & folders were created via a combination of terminal commands and GUI shortcuts.

Git / Github were used for file versioning and hosting.
git add . was used initial to add my files and folders to the staging area, followed by git commit -m "Initial commit" and git push to finally add them to my Github repository.
Throughout the project, I was careful to use Git often and tried to make commits as descriptive as possible as well.

Once completed, I used Github pages to host the website.
This was done via the following steps;
- Go to the repository you wish to add to Github pages.
- Select the settings option
- Slect pages in the left column
- Select the master branch and /root folder
- Click Save
- The link will appear after the page refreshes and the website will now be live.

## Credits

### Specific Cases
- Solution for glitching corner [0] tile found at [Stack Overflow](https://stackoverflow.com/questions/14718561/how-to-check-if-a-number-is-between-two-values/14718577)
- Draggable researched at [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Element/setAttribute)
- Credits button toggle code taken from [W3 Schools](https://www.w3schools.com/jquery/eff_toggle.asp)
- Array sorting code from [W3 Schools](https://www.w3schools.com/js/js_array_sort.asp)
- preventDefault code, allowing the drop event to be triggered in chrome. Fix from [Stack Overflow](https://stackoverflow.com/questions/21339924/drop-event-not-firing-in-chrome)
- Some game logic help from [YouTube](https://www.youtube.com/watch?v=XD5sZWxwJUk&ab_channel=CodewithAniaKub%C3%B3w)

### Documentation & Online Help
[Mozilla MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/column-count) for...
[W3 Schools](https://www.w3schools.com/) with help on...

### Media
- [kenney.nl](https://kenney.nl/) used for tiles and UI sound.
- [opengameart](https://opengameart.org/) used for match chime.

### Content
All content was written by me.

### Acknowledgements
Code Institute & Newcastle College for their support.