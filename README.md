frontend-nanodegree-arcade-game
===============================

This game is a simplified version of the Frogger arcade game.  The little girl must cross the road without being hit by one of the bugs.  

The game starts immediately when the index.html file is loaded by the browser.  The game is currently configured to have 3 bugs.  However, this can be changed by setting the numEnemies variable in js/app.js.  The placement and speed of each bug is determined randomly at the start of each game.

The player moves the little girl by using the left, right, up, and down arrow keys.  

If the little girl collides with a bug before crossing the road, she is repositioned to her original spot and continues to try to cross the road.

If the little girl successfuly crosses the road, a pop-up is displayed announcing that player has won the game.  The player can then start a new game by hitting the ENTER key. 
