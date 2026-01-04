const welcomeScreen = document.getElementById("welcome-screen");
const startButton = document.getElementById("start-button");
const choiceScreen = document.getElementById("choice-screen");
const gameScreen = document.getElementById("game-screen");
const winningScreen = document.getElementById("winning-screen");
const drawScreen = document.getElementById("draw-screen");
const resetButton = document.getElementById("reset-button");

const winningCombinations =
[
   [0, 1 , 2],
   [3, 4 , 5],
   [6, 7 , 8],
   [0, 3 , 6],
   [1, 4 , 7],
   [2, 5 , 8],
   [0, 4 , 8],
   [2, 4 , 6]
]
let boardState = ["", "", "", "", "", "", "", "", ""];
let playerSymbol = null;

/*Displays which player's turn it is*/
function updateCurrentPlayerDisplay(){
   const currentPlayerDisplay = gameScreen.querySelector("#current-player");
   currentPlayerDisplay.textContent = `Current Player: ${playerSymbol}`;
}

/* Resets the game to its initial state */
function resetGame(){
   playerSymbol = null;
   boardState = ["", "", "", "", "", "", "", "", ""];
   const cells = gameScreen.querySelectorAll(".cell");
   cells.forEach(cell => {
      cell.textContent = "";
   });
   showScreen(choiceScreen);
}

/* Shows the specified screen and hides others */
function showScreen(screen){
   [welcomeScreen, choiceScreen, gameScreen, winningScreen, drawScreen].forEach(s => {
      s.classList.remove("active");
   });
   screen.classList.add("active");
}

/* Checks if the current player has won */
function victoryCheck(){
   for(const combination of winningCombinations){
      const isWin = combination.every(
         index => boardState[index] === playerSymbol
      )
      if(isWin){
         return true;
      }
   }
   return false;
}

welcomeScreen.addEventListener("click", (event) => {
   if(event.target.id !== "start-button") {
      return;
   }

   showScreen(choiceScreen);
});

choiceScreen.addEventListener("click", (event) => {
   if(!event.target.classList.contains("choice-button")) {
      return;
   }
   playerSymbol = event.target.value;

   updateCurrentPlayerDisplay();

   showScreen(gameScreen);
});

gameScreen.addEventListener("click", (event) => {
   if(!event.target.classList.contains("cell")) {
      return;
   }

   //Extra check to ensure playerSymbol is set
   if(!playerSymbol){
      return;
   }

   if(event.target.textContent !== "") {
      return;
   }

   let index = Number(event.target.id);

   boardState[index] = playerSymbol;
   event.target.textContent = playerSymbol;
   if(victoryCheck()){
      winningScreen.querySelector("#winning-message").textContent = `Player ${playerSymbol} Wins!`;
      showScreen(winningScreen);
      return;
   }
   if(!boardState.includes("")){
      showScreen(drawScreen);
      return;
   }
   playerSymbol = playerSymbol === "X" ? "O" : "X";
   updateCurrentPlayerDisplay();
   return;
});

winningScreen.addEventListener("click", (event) => {
   if(!event.target.classList.contains("play-again-button")) {
      return;
   }

   resetGame();
});

drawScreen.addEventListener("click", (event) => {
   if(!event.target.classList.contains("play-again-button")) {
      return;
   }

   resetGame();
});

resetButton.addEventListener("click", () => {
   resetGame();
});