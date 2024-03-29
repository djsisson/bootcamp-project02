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
  refreshInventory();
  updateResearch();
  updateUpgrades();
  updateShop();
  saveGame();
}

function saveGame() {
  localStorage.setItem("gamestate", JSON.stringify(gamestate));
}

function loadgame() {
  gamestate = JSON.parse(localStorage.getItem("gamestate")) || gamestate;
  loadResearch();
  loadUpgrades();
  loadshop();
}

function startgame() {
  changetheme();
  resetButton();
  resetGame();
  loadgame();
  updateResearch();
  updateUpgrades();
  refreshInventory();
  shakeasteroid();
}

startgame();
