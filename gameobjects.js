const gameobjects = {
  upgrades: [
    {
      name: "upgrade1",
      levels: [
        { cost: 1, upgrade: { item: "click", value: 1 } },
        { cost: 5, upgrade: { item: "click", value: 5 } },
        { cost: 10, upgrade: { item: "click", value: 10 } },
      ],
    },
    {
      name: "upgrade2",
      levels: [
        { cost: 10, upgrade: { item: "clickpersecond", value: 1 } },
        { cost: 50, upgrade: { item: "clickpersecond", value: 5 } },
        { cost: 100, upgrade: { item: "clickpersecond", value: 10 } },
      ],
    },
    {
      name: "upgrade3",
      levels: [
        { cost: 100, upgrade: { item: "click", value: 10 } },
        { cost: 500, upgrade: { item: "click", value: 50 } },
        { cost: 1000, upgrade: { item: "click", value: 100 } },
      ],
    },
  ],
  research: [
    { name: "research1", cost: 1, requireditems: [""], requiredresearch: [] },
    {
      name: "research2",
      cost: 100,
      requireditems: [""],
      requiredresearch: ["research1"],
    },
    {
      name: "research3",
      cost: 10000,
      requireditems: [""],
      requiredresearch: ["research2"],
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
  upgrades: [
    {
      upgrade: "",
      currentlevel: 0,
    },
  ],
  inventory: [],
};
