const gameBoard = document.querySelector("#gameboard");
const infoDisplay = document.querySelector("#info");
const startCells = [
  "", "", "", "", "", "", "", "", "",
];

let go = getRandomPlayer(); //Nejauši izvēlēts sākuma spēlētājs
infoDisplay.textContent = go === "aplis" ? "Aplis iet pirmais." : "Krusts iet pirmais.";
infoDisplay.classList.add('AplisvaiKrusts');

function getRandomPlayer() {
    const players = ["aplis", "krusts"];
    const randomIndex = Math.floor(Math.random() * players.length);
    return players[randomIndex];
}

function createBoard() {
  startCells.forEach((cell, index) => {
    const cellElement = document.createElement("div");
    cellElement.classList.add("square");
    cellElement.id = index;
    cellElement.addEventListener("click", addGo);
    gameBoard.append(cellElement);
  });
}
createBoard();

function addGo(e) {
    const goDisplay = document.createElement("div");
    goDisplay.classList.add(go);
    e.target.append(goDisplay);
    go = go === "aplis" ? "krusts" : "aplis";
    infoDisplay.textContent = "Tagad " + go + " ies.";
    infoDisplay.classList.add('glowing-text'); //mirdzošs teksta klase
    e.target.removeEventListener("click", addGo);
    checkScore();
  
    if (go === "krusts" && !infoDisplay.classList.contains("Krusts")) {
      //Datora kārta
      const emptySquares = Array.from(document.querySelectorAll(".square"))
        .filter((square) => !square.firstChild);
  
      if (emptySquares.length > 0) {
        //Aizkavē 1 sekundi
        setTimeout(() => {
          const randomIndex = Math.floor(Math.random() * emptySquares.length);
          const randomSquare = emptySquares[randomIndex];
          const computerGoDisplay = document.createElement("div");
          computerGoDisplay.classList.add("krusts");
          randomSquare.append(computerGoDisplay);
          randomSquare.removeEventListener("click", addGo);
          go = "aplis";
          infoDisplay.textContent = "Tagad " + go + " ies.";
          checkScore();
        }, 1000);
      }
    }
  }
  

function checkScore() {
  const allSquares = document.querySelectorAll(".square");
  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  let isBoardFull = true;

  winningCombos.forEach((array) => {
    const circleWins = array.every((cell) =>
      allSquares[cell].firstChild?.classList.contains("aplis")
    );

    if (circleWins) {
      infoDisplay.textContent = "Aplis uzvar!";
      infoDisplay.classList.add("Aplis");
      allSquares.forEach((square) => square.replaceWith(square.cloneNode(true)));
      return;
    }

    const crossWins = array.every((cell) =>
      allSquares[cell].firstChild?.classList.contains("krusts")
    );

    if (crossWins) {
      infoDisplay.textContent = "Krusts uzvar!";
      infoDisplay.classList.add("Krusts");
      allSquares.forEach((square) => square.replaceWith(square.cloneNode(true)));
      return;
    }
  });

  // Pārbauda, vai board ir pilns
  for (let i = 0; i < allSquares.length; i++) {
    if (!allSquares[i].firstChild) {
      isBoardFull = false;
      break;
    }
  }

  // Ja board ir pilns un nav uzvarētāja, tas ir neizšķirts
  if (isBoardFull) {
    infoDisplay.textContent = "Neizšķirts!";
    infoDisplay.classList.add("tie");
    allSquares.forEach((square) => square.replaceWith(square.cloneNode(true)));
  }
}


