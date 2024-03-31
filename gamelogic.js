function calcdamage(obj) {
  let totaldamage = obj.baseValue;
  if (Math.random() < obj.critChance) {
    totaldamage = totaldamage * (obj.critDamage + 1);
  }
  return totaldamage;
}

function buyItem(cost,items=[]) {
  gamestate.gamestats.currentscore -= cost;
  gamestate.gamestats.totalspent += cost;
  items.forEach((item) => {
    let itemtoremove = gamestate.inventory.find((x) => x.id == item.id);
    itemtoremove.quantity -= item.quantity;
  })
  refreshScreen();
}

function enableOrDisableUpgrade() {
  let upgradeElements = document.querySelectorAll(
    "[upgradeitem]:not([complete])"
  );
  upgradeElements.forEach((element) => {
    let upgradeid = element.getAttribute("upgradeitem");
    let upgradeObj = gameobjects.upgrades.find((x) => x.id == upgradeid);
    let currentUpgradeLevel = gamestate.upgrades.find(
      (x) => x.id == upgradeid
    ).level;
    element.toggleAttribute(
      "disabled",
      !canBuy(upgradeObj.levels[currentUpgradeLevel].cost)
    );
  });
}

function enableOrDisableResearch() {
  //iterate through each research element that isnt complete
  let researchElements = document.querySelectorAll(
    "[researchitem]:not([complete])"
  );
  researchElements.forEach((element) => {
    let elementid = element.getAttribute("researchitem");
    let elementObj = gameobjects.research.find((x) => x.id == elementid);
    element.toggleAttribute(
      "disabled",
      !canBuy(elementObj.cost, elementObj.requireditems)
    );
  });
}

function enableOrDisableShopItem() {
  let researchElements = document.querySelectorAll("[shopitem]");
  researchElements.forEach((element) => {
    let elementid = element.getAttribute("shopitem");
    let elementObj = gameobjects.shopitems.find((x) => x.id == elementid);
    let invenquantity = gamestate.inventory.find((x) => x.id == elementid);
    if (invenquantity.quantity == elementObj.max) {
      element.textContent = `${elementObj.name} MAX (${invenquantity.quantity})`;
      element.toggleAttribute("disabled", true);
    } else {
      let adjustedcost =
        elementObj.cost *
        Math.pow(elementObj.multiplier, invenquantity.quantity);
      element.textContent = `${elementObj.name}  cost: ${adjustedcost}`;
      element.toggleAttribute(
        "disabled",
        !canBuy(adjustedcost, elementObj.requireditems)
      );
    }
  });
}

function canBuy(cost, items = []) {
  let buyItems = true;
  items.forEach((item) => {
    let invenItem = gamestate.inventory.find((x) => x.id == item.id);
    if (invenItem.quantity < item.quantity) {
      buyItems = false;
    }
  });
  if (cost > gamestate.gamestats.currentscore) {
    buyItems = false;
  }
  return buyItems;
}

function loadUpgrades() {
  loadUpgradesFromGameSave();
  checkForUnlockedUpgrades();
}

function loadResearch() {
  loadResearchFromGameSave();
  checkForUnlockedResearch();
}

function loadShop() {
  loadShopItemsFromGameSave();
  checkForUnlockedShopItem();
}

function loadUpgradesFromGameSave() {
  //iterate through gamestate upgrade and create element for each one
  gamestate.upgrades.forEach((upgradeId) => {
    let upgradeObject = gameobjects.upgrades.find((x) => x.id == upgradeId.id);
    addUpgradeElement(
      upgradeObject,
      upgradeId.level,
      upgradeId.level == upgradeObject.levels.length
    );
  });
}

function loadShopItemsFromGameSave() {
  gamestate.inventory.forEach((shopId) => {
    let ShopObject = gameobjects.shopitems.find((x) => x.id == shopId.id);
    addShopElement(ShopObject);
  });
}

function loadResearchFromGameSave() {
  //iterate through gamestate research and create element for each one
  gamestate.researched.forEach((researchId) => {
    let researchObject = gameobjects.research.find((x) => x.id == researchId);
    addResearchElement(researchObject, true);
  });
}

function checkForUnlockedUpgrades() {
  //filter out items that are already researched
  let unresearchedItems = gameobjects.upgrades.filter(
    (x) => gamestate.upgrades.findIndex((obj) => obj.id == x.id) == -1
  );
  //now filter out items where the required research is met
  unresearchedItems = unresearchedItems.filter((x) =>
    x.requiredresearch.every(
      (obj) => gamestate.researched.findIndex((i) => i == obj) != -1
    )
  );
  //add each item that is left
  unresearchedItems.forEach((x) => {
    addUpgradeElement(x, 0, false);
    gamestate.upgrades.push({ id: x.id, level: 0 });
  });
}

function checkForUnlockedShopItem() {
  //filter out items that are already researched
  let unresearchedItems = gameobjects.shopitems.filter(
    (x) => gamestate.inventory.findIndex((obj) => obj.id == x.id) == -1
  );
  //now filter out items where the required research is met
  unresearchedItems = unresearchedItems.filter((x) =>
    x.requiredresearch.every(
      (obj) => gamestate.researched.findIndex((i) => i == obj) != -1
    )
  );
  //add each item that is left
  unresearchedItems.forEach((x) => {
    addShopElement(x);
    gamestate.inventory.push({ id: x.id, quantity: 0, cps: x.cps });
  });
}

function checkForUnlockedResearch() {
  //filter out items that are already researched
  let unresearchedItems = gameobjects.research.filter(
    (x) => gamestate.researched.findIndex((obj) => obj == x.id) == -1
  );
  //now filter out items where the required research is met
  unresearchedItems = unresearchedItems.filter((x) =>
    x.requiredresearch.every(
      (obj) => gamestate.researched.findIndex((i) => i == obj) != -1
    )
  );
  //add each item that is left that isnt already added
  unresearchedItems.forEach((x) => {
    if (document.querySelector(`[researchitem="${x.id}"]`) === null)
      addResearchElement(x, false);
  });
}

function addUpgradeElement(upgradeObj, level, completed) {
  const upgradeItemsElement = document.querySelector(".upgrade-items");
  const newUpgradeElement = document.createElement("button");
  newUpgradeElement.setAttribute("upgradeitem", upgradeObj.id);
  if (completed) {
    newUpgradeElement.textContent = `${upgradeObj.name} Completed!`;
  } else {
    newUpgradeElement.textContent = `${upgradeObj.name} level: ${
      level + 1
    } cost: ${upgradeObj.levels[level].cost}`;
  }

  newUpgradeElement.type = "button";
  newUpgradeElement.toggleAttribute("complete", completed);
  newUpgradeElement.toggleAttribute("disabled", completed);
  newUpgradeElement.addEventListener("click", () => {
    increaseUpgrade(upgradeObj, newUpgradeElement);
  });
  upgradeItemsElement.appendChild(newUpgradeElement);
}

function addShopElement(shopObj) {
  const shopItemsElement = document.querySelector(".shop-items");
  const newShopElement = document.createElement("button");
  newShopElement.setAttribute("shopitem", shopObj.id);
  newShopElement.textContent = `${shopObj.name}  cost: ${shopObj.cost}`;
  newShopElement.type = "button";
  newShopElement.addEventListener("click", () => {
    buyShopItem(shopObj);
  });
  shopItemsElement.appendChild(newShopElement);
}

function addInventoryElement(invenObj) {
  const invenItemsElement = document.querySelector(".inventory-items");
  const newinventoryElement = document.createElement("button");
  newinventoryElement.setAttribute("inventoryitem", invenObj.id);
  let shopitem = gameobjects.shopitems.find((x) => x.id == invenObj.id);
  newinventoryElement.textContent = `${shopitem.name}  Qty: ${invenObj.quantity}`;
  newinventoryElement.type = "button";
  newinventoryElement.addEventListener("click", () => {
    //   buyShopItem(shopObj);
  });
  invenItemsElement.appendChild(newinventoryElement);
}

function addResearchElement(researchObj, completed) {
  const researchItemsElement = document.querySelector(".research-items");
  const newResearchElement = document.createElement("button");
  newResearchElement.setAttribute("researchitem", researchObj.id);
  if (completed) {
    newResearchElement.textContent = `${researchObj.name} Completed!`;
  } else {
    newResearchElement.textContent = `${researchObj.name} cost: ${researchObj.cost}`;
  }
  
  newResearchElement.type = "button";
  newResearchElement.toggleAttribute("complete", completed);
  newResearchElement.toggleAttribute("disabled", completed);
  newResearchElement.addEventListener("click", () => {
    addResearchToGame(researchObj, newResearchElement);
  });
  researchItemsElement.appendChild(newResearchElement);
}

function refreshStats() {
  const stats = gamestate.gamestats;
  document.querySelector(".currentcounter").textContent = `${Math.round(
    stats.currentscore
  )}`;
  document.querySelector(
    ".totalclicks"
  ).textContent = `Total Clicks: ${stats.totalclicks}`;
  document.querySelector(
    ".totalspent"
  ).textContent = `Total Spent: ${stats.totalspent}`;
  const clickstats = gamestate.clickstats;
  document.querySelector(
    ".currentclickvalue"
  ).textContent = `Average Click Value: ${Math.round(
    averageDamage(clickstats)
  )}`;
  document.querySelector(
    ".currentclickpersecond"
  ).textContent = `Average CPS: ${Math.round(stats.currentAveragecps)}`;
}

function averageDamage(obj) {
  return obj.baseValue * obj.critChance * obj.critDamage + obj.baseValue;
}

function refreshInventory() {
  gamestate.gamestats.currentAveragecps = 0;
  const invenItemsElement = document.querySelector(".inventory-items");
  invenItemsElement.replaceChildren();
  gamestate.inventory.forEach((x) => {
    gamestate.gamestats.currentAveragecps += averageDamage(x.cps) * x.quantity;
    if (x.quantity != 0) addInventoryElement(x);
  });
  refreshStats();
}
