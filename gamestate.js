function loadResearch() {
  const researchElement = document.querySelector(".research-items");
  gameobjects.research.forEach((item) => {
    const newResearch = document.createElement("button");
    newResearch.setAttribute("researchitem", item.id);
    newResearch.setAttribute("state", "hidden");
    newResearch.textContent = `${item.name} cost: ${item.cost}`;
    newResearch.type = "button";
    newResearch.addEventListener("click", () => {
      gamestate.researched.push(item.id);
      buyItem(item.cost);
      updateResearch();
      updateUpgrades();
      refreshInventory();
    });
    researchElement.appendChild(newResearch);
  });
}

function loadUpgrades() {
  const upgradeElement = document.querySelector(".upgrade-items");
  gameobjects.upgrades.forEach((item) => {
    const newUpgrade = document.createElement("button");
    newUpgrade.setAttribute("upgradeitem", item.id);
    newUpgrade.setAttribute("state", "hidden");
    newUpgrade.textContent = `${item.name} level: 1 cost: ${item.levels[0].cost}`;
    newUpgrade.type = "button";
    newUpgrade.addEventListener("click", () => {
      let currentupgrade = gamestate.upgrades[item.id];
      currentupgrade.level++;
      buyItem(item.levels[currentupgrade.level-1].cost);
      updateUpgrades();
      updateResearch();
      refreshInventory();
    });
    upgradeElement.appendChild(newUpgrade);
  });
}
