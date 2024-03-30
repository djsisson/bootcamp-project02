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
          cost: 5,
          upgrade: {
            baseValue: 1,
            critChance: 0,
            critDamage: 0,
          },
        },
        {
          cost: 20,
          upgrade: {
            baseValue: 1,
            critChance: 0,
            critDamage: 0,
          },
        },
        {
          cost: 50,
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
      type: 1,
      effectitemid: 0,
      levels: [
        {
          cost: 10,
          upgrade: {
            baseValue: 1,
            critChance: 0,
            critDamage: 0,
          },
        },
        {
          cost: 50,
          upgrade: {
            baseValue: 1,
            critChance: 0,
            critDamage: 0,
          },
        },
        {
          cost: 100,
          upgrade: {
            baseValue: 1,
            critChance: 0,
            critDamage: 0,
          },
        },
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
          cost: 100,
          upgrade: {
            baseValue: 1,
            critChance: 0.1,
            critDamage: 0,
          },
        },
        {
          cost: 250,
          upgrade: {
            baseValue: 1,
            critChance: 0,
            critDamage: 0.5,
          },
        },
        {
          cost: 500,
          upgrade: {
            baseValue: 1,
            critChance: 0.1,
            critDamage: 0.5,
          },
        },
      ],
    },
    {
      id: 3,
      name: "Refining",
      requiredresearch: [2],
      type: 0,
      effectitemid: 0,
      levels: [
        {
          cost: 100,
          upgrade: {
            baseValue: 2,
            critChance: 0,
            critDamage: 0,
          },
        },
        {
          cost: 500,
          upgrade: {
            baseValue: 2,
            critChance: 0,
            critDamage: 0,
          },
        },
        {
          cost: 1000,
          upgrade: {
            baseValue: 2,
            critChance: 0,
            critDamage: 1,
          },
        },
      ],
    },
    {
      id: 4,
      name: "Super Clones",
      requiredresearch: [3],
      type: 1,
      effectitemid: 1,
      levels: [
        {
          cost: 10,
          upgrade: {
            baseValue: 1,
            critChance: 0,
            critDamage: 0,
          },
        },
        {
          cost: 50,
          upgrade: {
            baseValue: 1,
            critChance: 0,
            critDamage: 0,
          },
        },
        {
          cost: 100,
          upgrade: {
            baseValue: 1,
            critChance: 0.1,
            critDamage: 1,
          },
        },
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
      cost: 5,
      requireditems: [],
      max: 10,
      multiplier: 2,
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
      cost: 20,
      requireditems: [{ id: 0, quantity: 10 }],
      max: 10,
      multiplier: 3,
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
    currentAveragecps: 0,
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
