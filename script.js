function loadtheme() {
  document.documentElement.style.setProperty(
    "--customtheme",
    localStorage.getItem("theme") || "aqua"
  );
}

function resetGame() {
  if (localStorage.getItem("reset")) {
    localStorage.removeItem("gamestate");
    localStorage.removeItem("reset");
    saveGame();
  }
}

function refreshScreen() {
  refreshStats();
  enableOrDisable();
  refreshInventory();
  saveGame();
}

function enableOrDisable() {
  enableOrDisableResearch();
  enableOrDisableUpgrade();
  enableOrDisableShopItem();
}

function saveGame() {
  localStorage.setItem("gamestate", JSON.stringify(gamestate));
}

function playerName() {
  document.querySelector(".player-name").textContent = gamestate.playername;
}

function loadgame() {
  gamestate = JSON.parse(localStorage.getItem("gamestate")) || gamestate;
  playerName();
  loadResearch();
  loadUpgrades();
  loadShop();
}

function startgame() {
  changetheme();
  resetButton();
  resetGame();
  loadgame();
  shakeasteroid();
  refreshScreen();
  setInterval(mainTimer, 1000);
}

startgame();
