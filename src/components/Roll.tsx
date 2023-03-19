import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { useEffect, useState } from "react";
import { FaDiceD20 } from "react-icons/fa";
import { roll, type RollResult } from "~/lib/roll";

export const commandAtom = atomWithStorage<string>("command", "");
export const rollsAtom = atomWithStorage<RollResult[]>("rolls", []);

export const RollInput = () => {
  const animationDuration = 200;

  const [command, setCommand] = useAtom(commandAtom);
  const [error, setError] = useState<string | null>(null);
  const [rolls, setRolls] = useAtom(rollsAtom);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (error) {
      timeout = setTimeout(() => {
        setError(null);
      }, animationDuration);
    }
    return () => clearTimeout(timeout);
  }, [error]);

  const handleRoll = (command: string) => {
    try {
      const newRoll = roll(command);
      setRolls([...rolls, newRoll]);
    } catch (err) {
      setError((err as Error).message ?? "Unknown error");
    }
  };

  return (
    <form
      onSubmit={(evt) => {
        evt.preventDefault();
        if (command && command.length !== 0) {
          handleRoll(command);
        }
      }}
      className="flex items-center gap-2"
    >
      <input
        type="text"
        placeholder="Roll command, e.g. 1d20+5"
        value={command}
        onChange={(evt) => setCommand(evt.target.value)}
        className="w-full rounded bg-card/80 p-2 focus:outline-none"
      />
      <button
        className={`rounded bg-secondary px-3 py-2 text-white ${
          error ? "shake" : ""
        }`}
        type="submit"
      >
        <FaDiceD20 className="text-xl" />
      </button>
    </form>
  );
};
