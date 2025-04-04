import { useMemo, useState } from "react";
import { cn } from "../../lib/utils";
import { useSidebarStore } from "../../stores/sidebar";
import { Generator } from "../../types/generator";
import { useSaveStore } from "../../stores/save";
import { generateGenerator } from "../../lib/generate-generator";
export default function Forge() {
  const sidebarStore = useSidebarStore();
  const saveStore = useSaveStore();

  const [firstGenerator, setFirstGenerator] = useState<Generator | null>(null);
  const [secondGenerator, setSecondGenerator] = useState<Generator | null>(
    null
  );

  const cost = useMemo(() => {
    if (!firstGenerator || !secondGenerator) return 0;
    return firstGenerator.cost + secondGenerator.cost;
  }, [firstGenerator, secondGenerator]);

  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    if (!firstGenerator || !secondGenerator) return;
    if (saveStore.unitCount < cost) return;

    setIsGenerating(true);

    const newGenerator = await generateGenerator(
      Object.keys(saveStore.availableGenerators),
      firstGenerator,
      secondGenerator
    );

    saveStore.addGenerator({
      ...newGenerator,
      inflationCost: newGenerator.cost,
    });

    saveStore.updateUnitCount(saveStore.unitCount - cost);

    setFirstGenerator(null);
    setSecondGenerator(null);

    setIsGenerating(false);
  };

  return (
    <aside
      className={cn(
        "fixed inset-y-2 left-2 bg-gray-950/50 backdrop-blur-sm border border-gray-500/75 rounded-lg p-4 w-sm max-w-sm transition-transform duration-300 overflow-y-auto",
        sidebarStore.activeSidebar === "forge"
          ? "translate-x-0"
          : "-translate-x-[calc(100%+1rem)]"
      )}
    >
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">The forge</h1>

        <button
          className="size-8 bg-gray-800 rounded-md hover:bg-gray-700 transition-colors"
          onClick={() => sidebarStore.closeSidebar()}
        >
          X
        </button>
      </div>

      <hr className="my-4 border-gray-500/75" />

      <div className="flex gap-2 items-center justify-center">
        <div
          className={cn(
            "bg-gray-800 rounded-md hover:bg-gray-700 transition-colors size-16 flex flex-col items-center justify-center flex-1 relative group",
            firstGenerator ? "opacity-100" : "opacity-50"
          )}
          onClick={() => {
            if (firstGenerator) {
              setFirstGenerator(null);
            }
          }}
        >
          <span className="text-xl">{firstGenerator?.emojiIcon}</span>
          <span className="text-sm font-bold">{firstGenerator?.name}</span>

          {firstGenerator && (
            <button
              className="absolute top-1 right-1 rounded-md group-hover:bg-red-700 transition-colors size-4 flex items-center justify-center"
              onClick={() => setFirstGenerator(null)}
            >
              <span className="text-xs">x</span>
            </button>
          )}
        </div>

        <div
          className={cn(
            "bg-gray-800 rounded-md hover:bg-gray-700 transition-colors size-16 flex flex-col items-center justify-center flex-1 relative group",
            secondGenerator ? "opacity-100" : "opacity-50"
          )}
          onClick={() => {
            if (secondGenerator) {
              setSecondGenerator(null);
            }
          }}
        >
          <span className="text-xl">{secondGenerator?.emojiIcon}</span>
          <span className="text-sm font-bold">{secondGenerator?.name}</span>

          {secondGenerator && (
            <button
              className="absolute top-1 right-1 rounded-md group-hover:bg-red-700 transition-colors size-4 flex items-center justify-center"
              onClick={() => setSecondGenerator(null)}
            >
              <span className="text-xs">x</span>
            </button>
          )}
        </div>
      </div>

      <button
        className={cn(
          "bg-blue-800 rounded-md hover:bg-blue-700 transition-colors w-full py-2 text-white font-bold mt-2",
          (!firstGenerator ||
            !secondGenerator ||
            isGenerating ||
            saveStore.unitCount < cost) &&
            "opacity-50 pointer-events-none"
        )}
        onClick={handleGenerate}
        disabled={isGenerating || saveStore.unitCount < cost}
      >
        {isGenerating ? "Generating..." : `Merge ${cost ? `(${cost}u)` : ""}`}
      </button>

      <h2 className="text-lg font-bold mt-4">
        Select {firstGenerator ? "second" : "first"} generator
      </h2>

      <div className="mt-4 flex flex-col gap-2">
        {Object.values(saveStore.availableGenerators).map((generator) => (
          <div
            key={generator.name}
            className="bg-gray-800 rounded-md hover:bg-gray-700 transition-colors p-2 flex gap-2 items-center"
            onClick={() => {
              if (firstGenerator) {
                setSecondGenerator(generator);
              } else {
                setFirstGenerator(generator);
              }
            }}
          >
            <span>{generator.emojiIcon}</span>
            <div className="flex flex-col">
              <span>{generator.name}</span>
              <span className="text-xs text-gray-400">
                {generator.description}
              </span>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}
