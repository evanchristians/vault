import { useAtomValue } from "jotai";
import { characterAtom } from "~/lib/character";

export const Overview = () => {
  const character = useAtomValue(characterAtom);
  return (
    <section className="grow rounded-xl border border-white/5 bg-base">
      <header className="flex items-center gap-2 border-b border-white/5 py-2 px-4">
        <h1 className="text-2xl font-semibold">Vault</h1>
      </header>
      {character ? (
        <div className="p-4">
          <h2 className="mb-4 text-xl">
            {character.name}{" "}
            <span className="text-xs opacity-50">{character.id}</span>
          </h2>
          <h3 className="mb-1 text-sm">Ability Scores</h3>
          <hr className="mb-4 border-white/10" />
          <ul className="grid grid-cols-2">
            {Object.entries(character.abilityScores).map(([key, value]) => (
              <li key={key}>
                <span className="font-semibold capitalize">{key}</span>
                <span className="text-white/50">: {value}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </section>
  );
};
