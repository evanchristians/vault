const range = (size: number) => [...Array(size).keys()];
const makePosOrNeg = (sign: string, value = 1) =>
  (sign === "-" ? -1 : 1) * Math.abs(value);

const performRoll = (sides: number, times: number, sign = "+") => {
  const rolls: number[] = [];
  range(times).forEach(() => {
    const roll = Math.floor(Math.random() * sides) + 1;
    rolls.push(makePosOrNeg(sign, roll));
  });
  return rolls;
};

const parseAndRoll = (roll: string, sign = "+") => {
  const times = parseInt(roll.match(/(\d+)d/)?.[1] ?? "1");
  const sides = parseInt(roll.match(/d(\d+)/)?.[1] ?? "20");
  const rolls = performRoll(sides, times, sign);

  return { times, sides, rolls, result: rolls.reduce((a, b) => a + b, 0) };
};

const sanitise = (command: string) => {
  const withoutSpecialCharacters = command.replace(/[^d\d\s\+\-]/g, "");
  const withoutMultipleSpaces = withoutSpecialCharacters.replace(/\s+/g, "");
  const withoutSpacesAroundSigns = withoutMultipleSpaces.replace(/\s(\+|-)\s/g, "$1");
  return withoutSpacesAroundSigns;
}; 

const isValid = (command: string) => {
  const endsWithNumber = !!command.match(/\d+$/);
  const startsWithNumberOrD = !!command.match(/^[d\d]/);
  return endsWithNumber && startsWithNumberOrD;
}

export const roll = (command: string) => {
  command = sanitise(command);
  if (!isValid(command)) {
    throw new Error("Invalid command");
  }
  const rollsAndModifiers = command.split(/(\+|-)/);
  const commands = [];
  const parts = [];
  let sign = "";

  for (const rollOrModifier of rollsAndModifiers) {
    const isRoll = !!rollOrModifier.match(/d\d+/);

    if (isRoll) {
      const { rolls, result, times, sides } = parseAndRoll(rollOrModifier, sign);
      parts.push(result);
      commands.push(`${sign} ${times}d${sides}(${rolls.join(", ")})`);
    } else if (rollOrModifier.match(/(\+|-)/)) {
      sign = rollOrModifier;
    } else {
      const modifier = makePosOrNeg(sign, parseInt(rollOrModifier));
      commands.push(
        `${sign} ${Math.abs(modifier)}`
      );
      parts.push(modifier);
    }
  }

  return {
    command,
    result: parts.reduce((a, b) => a + b, 0),
    parts,
    commands,
    rolledAt: new Date()
  };
};

export type RollResult = ReturnType<typeof roll>;
