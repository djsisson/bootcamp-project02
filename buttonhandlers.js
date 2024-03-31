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
    let dmg = calcdamage(gamestate.clickstats);
    gamestate.gamestats.currentscore += dmg;
    addClickText(dmg);
    refreshScreen();
  });
}

const globalClickText = document.querySelector(".floatingclickcontainer");
const globalCpsText = document.querySelector(".floatingcpscontainer");
const globalTooltip = document.querySelector(".tooltip");

function addClickText(value, click = true) {
  const newTextElement = document.createElement("div");
  newTextElement.textContent = `+${value}`;
  newTextElement.className = "floatingclicktext";
  if (click) {
    globalClickText.appendChild(newTextElement);
    setTimeout(() => {
      globalClickText.removeChild(newTextElement);
    }, 1000);
  } else {
    globalCpsText.appendChild(newTextElement);
    setTimeout(() => {
      globalCpsText.removeChild(newTextElement);
    }, 1000);
  }
}

function resetButton() {
  document.querySelector(".reset button").addEventListener("click", () => {
    localStorage.setItem("reset", "reset");
    window.location.reload();
  });
}

function mainTimer() {
  let totaldmg = 0;
  gamestate.inventory.forEach((x) => {
    for (i = 0; i < x.quantity; i++) {
      let dmg = calcdamage(x.cps);
      gamestate.gamestats.currentscore += dmg;
      totaldmg += dmg;
    }
  });
  if (totaldmg) addClickText(totaldmg, false);
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

function displayTooltip(element, right = false) {
  let rect = element.getBoundingClientRect();
  let tooltip = globalTooltip.getBoundingClientRect();
  globalTooltip.style.top = `${rect.top}px`;
  if (right) {
    globalTooltip.style.left = `${rect.left - tooltip.width - 10}px`;
  } else {
    globalTooltip.style.left = `${rect.right + 10}px`;
  }

  globalTooltip.style.visibility = "visible";
}

function hideTooltip() {
  globalTooltip.style.visibility = "hidden";
}

function generateTooltip(obj, type) {
  switch (type) {
    case 0:
      if (gamestate.researched.findIndex((x) => x == obj.id) == -1) {
        globalTooltip.innerHTML = `<p>${obj.name}</p><p>Cost: ${obj.cost}</p>${obj.requiredtooltip}`;
      } else {
        globalTooltip.innerHTML = `<p>${obj.name}</p><p>Completed!</p>`;
      }
      break;
    case 1:
      let currentLevel = gamestate.upgrades.find((x) => x.id == obj.id).level;
      if (currentLevel == obj.levels.length) {
        globalTooltip.innerHTML = `<p>${obj.name}<\p>Completed!`;
      } else {
        globalTooltip.innerHTML = `<p>${obj.name}<\p>Cost: ${obj.levels[currentLevel].cost}`;
      }
      break;
    case 2:
      let currentQuantity = gamestate.inventory.find(
        (x) => x.id == obj.id
      ).quantity;
      if (currentQuantity == obj.max) {
        globalTooltip.innerHTML = `<p>${obj.name}<\p>Max ${currentQuantity} Permitted!`;
      } else {
        let adjustedcost = obj.cost * Math.pow(obj.multiplier, currentQuantity);
        globalTooltip.innerHTML = `<p>${obj.name}</p><p>Cost: ${adjustedcost}</p>${obj.requiredtooltip}`;
      }
      break;
    default:
  }
}

function changeName(event) {
  event.stopPropagation();
  const input = document.querySelector(".input-container");
  input.style.visibility = "visible";
  input.childNodes[1].focus();
  input.childNodes[1].select();
}

function editName() {
  gamestate.playername = document.querySelector(
    ".input-container > input"
  ).value;
  document.querySelector(".player-name > div").textContent =
    gamestate.playername;
  hideName();
}

function hideName() {
  console.log("eee");
  const input = document.querySelector(".input-container");
  document.body.removeEventListener("click", hideName);
  input.style.visibility = "hidden";
}
