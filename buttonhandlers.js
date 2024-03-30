function addResearchToGame(researchObj, researchElement) {
  gamestate.researched.push(researchObj.id);
  researchElement.toggleAttribute("complete");
  researchElement.toggleAttribute("disabled");
  checkForUnlockedResearch();
  checkForUnlockedUpgrades();
  checkForUnlockedShopItem();
  buyItem(researchObj.cost);
}

function increaseUpgrade(upgradeObj, upgradeElement) {
  let currentUpgrade = gamestate.upgrades.find((x) => x.id == upgradeObj.id);

  currentUpgrade.level++;

  if (currentUpgrade.level == upgradeObj.levels.length) {
    upgradeElement.toggleAttribute("complete");
    upgradeElement.toggleAttribute("disabled");
    upgradeElement.textContent = `${upgradeObj.name} Completed!`;
  } else {
    upgradeElement.textContent = `${upgradeObj.name} level: ${
      currentUpgrade.level + 1
    } cost: ${upgradeObj.levels[currentUpgrade.level].cost}`;
  }
  if (upgradeObj.type == 0) {
    const currentitem = upgradeObj.levels[currentUpgrade.level - 1];
    gamestate.clickstats.baseValue += currentitem.upgrade.baseValue;
    gamestate.clickstats.critChance += currentitem.upgrade.critChance;
    gamestate.clickstats.critDamage += currentitem.upgrade.critDamage;
  }

  buyItem(upgradeObj.levels[currentUpgrade.level - 1].cost);
}

function buyShopItem(shopObj) {
  let shopItem = gamestate.inventory.find((x) => x.id == shopObj.id);
  shopItem.Quantity++;
  buyItem(shopObj.cost);
}

function shakeasteroid() {
  const image = document.querySelector(".asteroid img");
  image.addEventListener("click", () => {
    image.classList.toggle("shake");
    gamestate.gamestats.totalclicks++;
    gamestate.gamestats.currentscore += calcdamage(gamestate.clickstats);
    refreshScreen();
  });
}

function resetButton() {
  document.querySelector(".reset button").addEventListener("click", () => {
    localStorage.setItem("reset", "reset");
    window.location.reload();
  });
}

function mainTimer(){
  gamestate.inventory.forEach((x) => {
    for(i=0; i < x.Quantity; i++ ){
      gamestate.gamestats.currentscore += calcdamage(x.cps);
    }
  })
  refreshScreen();
}