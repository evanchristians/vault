import { atomWithStorage } from "jotai/utils";

export type CharacterJSON = {
  id: string;
  name: string;
  race: string;
  class: string;
  level: number;
  background: string;
  alignment: string;
  experience: number;
  abilityScores: {
    strength: number;
    dexterity: number;
    constitution: number;
    intelligence: number;
    wisdom: number;
    charisma: number;
  };
  inspiration: boolean;
  proficiency: number;
  armorClass: number;
  initiative: number;
  speed: number;
  hitPoints: number;
  hitDice: string;
  deathSaves: {
    successes: number;
    failures: number;
  };
  attacks: {
    name: string;
    bonus: number;
    damage: string;
  }[];
  spells: {
    name: string;
    level: number;
    school: string;
    castingTime: string;
    range: string;
    components: string;
    duration: string;
    description: string;
  }[];
  equipment: {
    name: string;
    quantity: number;
    weight: number;
  }[];
  features: {
    name: string;
    description: string;
  }[];
  personalityTraits: string;
  ideals: string;
  bonds: string;
  flaws: string;
  proficiencies: {
    armor: string[];
    weapons: string[];
    tools: string[];
    skills: string[];
    languages: string[];
  };
  money: {
    copper: number;
    silver: number;
    electrum: number;
    gold: number;
    platinum: number;
  };
  notes: string;
};

export const dummyCharacter: Omit<CharacterJSON, "id"> = {
  name: "John Doe",
  race: "Human",
  class: "Fighter",
  level: 1,
  background: "Acolyte",
  alignment: "Lawful Good",
  experience: 0,
  abilityScores: {
    strength: 10,
    dexterity: 10,
    constitution: 10,
    intelligence: 10,
    wisdom: 10,
    charisma: 10,
  },
  inspiration: false,
  proficiency: 2,
  armorClass: 10,
  initiative: 0,
  speed: 30,
  hitPoints: 10,
  hitDice: "1d10",
  deathSaves: {
    successes: 0,
    failures: 0,
  },
  attacks: [
    {
      name: "Longsword",
      bonus: 2,
      damage: "1d8 + 2",
    },
  ],
  spells: [],
  equipment: [
    {
      name: "Longsword",
      quantity: 1,
      weight: 3,
    },
  ],
  features: [],
  personalityTraits: "",
  ideals: "",
  bonds: "",
  flaws: "",
  proficiencies: {
    armor: [],
    weapons: [],
    tools: [],
    skills: [],
    languages: [],
  },
  money: {
    copper: 0,
    silver: 0,
    electrum: 0,
    gold: 0,
    platinum: 0,
  },
  notes: "",
};

export const characterAtom = atomWithStorage<CharacterJSON | null>(
  "character",
  null
);
