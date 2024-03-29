const gameobjects = {
  upgrades: [
    {
      id: 0,
      name: "Weapon",
      requiredresearch: [],
      levels: [
        { cost: 1, upgrade: { type: "click", value: 1 } },
        { cost: 5, upgrade: { type: "click", value: 5 } },
        { cost: 10, upgrade: { type: "click", value: 10 } },
      ],
    },
    {
      id: 1,
      name: "Clones",
      requiredresearch: [0],
      levels: [
        { cost: 10, upgrade: { item: "clickpersecond", value: 1 } },
        { cost: 50, upgrade: { item: "clickpersecond", value: 5 } },
        { cost: 100, upgrade: { item: "clickpersecond", value: 10 } },
      ],
    },
    {
      id: 2,
      name: "Crit Chance",
      requiredresearch: [1],
      levels: [
        { cost: 100, upgrade: { item: "click", value: 10 } },
        { cost: 500, upgrade: { item: "click", value: 50 } },
        { cost: 1000, upgrade: { item: "click", value: 100 } },
      ],
    },
    {
      id: 3,
      name: "Refining",
      requiredresearch: [2],
      levels: [
        { cost: 100, upgrade: { item: "click", value: 10 } },
        { cost: 500, upgrade: { item: "click", value: 50 } },
        { cost: 1000, upgrade: { item: "click", value: 100 } },
      ],
    },
  ],
  research: [
    { id: 0, name: "Cloning", cost: 1, requireditems: [], requiredresearch: [] },
    {
      id: 1,
      name: "Critcal Strike",
      cost: 10,
      requireditems: [],
      requiredresearch: [0],
    },
    {
      id: 2,
      name: "Refining",
      cost: 100,
      requireditems: [],
      requiredresearch: [1],
    },
  ],
  shopitems: [
    {
      name: "shopitem1",
      cost: 10,
      requireditems: [""],
      requiredresearch: ["research1"],
      cps: {
        baseValue: 1,
        critChance: 0,
        critDamage: 0,
      },
    },
    {
      name: "shopitem2",
      cost: 100,
      requireditems: [""],
      requiredresearch: ["research2"],
    },
    {
      name: "shopitem3",
      cost: 10000,
      requireditems: [""],
      requiredresearch: ["research3"],
    },
  ],
};

let gamestate = {
  playername: "Traveller",
  gamestats: {
    currentscore: 0,
    totalclicks: 0,
    totalspent: 0,
  },
  clickstats: {
    baseValue: 1,
    critChance: 0,
    critDamage: 0,
  },
  researched: [],
  upgrades: [{id: 0, level: 0}],
  inventory: [],
};
