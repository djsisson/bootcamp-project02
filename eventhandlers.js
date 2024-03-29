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

function setUpgradeActive() {
  gameobjects.upgrades.forEach((item) => {
    if (
      checkResearch(item.requiredresearch) ||
      item.requiredresearch.length == 0
    ) {
      let found = false;
      gamestate.upgrades.forEach((currentupgrades) => {
        if (currentupgrades.id == item.id) {
          found = true;
        }
      });
      if (!found) {
        let newupgrade = {
          id: item.id,
          level: 0,
        };
        gamestate.upgrades.push(newupgrade);
      }
      const element = document.querySelector(`[upgradeitem="${item.id}"`);
      if (element.getAttribute("state") == "hidden") {
        element.setAttribute("state", "active");
      }
      let currentlevel = gamestate.upgrades[item.id].level;
      console.log(currentlevel);
      if (element.getAttribute("state") == "active") {
        element.toggleAttribute(
          "disabled",
          item.levels[currentlevel].cost > gamestate.gamestats.currentscore
        );
      }
      if (element.getAttribute("state") != "completed") {
        element.textContent = `${item.name} ${currentlevel + 1} cost: ${
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

function refreshInventory() {
  document.querySelector(".currentcounter").textContent =
    gamestate.gamestats.currentscore;
    saveGame();
}

function checkCost(obj) {}
