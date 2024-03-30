function loadtheme() {
  document.documentElement.style.setProperty(
    "--customtheme",
    localStorage.getItem("theme") || "aqua"
  );
}

function changetheme() {
  const element = document.querySelectorAll(".themebutton");
  element.forEach((item) => {
    item.addEventListener("click", () => {
      localStorage.setItem("theme", item.textContent);
      loadtheme();
    });
  });
  loadtheme();
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

function loadgame() {
  gamestate = JSON.parse(localStorage.getItem("gamestate")) || gamestate;
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
