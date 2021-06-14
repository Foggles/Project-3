# Project 3 - Varanus
![License](https://img.shields.io/badge/License-MIT-blue)

### Contents
1. [Description](#Description)
2. [Installation](#Installation)
3. [Usage](#Usage)
4. [Future_Development](#Future_Development)
5. [Contributing](#Contributing)
6. [Links](#Links)
7. [Authors](#Authors)
8. [License](#License)

[<img src="https://res.cloudinary.com/denkxexyj/image/upload/v1623651205/varanus1_hsu8ow.png">](Home-Page)
###### Varanus Homepage, displaying basic information about the application
### Description
Varanus is a simple online turn-based combat game, similar to the old-school RPG combat systems. It allows the user to create a character, and depending on whether they pick Warrior or Wizard, their abilities in combat will change.

### Installation
Installation is not necessary to view the application as it is hosted on Heroku, with the link provided below.

### Usage
Once a user creates an account for Varanus, they will be brought to the characters screen, where the below table will be displayed. Of course, if the user has not created any characters yet their table will be empty.

[<img src="https://res.cloudinary.com/denkxexyj/image/upload/v1623651204/varanus2_vbda8s.png">](Characters)
###### Table of the User's Characters

When the user clicks the create character button (top-left), the modal displayed below will appear. Here, the user can select options for their character - though the only option that effects gameplay is the class. The first two options are for the Fantasy Content Generator API, however the API itself is broken so the character's race is often incorrectly saved in the key generated.

[<img src="https://res.cloudinary.com/denkxexyj/image/upload/v1623651204/varanus3_hwyxaf.png">](Modal)
###### Character Creation Modal

Once a user creates a character, they can enter combat with that character against a randomly selected enemy. As you can see in the image below, the character's four abilities are displayed with their potential damage listed below the ability's name. For both the user character & the enemy, the red bar is their health bar. The blue bar is currently not in use.

Once the user presses the "START GAME" button, the system will randomly select for either the enemy or the player to go first. If it is the enemy's turn, the enemy will randomly select one of it's abilities to use against the user. If it is the user's turn, the four ability button will activate, allowing the user to select one to use.

[<img src="https://res.cloudinary.com/denkxexyj/image/upload/v1623651204/varanus4_arou74.png">](Combat)
###### Combat Screen
Once either the player or the enemy has reached zero health, the game is over and the message "You Win!" or "You Lose!" is displayed depending on whether the user wins or not.

[<img src="https://res.cloudinary.com/denkxexyj/image/upload/v1623651204/varanus5_uhtlzf.png">](Victory)
###### Victory over the Ghoul

### Future_Development
* More Enemies, Classes, Abilities.
* Faction and race of characters having an effect on the game.
* Utilising the “Mana Bar (blue bar)” as well as having Ability Usage limits implemented.
* Utilising the types of Enemies & Abilities.
* Layout, look of pages/components, etc.
* Implementing sounds, animations & sprites.
* Research into phaser.io for possible remake of project using a system purpose-built for games.
* Research into if multiplayer is possible.



### Contributing
We are currently not accepting any contributions to this project, but this may change in the future.
### Links
GitHub Repostiroy: https://github.com/Foggles/Project-3

Heroku Deployment: https://varanus-project3.herokuapp.com

### Authors
Jack: https://github.com/Foggles

### License
Copyright 2021 Backend-Warriors

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

##### [Back to Top](#Contents)