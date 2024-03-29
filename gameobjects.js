const gameobjects = {
  upgrades: [
    {
      id: 0,
      name: "Weapon",
      requiredresearch: [],
      type: 0,
      effectitemid: 0,
      levels: [
        {
          cost: 1,
          upgrade: {
            baseValue: 1,
            critChance: 0,
            critDamage: 0,
          },
        },
        {
          cost: 5,
          upgrade: {
            baseValue: 1,
            critChance: 0,
            critDamage: 0,
          },
        },
        {
          cost: 10,
          upgrade: {
            baseValue: 1,
            critChance: 0,
            critDamage: 0,
          },
        },
      ],
    },
    {
      id: 1,
      name: "Clones",
      requiredresearch: [0],
      levels: [
        { cost: 10, upgrade: { type: 1, value: 1 } },
        { cost: 50, upgrade: { type: 1, value: 5 } },
        { cost: 100, upgrade: { type: 1, value: 10 } },
      ],
    },
    {
      id: 2,
      name: "Crit Chance",
      requiredresearch: [1],
      type: 0,
      effectitemid: 0,
      levels: [
        {
          cost: 10,
          upgrade: {
            baseValue: 1,
            critChance: 0.1,
            critDamage: 0.2,
          },
        },
        {
          cost: 50,
          upgrade: {
            baseValue: 1,
            critChance: 0.1,
            critDamage: 0.2,
          },
        },
        {
          cost: 100,
          upgrade: {
            baseValue: 1,
            critChance: 0.1,
            critDamage: 0.2,
          },
        },
      ],
    },
    {
      id: 3,
      name: "Refining",
      requiredresearch: [2],
      levels: [
        { cost: 100, upgrade: { type: 1, value: 10 } },
        { cost: 500, upgrade: { type: 1, value: 50 } },
        { cost: 1000, upgrade: { type: 1, value: 100 } },
      ],
    },
  ],
  research: [
    {
      id: 0,
      name: "Cloning",
      cost: 1,
      requireditems: [],
      requiredresearch: [],
    },
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
    {
      id: 3,
      name: "Super Clones",
      cost: 1000,
      requireditems: [],
      requiredresearch: [2],
    },
  ],
  shopitems: [
    {
      id: 0,
      name: "Clone",
      cost: 1,
      requireditems: [""],
      requiredresearch: [0],
      cps: {
        baseValue: 0.5,
        critChance: 0,
        critDamage: 0,
      },
    },
    {
      id: 1,
      name: "Super Clone",
      cost: 10,
      requireditems: [""],
      requiredresearch: [3],
      cps: {
        baseValue: 1,
        critChance: 0.1,
        critDamage: 1,
      },
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
    critDamage: 0.5,
  },
  researched: [],
  upgrades: [{ id: 0, level: 0 }],
  inventory: [],
};
