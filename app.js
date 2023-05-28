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

const resetButton = document.querySelector("#resetButton");
resetButton.addEventListener("click", resetGame);


function resetGame() {
  //Noņem visus esošos spēles elementus.
  while (gameBoard.firstChild) {
    gameBoard.firstChild.remove();
  }

  //Notīra spēles stāvokli
  startCells.forEach((cell, index) => {
    startCells[index] = "";
  });

  //Reset uz sākumu
  go = getRandomPlayer();
  infoDisplay.textContent = go === "aplis" ? "Aplis iet pirmais." : "Krusts iet pirmais.";

  //Notīra spēles rezultātu
  infoDisplay.classList.remove("Aplis", "Krusts", "tie");

  //Izveido jaunu spēli
  createBoard();
}


function addGo(e) {
  const goDisplay = document.createElement("div");
  goDisplay.classList.add(go);
  e.target.append(goDisplay);
  go = go === "aplis" ? "krusts" : "aplis";
  infoDisplay.textContent = "Tagad " + go + " ies.";
  infoDisplay.classList.add("glowing-text"); //mirdzošs teksta klase
  e.target.removeEventListener("click", addGo);
  checkScore();

  if (go === "aplis" && !isGameOver()) { //dators iet ar apli.
    // Datora kārta
    const emptySquares = Array.from(document.querySelectorAll(".square")).filter(
      (square) => !square.firstChild
    );

    if (emptySquares.length > 0) {
      // Aizkavē 1 sekundi
      setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * emptySquares.length);
        const randomSquare = emptySquares[randomIndex];
        const computerGoDisplay = document.createElement("div");
        computerGoDisplay.classList.add(go);
        randomSquare.append(computerGoDisplay);
        randomSquare.removeEventListener("click", addGo);
        go = "krusts"; //spēlētājs iet ar krustu.
        infoDisplay.textContent = "Tagad " + go + " ies.";
        checkScore();
      }, 1000);
    }
  }
  if (go === "krusts" && !isGameOver()) { //dators iet ar krustu.
    // Datora kārta
    const emptySquares = Array.from(document.querySelectorAll(".square")).filter(
      (square) => !square.firstChild
    );

    if (emptySquares.length > 0) {
      // Aizkavē 1 sekundi
      setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * emptySquares.length);
        const randomSquare = emptySquares[randomIndex];
        const computerGoDisplay = document.createElement("div");
        computerGoDisplay.classList.add(go);
        randomSquare.append(computerGoDisplay);
        randomSquare.removeEventListener("click", addGo);
        go = "aplis"; //spēlētājs iet ar apli.
        infoDisplay.textContent = "Tagad " + go + " ies.";
        checkScore();
      }, 1000);
    }
  }
}

function isGameOver() {
  return infoDisplay.classList.contains("Aplis") || infoDisplay.classList.contains("Krusts");
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
  let winner = null;

  winningCombos.forEach((combo) => {
    const [a, b, c] = combo;

    if (
      allSquares[a].firstChild &&
      allSquares[a].firstChild.classList.contains("aplis") &&
      allSquares[b].firstChild &&
      allSquares[b].firstChild.classList.contains("aplis") &&
      allSquares[c].firstChild &&
      allSquares[c].firstChild.classList.contains("aplis")
    ) {
      winner = "aplis";
    } else if (
      allSquares[a].firstChild &&
      allSquares[a].firstChild.classList.contains("krusts") &&
      allSquares[b].firstChild &&
      allSquares[b].firstChild.classList.contains("krusts") &&
      allSquares[c].firstChild &&
      allSquares[c].firstChild.classList.contains("krusts")
    ) {
      winner = "krusts";
    }
  });

  //Pārbauda, vai ir uzvarētājs.
  if (winner) {
    infoDisplay.textContent = `${winner} uzvar!`;
    infoDisplay.classList.add(winner === "aplis" ? "Aplis" : "Krusts");
    allSquares.forEach((square) => square.removeEventListener("click", addGo));
    return;
  }

  //Pārbauda, vai board ir pilns.
  for (let i = 0; i < allSquares.length; i++) {
    if (!allSquares[i].firstChild) {
      isBoardFull = false;
      break;
    }
  }

  //Ja board ir pilns un nav uzvarētāju, tas ir neizšķirts.
  if (isBoardFull) {
    infoDisplay.textContent = "Neizšķirts!";
    infoDisplay.classList.add("tie");
    allSquares.forEach((square) => square.removeEventListener("click", addGo));
  }
}








