function calcdamage(obj) {
  let totaldamage = obj.baseValue;
  if (Math.random() < obj.critChance) {
    totaldamage = totaldamage * (obj.critDamage + 1);
  }
  return totaldamage;
}

function updateResearch() {
  setResearchComplete();
  setResearchActive();
}

function updateUpgrades() {
  setUpgradeComplete();
  setUpgradeActive();
}

function setResearchActive() {
  gameobjects.research.forEach((item) => {
    if (
      checkResearch(item.requiredresearch) ||
      item.requiredresearch.length == 0
    ) {
      const element = document.querySelector(`[researchitem="${item.id}"`);
      if (element.getAttribute("state") == "hidden") {
        element.setAttribute("state", "active");
      }
      if (element.getAttribute("state") == "active") {
        element.toggleAttribute(
          "disabled",
          item.cost > gamestate.gamestats.currentscore
        );
      }
    }
  });
}

function checkUpgradeExists(upgradetocheck) {
  let found = false;
  gamestate.upgrades.forEach((currentupgrades) => {
    if (currentupgrades.id == upgradetocheck.id) {
      found = true;
    }
  });
  if (!found) {
    let newupgrade = {
      id: upgradetocheck.id,
      level: 0,
    };
    gamestate.upgrades.push(newupgrade);
  }
}

function setUpgradeActive() {
  gameobjects.upgrades.forEach((item) => {
    if (
      checkResearch(item.requiredresearch) ||
      item.requiredresearch.length == 0
    ) {
      checkUpgradeExists(item);

      const element = document.querySelector(`[upgradeitem="${item.id}"`);
      if (element.getAttribute("state") == "hidden") {
        element.setAttribute("state", "active");
      }
      let currentlevel = gamestate.upgrades[item.id].level;
      if (element.getAttribute("state") == "active") {
        element.toggleAttribute(
          "disabled",
          item.levels[currentlevel].cost > gamestate.gamestats.currentscore
        );
      }
      if (element.getAttribute("state") != "completed") {
        element.textContent = `${item.name} Level: ${currentlevel + 1} cost: ${
          item.levels[currentlevel].cost
        }`;
      }
    }
  });
}

function setUpgradeComplete() {
  gamestate.upgrades.forEach((upgradecomplete) => {
    if (
      upgradecomplete.level ==
      gameobjects.upgrades[upgradecomplete.id].levels.length
    ) {
      const upgradeElement = document.querySelector(
        `[upgradeitem="${upgradecomplete.id}"]`
      );
      upgradeElement.setAttribute("state", "completed");
      upgradeElement.toggleAttribute("disabled", "true");
      upgradeElement.textContent = `${
        gameobjects.upgrades[upgradecomplete.id].name
      } Completed!`;
    }
  });
}

function setResearchComplete() {
  gamestate.researched.forEach((researchComplete) => {
    const researchElement = document.querySelector(
      `[researchitem="${researchComplete}"]`
    );
    researchElement.setAttribute("state", "completed");
    researchElement.toggleAttribute("disabled", "true");
    researchElement.textContent = `${gameobjects.research[researchComplete].name} Completed!`;
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

function buyItem(cost) {
  gamestate.gamestats.currentscore -= cost;
  gamestate.gamestats.totalspent += cost;
  refreshInventory();
}
function updateClick(){

}

function updateItem(){
  
}

function refreshInventory() {
  const stats = gamestate.gamestats;
  document.querySelector(
    ".currentcounter"
  ).textContent = `Current Total: ${stats.currentscore}`;
  document.querySelector(
    ".totalclicks"
  ).textContent = `Total Clicks: ${stats.totalclicks}`;
  document.querySelector(
    ".totalspent"
  ).textContent = `Total Spent: ${stats.totalspent}`;
  const clickstats = gamestate.clickstats;
  document.querySelector(
    ".currentclickvalue"
  ).textContent = `Average Click Value: ${
    clickstats.baseValue * clickstats.critChance * clickstats.critDamage +
    clickstats.baseValue
  }`;
}

function checkShopItemExists(shopItemtoCheck) {
  let found = false;
  gamestate.inventory.forEach((currentShopItem) => {
    if (currentShopItem.id == shopItemtoCheck.id) {
      found = true;
    }
  });
  if (!found) {
    let shopItem = {
      id: shopItemtoCheck.id,
      quantity: 0,
      cps: shopItemtoCheck.cps,
    };
    gamestate.inventory.push(shopItem);
  }
}

function updateShop() {
  gameobjects.shopitems.forEach((shopitem) => {
    if (
      checkResearch(shopitem.requiredresearch) ||
      shopitem.requiredresearch.length == 0
    ) {
      checkShopItemExists(shopitem);
      const element = document.querySelector(`[shopitem="${shopitem.id}"`);
      if (element.getAttribute("state") == "hidden") {
        element.setAttribute("state", "active");
      }
      if (element.getAttribute("state") == "active") {
        element.toggleAttribute(
          "disabled",
          shopitem.cost > gamestate.gamestats.currentscore
        );
      }
    }
  });
}

function checkCost(obj) {}
