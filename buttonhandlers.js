function addResearchToGame(researchObj, researchElement) {
  gamestate.researched.push(researchObj.id);
  researchElement.toggleAttribute("complete");
  researchElement.toggleAttribute("disabled");
  checkForUnlockedResearch();
  checkForUnlockedUpgrades();
  checkForUnlockedShopItem();
  buyItem(researchObj.cost, researchObj.requireditems);
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
  const currentitem = upgradeObj.levels[currentUpgrade.level - 1];
  if (upgradeObj.type == 0) {
    gamestate.clickstats.baseValue += currentitem.upgrade.baseValue;
    gamestate.clickstats.critChance += currentitem.upgrade.critChance;
    gamestate.clickstats.critDamage += currentitem.upgrade.critDamage;
  } else if (upgradeObj.type == 1) {
    const invenItem = gamestate.inventory.find(
      (x) => x.id == upgradeObj.effectitemid
    );
    invenItem.cps.baseValue += currentitem.upgrade.baseValue;
    invenItem.cps.critChance += currentitem.upgrade.critChance;
    invenItem.cps.critDamage += currentitem.upgrade.critDamage;
  }

  buyItem(upgradeObj.levels[currentUpgrade.level - 1].cost);
}

function buyShopItem(shopObj) {
  let InvenItem = gamestate.inventory.find((x) => x.id == shopObj.id);
  InvenItem.quantity++;
  buyItem(
    shopObj.cost * Math.pow(shopObj.multiplier, InvenItem.quantity - 1),
    shopObj.requireditems
  );
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

function mainTimer() {
  gamestate.inventory.forEach((x) => {
    for (i = 0; i < x.quantity; i++) {
      gamestate.gamestats.currentscore += calcdamage(x.cps);
    }
  });
  refreshScreen();
}

function changetheme() {
  const element = document.querySelectorAll(".themebutton");
  element.forEach((item) => {
    item.addEventListener("click", () => {
      localStorage.setItem("theme", item.textContent);
      loadtheme();
    });
    item.style.color = item.textContent;
  });
  loadtheme();
}
