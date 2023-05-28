const krustsButton = document.querySelector("#krusts-button");
const aplisButton = document.querySelector("#aplis-button");

krustsButton.addEventListener("click", () => {
  go = "krusts";
  startGame();
});

aplisButton.addEventListener("click", () => {
  go = "aplis";
  startGame();
});

function startGame() {
  //Reset spēli
  gameBoard.innerHTML = "";
  infoDisplay.classList.remove("Aplis", "Krusts", "tie");

  startCells.fill("");

  //Atjauno spēles displeju
  infoDisplay.textContent = go === "aplis" ? "Aplis iet pirmais." : "Krusts iet pirmais.";
  infoDisplay.classList.add("AplisvaiKrusts");

  //Izveido jaunu spēli
  createBoard();
}
