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

function shakeasteroid() {
  const image = document.querySelector(".asteroid img");
  image.addEventListener("click", () => {
    image.classList.toggle("shake");
    gamestate.gamestats.totalclicks++;
    gamestate.gamestats.currentscore += calcdamage(gamestate.clickstats);
    refreshInventory();
    updateResearch();
    updateUpgrades();
    saveGame();
  });
}

function resetButton() {
  document.querySelector(".reset button").addEventListener("click", () => {
    localStorage.setItem("reset", "reset");
    window.location.reload();
  });
}

function resetGame() {
  if (localStorage.getItem("reset")) {
    localStorage.removeItem("gamestate");
    localStorage.removeItem("reset");
    saveGame();
  }
}

function saveGame() {
  localStorage.setItem("gamestate", JSON.stringify(gamestate));
}

function loadgame() {
  gamestate = JSON.parse(localStorage.getItem("gamestate")) || gamestate;
  loadResearch();
  loadUpgrades();
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
