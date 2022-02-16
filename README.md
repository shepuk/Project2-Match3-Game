# CRATE MATCH

## Interactive Front End Project

### Objectives
- Build a Maach-3 style game using front end tecnology.
- JavaScript, jQuery, emailJS, CSS, HTML, Bootstrap
- Goal - to build a fun, functional website with several features.
- The content should be justified, accessible, responsive and presented logically.

## Live Project
[View the live project here.](https://shepuk.github.io/Project2-Match3-Game/)

## Screenshots
![The Game Menu](https://github.com/shepuk/Project2-Match3-Game/blob/main/assets/images/screenshots/menuresponsivescreenshot.JPG?raw=true)
![The Game Menu](https://github.com/shepuk/Project2-Match3-Game/blob/main/assets/images/screenshots/ingameresponsivescreenshot.JPG?raw=true)

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
        - ![Colours used in website design](https://github.com/shepuk/Project2-Match3-Game/blob/main/assets/images/screenshots/colours.JPG?raw=true)
    -   #### Typography
        - Anton and Assistant were chosen as my primary heading and text fonts.
        - Anton is a bold, blocky font which matches an 'industrial' feel to the shipping crates in the Crate Match imagery.
        - Assistant is a very readable sans-serif font which compliments the Anton font and allows for great versatility thanks to a wide selection of font weights.
    -   #### Imagery
        - Images are only used throughout the website for the tiles on the game board:
        - ![Crate designs for the Crate Match game](https://github.com/shepuk/Project2-Match3-Game/blob/main/assets/images/screenshots/crates.JPG?raw=true)
        - Elsewhere, CSS patterns were used to enhance the look and feel of the website. For example, [Magic Pattern Toolbox](https://www.magicpattern.design/tools/css-backgrounds) was used to provide patterned background imagery for both the game and menus. [Get Waves](https://getwaves.io/) was used for a 'wavey' seperator between the game and how to play sections.

- ### Wireframes
    - View wireframe [here](Insert link to wireframe here)
    - Text here


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
- [Balsamiq](https://balsamiq.com/) was used to create wireframes for the project.
- [Coolors](https://coolors.co/) is a palette tool which groups complimentary colours together and was used to select my main website colours.
- [Am I Responsive](http://ami.responsivedesign.is/) is a tool which allowed me to see and show pages of the website in different screen sizes.


## Testing
#### A mixture of manual and validator testing was performed on the website throughout development and after completion....

### Target audience appeal
- Text here

### User journey
- Text here

### User Stories

- ### First time visitor goals
    1. Goal 1
        - Text here
    2. Goal 22
        - Text here

- ### Returning Visitor Goals
    1. Goal 1
        - Text here
    2. Goal 2
        - Text here

### Testing the code
Throughout the project, I used the W3C validator tools to find and fix various typos or errors in my code.
-   [W3C Markup Validator](https://jigsaw.w3.org/css-validator/#validate_by_input)
-   [W3C CSS Validator](https://jigsaw.w3.org/css-validator/#validate_by_input)

#### Bug examples
1. Bug
    - Resolution

#### Existing bugs
1. Any bugs left?

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

### Bootstrap 5 components used

### Documentation & Online Help
[Mozilla MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/column-count) for...
[W3 Schools](https://www.w3schools.com/) with help on...

### Media
kenney.nl and opengameart.org used for sounds
tiles from https://www.kenney.nl/assets/sokoban

### Content
All content was written by me.

### Acknowledgements
Code Institute & Newcastle College for their support.