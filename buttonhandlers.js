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
      refreshScreen();
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
      const currentitem = item.levels[currentupgrade.level];
      buyItem(currentitem.cost);
      if (item.type == 0) {
        gamestate.clickstats.baseValue += currentitem.upgrade.baseValue;
        gamestate.clickstats.critChance += currentitem.upgrade.critChance;
        gamestate.clickstats.critDamage += currentitem.upgrade.critDamage;
      } else {
      }
      currentupgrade.level++;
      refreshScreen();
    });
    upgradeElement.appendChild(newUpgrade);
  });
}

function loadshop() {
  const shopElement = document.querySelector(".shop-items");
  gameobjects.shopitems.forEach((item) => {
    const newShopItem = document.createElement("button");
    newShopItem.setAttribute("shopitem", item.id);
    newShopItem.setAttribute("state", "hidden");
    newShopItem.textContent = `${item.name} cost: ${item.cost}`;
    newShopItem.type = "button";
    newShopItem.addEventListener("click", () => {
      // gamestate.researched.push(item.id);
      // buyItem(item.cost);
      refreshScreen();
    });
    shopElement.appendChild(newShopItem);
  });
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
