import { type NextPage } from "next";
import { useEffect, useRef, type ReactNode } from "react";
import { FaDiceD20 } from "react-icons/fa";
import { type RollResult } from "~/lib/roll";
import { timeAgo } from "~/lib/time";

import { useAtom, useAtomValue } from "jotai";
import { Overview } from "~/components/Overview";
import { characterAtom, dummyCharacter } from "~/lib/character";
import { api } from "~/utils/api";
import { rollsAtom, RollInput } from "~/components/Roll";

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
      <p className="ml-auto shrink-0 text-xs text-white/50">
        {timeAgo(roll.rolledAt)}
      </p>
    </li>
  );
};

const ClearButton = () => {
  const [rolls, setRolls] = useAtom(rollsAtom);

  if (rolls.length === 0) {
    return null;
  }
  return (
    <button
      className="rounded border border-white/5 px-3 py-1 text-xs text-white/80 transition-all hover:bg-card hover:text-white/100"
      onClick={() => setRolls([])}
    >
      Clear
    </button>
  );
};
const Home: NextPage = () => {
  const rolls = useAtomValue(rollsAtom);
  const bottomRef = useRef<HTMLLIElement>(null);
  const [character, setCharacter] = useAtom(characterAtom);
  const { data: id } = api.auth.randomId.useQuery();

  useEffect(() => {
    if (!character && id) {
      setCharacter({
        id,
        ...dummyCharacter,
      });
    }
  }, [id, character, setCharacter]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView();
  }, [rolls]);

  return (
    <div className="fixed inset-0 flex h-screen">
      <div className="hidden grow p-5 sm:flex">
        <Overview />
      </div>
      <SideBar>
        <header className="absolute top-0 left-0 flex w-full items-center gap-2 border-b border-white/5 bg-base/30 py-2 px-5 backdrop-blur">
          <FaDiceD20 className="text-lg text-secondary" />
          <h2 className="text-2xl font-semibold">Rolls</h2>
          <div className="ml-auto">
            <ClearButton />
          </div>
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
