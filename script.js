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
    document.querySelector(".currentcounter").textContent =
      gamestate.gamestats.currentscore;
    saveGame();
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
  document.querySelector(".currentcounter").textContent =
    gamestate.gamestats.currentscore;
}

function startgame() {
  changetheme();
  resetGame();
  loadgame();
  shakeasteroid();
}

startgame();
