document.querySelector(".reset button").addEventListener("click", () => {
  localStorage.setItem("reset", "reset");
  window.location.reload();
});

function calcdamage(obj) {
  let totaldamage = obj.baseValue;
  if (Math.random() < obj.critChance) {
    totaldamage = totaldamage * (1 + obj.critChance) * obj.critDamage;
  }
  return totaldamage;
}

function updateResearch() {
  setResearchComplete();
  setResearchActive();
  saveGame();
}

function setResearchActive() {
  gameobjects.research.forEach((item) => {
    if (
      checkResearch(item.requiredresearch) ||
      item.requiredresearch.length == 0
    ) {
      const element = document.querySelector(`[researchitem="${item.name}"`);
      if (element.getAttribute("state") == "hidden") {
        element.setAttribute("state", "active");
      }
    }
  });
}

function setResearchComplete() {
  gamestate.researched.forEach((researchComplete) => {
    const researchElement = document.querySelector(
      `[researchitem="${researchComplete}"]`
    );
    researchElement.setAttribute("state", "completed");
  });
}

function checkResearch(item) {
  let found = true;
  item.forEach((researchname) => {
    if (gamestate.researched.indexOf(researchname) == -1) {
      found = false;
    }
  });
  return found;
}
