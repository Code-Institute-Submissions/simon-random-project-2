# Simon Random Memory Game (Milestone Project 2 | Code Institute)

## [Link to my website](https://matthewhopwood.github.io/simon-random-project-2/) 

#### Game Overview / Introduction

The game consists of four different coloured buttons as convention with Simon games; yellow, blue, red and green.
When the user presses the start button a random sequence of button flashes will occur (1 flash at level 1), which
the user will need to remember for their turn. As each buttons flashes it will also play a sound unique to that button.

The start button is immediately replaced with a restart button, that allows the user to reset the game back to level 1.
Next to the start/restart button is a 'rules' button that once clicked will show a modal with game instructions (the amount
of text is reduced on mobile). 

The user must remember the sequence that the AI plays, once it is the users turn they must 
input the same sequence (by clicking the corresponding colored buttons).Every time the user gets the sequence right, 
the level will increment by 1 and the sequence will become longer by 1. If the user get the sequence wrong, the level 
will automatically restart with a new random sequence but at the same level difficulty.

Below is a link to some In-game images:

[In-game Images](https://github.com/MatthewHopwood/simon-random-project-2/tree/master/assets/game_images)

## UX
The website was designed with the aim of fitting the whole game on a single screen without scrolling (100 viewport height) in a portrait orientation. As an improvement for next time
I would make sure the layout focuses on both portrait and landscape orientations. 

The background used is quite simple so that is does not interfere with visuals of the game, but is also not so plain
that it is boring to look at. The button images are big, bright and colorful on all screen sizes as they are the focus of the game. After experimenting with different colours for the font
I chose white to be the most readable and aesthically pleasing to the eye. 

As the focus of this website is the game itself, I decided to reduce the visual clutter by putting any information about the game in a modal which is activated by pressing the 'Rules' button.

A mobile first appoach was used as the majority of todays internet browsing is done through mobile, with the website being fully responsive to multiple resolutions (browers sizes)
and a wide range of mobile devices from the Iphone5/SE through to the Ipad. 

Before undertaking full blown development of the project, I took advantage of a free trial wireframe package called 'MarvelApp'. I used this to create
mock-ups for both a general desktop and mobile-sized device. You can see these by following the link to my wireframes folder below:

[Wireframes Folder](https://github.com/MatthewHopwood/simon-random-project-2/tree/master/assets/wireframes)

## Features / Logic

### Existing Features / Logic

#### Logic Overview

I created an array of 'button' objects that consist of the four colored button images the user can see on screen. I gave each button
a color and an ID number so they could be selected easily later on. The buttons have a flash and a pressed function. They also have a flag
to check whether or not they have been pressed, which is 'this.state = false'. I also use the 'self = this' method, which allows me to target
the instance of the button image within the button handler. The buttons are targeted by their ID values with 'document.getElementById'.

The .pressed() function consists of a on click handler so that we can determine if the user clicks the button and allows us to carry out
the logic contained in the pressed function. This logic is basically change the source of the image to a new image that is slightly 
brighter to create the illusion of a 'flash'. A different sound is also played for each button, however we use the 'sound.currentTime = 0'
method to reset the sound playback so there aren't any overlapping sounds if the buttons are being pressed more quickly than the duration of
the sound file. In this function the 'state' property is set to true so that the button can only be pressed once, the 'state' property is then switched backed to
false after the 'setTimeout 400ms' function so the button can be pressed again.

The .flash() function changes the button image source to a new image that is slightly brighter. There is a timer attached to the end of the function
that makes sure the image switches back to the original after 400ms, which creates the effect of a 'flash'. A sound is also played through this function.

The generateSequence() function starts by emptying the sequences array so that each time it is called, the array contains only the newly generated numbers.
A for loop is used to generate a numbers between 0 and 3, depending on the current level (so level 3 would generate 3 numbers). The generated numbers
are then pushed into the 'sequences' array.

The flashSequence() function contains the 'choice' variable which is equal to 'sequences[marker]', when first called is 'sequences[0]'. We then call the flash 
function which belongs to the 'button' object, but we choose the specific button from the array by matching the 'marker' with the index number in the 'buttons' array 
e.g.
    
    
    marker = 2
    choice = sequences[marker]
    choice = sequences[2]
    sequences[2] = 0
    buttons[choice].flash();
    buttons[0].flash();
    
    
this will select the 3rd item in the buttons array. This function will repeat while 'marker' is less than sequences.length (which is determined in the generateSquence
function). marker will always start at 0 and is incremented each time this function is called and will stop as it reachs the the length of sequences.
e.g.

    
    marker = 5
    sequences.length = 6
    
    
Instead of incrementing marker again, the else statement is ran which called endSequence().

The endSequence() function resets the marker so that the next sequence will start from an index of 0 again. sequenceOver is also set to true,
which allows the user to press buttons.

The roundOver(won) function uses an if / else statement to check if the user was successful in repeating the sequence. If not the level will 
restart itself with newly generated
sequence after 2000ms. If the user is successful then the level will be incremented by 1 before the new sequence is generated.

The startGame() function calls the generateSequence function and then calls the flashSequence function after 1000ms.

The restartGame() function is the same as startGame function, however it sets the level back to 1 and has a delay of 2000ms.

jQuery is used to select the 'start_button' and attach an onclick handler. An if else statement is used to determine whether the 'start_button' 
will call startGame or restartGame.

The window.onload = (e) function creates four button images that the player can interact with as soon as the window has loaded.

I created a flag called 'allowInput' which is used thoughtout the code to limit the input of the user at certain parts of the game.
e.g.

    
     if (!allowInput)
    {    
        return;
    }
    

The check to see if the users sequence choice matches the AI sequence choice is present in the button.pressed() function. Using an if / else statement
I can check if the if the first number in the 'sequences' array is equal to the ID value given to the button that was pressed. It is possible to get the next number in the
'sequences' array by using a 'marker' and incrementing it everytime the use gets the button choice correct.
e.g.


    if (sequences[marker] !== this.id)
    if (sequences[0] !== 1)
    if (2 !== 1)
    {
        Execute loss code
    }
    
    else (sequences[marker] == this.id)
    else (sequences[0] == 3)
    else (3 == 3)
    {
        Execute win code
    }


### Features Left to Implement
- Leaderboard system that could be added that constantly updates itself when users play the game.
- Better optimisation for landscape view on all devices. 
- Choice of themes for the games that replaces graphics and sounds, e.g. Farm animal face buttons and the corresponding sound.
- Reduce 'empty space' for all devices.



## Technologies Used

##### HTML5
- Used to create the html document and the layout of the webpage using a semantic structure. This code will be found in a .html file.

##### CSS3
- Used to create custom styling for each of the elements within the html document. Usually found in a external .css file.

##### JavaScript
- Used to create and implent the logic within the site/game, using functions, objects, methods and varibales. Found in an external .js file and embedded in the html file. 

##### JQuery  - http://code.jquery.com/
- This is a small, fast JavaScript library that was used specifically for adding js functionality to the modals and burger-icon.

##### Bootstrap - https://getbootstrap.com/docs/3.3/
- This front-end framework has multiple sections including CSS, components and JavaScript - which were all used within my code.

##### Google Fonts - https://fonts.google.com/
- Used to include different font styles and font weights in the website. Specifically Indie Flower and Exo with a range of 100 - 700 font weights.

##### Jasmine Testing Frameworks - https://jasmine.github.io/
- Used for the automation testing of all possible functions in the JavaScript code.

##### Git/GitHub - https://github.com
- Git was used as the version control system for commiting code to a local repository and pushing the code to a remote repository (in this case GitHub).

## Testing

##### Mobile first approach and Responsive design
It is important to mention that as it was being developed with a mobile-first approach in mind, that all of the css is aimed at the smallest device which is the Iphone5/SE
with a resolution of 320x568. To improve for my next project I will make sure to include design for landscape, however this game was intended for portrait users.

Using the Bootstrap grid system and media queries I was able to extend the css to target more specific screen sizes - more specifically the standard bootstrap breakpoints.
As well as testing each new feature across all of the devices within the dev tool, I was testing the responsiveness at the the breakpoints using: min-width media queries (mobile-first).

The game/website has been testing on a variety of desktop screens and mobile devices with little to no problems after the final build was implemented. Myself, my friends and family tested the game
for bugs, which were then fixed.

The website is tested to be fully responsive with the breakpoints:
- min-width: 768px (sm)
- min-wdith: 992px (md)
- min-width: 1200px (lg)

##### Automation tesing using Jasmine Testing Frameworks
The amount of testing that could be done using Jasmine was limited as the game is very simple and require a lot of user interaction.
I was able to test: 
- That the button object exists
- That the generateSequence() function returned a number between 0 and 3
- That the generateSequence() function returned a Number type variable

The code for the testing can be found in the project repository or by clicking the link below:
[Jasmine Testing](https://github.com/MatthewHopwood/simon-random-project-2/tree/master/assets/jasmine_testing)
The proof of testing success can be found by clicking the link below:
[Jasmine Test Success](https://github.com/MatthewHopwood/simon-random-project-2/tree/master/assets/jasmine_testing/images/jasmine_test_success.jpg)

##### Some common issues I had during testing
- The padding and font size had to be reduced on some elements as screen sizes increased/decreased to fit 100% viewport height.
- The functions working incorrectly.
- User input was interfering with the functionality of the game.
- jQuery source link was not working as it should be, so had to download the min.js file which fixed the problems.
- Repeated an ID twice in HTML file so had to change one of them.
- The audio files were playing on top of one another if the user pressed the buttons quicker than 1000ms apart so used the .currentTime = 0 method.
- Jasmine testing was not working because the calc.js file contained the 'window.onload' function so had to move it to a script tag within the HTML file. The error was fixed
- because the game was no longer being loaded when the window loaded, so the 'getElementById' and 'addEventListener' methods were no longer being called.

For the final testing of my code I put both the HTML and CSS throught the W3C validators.
- https://validator.w3.org/ HTML.
- https://jigsaw.w3.org/css-validator/ CSS.

The CSS came back with no errors found.

The HTML came back with no errors found.

## Deployment

To deploy my project I used the git version control system to add my code to the staging area. I then commited the final version of my project to the local repository, finally pushing the code to the remote repository, which is located in GitHub. 

Before doing this I had to create a repository on GitHub and once I had pushed the code using git, I then used GitHub pages (gh-pages) to publish my site.

You can run this code locally by downloading the repository on GitHub - this can be done by pressing the green button that says 'Clone or download' and the select 'download as zip', then you would extract the files so they can be opened in a local IDE.

GitHub website  - https://matthewhopwood.github.io/simon-random-project-2 

## Credits
#### Content

#### Media

The sound files in this project were created the 'Audacity' software. I recorded myself playing different notes on a keyboard and cut them down to one second audio files, then exported them as an mp3 file which is supported across all browsers.

The button images used in this project were created using 'Serif Plus' which is a vector art creation package.

The background.jpg image was downloaded from 'Shutterstock.com' where I have a subscription allowing me to use the images in my work.

Below I will list the additional assets I included:

##### Images

- assets/images/background.jpg
- assets/images/blue.png
- assets/images/blue_glow.png
- assets/images/green.png
- assets/images/green_glow.png
- assets/images/red.png
- assets/images/red_glow.png
- assets/images/yellow.png
- assets/images/yellow_glow.png

##### Audio 

- assets/audio/CNote.mp3
- assets/audio/ENote.mp3
- assets/audio/highGNote.mp3
- assets/audio/lowGNote.mp3

#### Acknowledgements
The game is based off the original 'Simon' games which is a very popular memory game franchise. I used the same colors and sounds(pitch) as 2014 version of Simon called Simon Swipe.

I have created previous games (only very simple) using JavaScript and HTML5 prior to this course, so already understood a fair amount of the logic needed to create this game.

The inspiration for the general design of my website are mini-projects completed through code-institute. 

Examples of these can be found below:

- https://matthewhopwood.github.io/resume-project/
- https://matthewhopwood.github.io/bootstrap-responsive/
- https://en.wikipedia.org/wiki/Simon_(game)

I also changed some of the layout to fit better on smaller screens after receiving feedback from multiple members of the Slack community, friends and family.