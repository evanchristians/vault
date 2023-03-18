import { type NextPage } from "next";
import { type ReactNode, useState, useEffect, useRef } from "react";
import { FaDiceD20 } from "react-icons/fa";
import { roll, type RollResult } from "~/lib/roll";
import { timeAgo } from "~/lib/time";

import { useAtom, useAtomValue } from "jotai";
import { atomWithStorage } from "jotai/utils";

const commandAtom = atomWithStorage<string>("command", "");
const rollsAtom = atomWithStorage<RollResult[]>("rolls", []);

const SideBar = ({ children }: { children: ReactNode }) => {
  return (
    <aside className="flex h-full w-full max-w-md p-2 sm:p-5 sm:pl-0">
      <div className="relative flex grow flex-col gap-2 overflow-hidden rounded-xl border border-white/5 bg-base p-4">
        {children}
      </div>
    </aside>
  );
};

const RollDisplay = ({ roll }: { roll: RollResult }) => {
  return (
    <li className="flex items-start gap-2 rounded bg-card p-2">
      <div className="flex flex-col items-start gap-2">
        <span className="rounded bg-primary px-1 py-0.5 text-xs">
          {roll.command}
        </span>
        <span className="font-mono">
          {roll.commands.join(" ")} ={" "}
          <span className="rounded bg-secondary px-1.5 py-0.5 font-semibold">
            {roll.result}
          </span>
        </span>
      </div>
      <p className="ml-auto text-xs text-white/50 shrink-0">{timeAgo(roll.rolledAt)}</p>
    </li>
  );
};

const RollInput = () => {
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
const Home: NextPage = () => {
  const rolls = useAtomValue(rollsAtom);
  const bottomRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView();
  }, [rolls]);

  return (
    <div className="fixed inset-0 flex h-screen">
      <div className="hidden grow p-5 sm:flex">
        <div className="grow rounded-xl border border-white/5 bg-base">
          <header className="flex items-center gap-2 border-b border-white/5 py-2 px-4">
            <h1 className="text-2xl font-semibold">Vault</h1>
          </header>
        </div>
      </div>
      <SideBar>
        <header className="absolute top-0 left-0 flex w-full items-center gap-2 border-b border-white/5 bg-base/50 py-2 px-5 backdrop-blur">
          <FaDiceD20 className="text-lg text-secondary" />
          <h2 className="text-2xl font-semibold">Rolls</h2>
        </header>
        <ul className="no-scrollbar flex h-full flex-col gap-2 overflow-y-scroll py-14">
          {rolls.map((roll, index) => (
            <RollDisplay key={index} roll={roll} />
          ))}
          <li ref={bottomRef} />
        </ul>
        <div className="absolute bottom-0 left-0 w-full border-t border-white/5 p-2 backdrop-blur">
          <RollInput />
        </div>
      </SideBar>
    </div>
  );
};

export default Home;
