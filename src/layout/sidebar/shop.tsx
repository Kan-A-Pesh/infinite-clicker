import { cn } from "../../lib/utils";
import { useSaveStore } from "../../stores/save";
import { useSidebarStore } from "../../stores/sidebar";

export default function Shop() {
  const saveStore = useSaveStore();
  const sidebarStore = useSidebarStore();

  return (
    <aside
      className={cn(
        "fixed inset-y-2 left-2 bg-gray-950/50 backdrop-blur-sm border border-gray-500/75 rounded-lg p-4 w-sm max-w-sm transition-transform duration-300 overflow-y-auto",
        sidebarStore.activeSidebar === "shop"
          ? "translate-x-0"
          : "-translate-x-[calc(100%+1rem)]"
      )}
    >
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">The shop</h1>

        <button
          className="size-8 bg-gray-800 rounded-md hover:bg-gray-700 transition-colors"
          onClick={() => sidebarStore.closeSidebar()}
        >
          X
        </button>
      </div>

      <hr className="my-4 border-gray-500/75" />

      <div className="flex flex-col gap-4">
        {Object.values(saveStore.availableGenerators).map((generator) => (
          <button
            key={generator.name}
            onClick={() => {
              if (saveStore.unitCount < generator.inflationCost) return;
              saveStore.purchaseGenerator(generator);
              saveStore.updateUnitCount(
                saveStore.unitCount - generator.inflationCost
              );
              saveStore.updateGeneratorCost(
                generator.name,
                Math.round(generator.inflationCost * 1.1)
              );
            }}
            className={cn(
              "flex items-center p-2 gap-2 rounded-md bg-gray-800/50 text-left",
              saveStore.unitCount < generator.inflationCost
                ? "opacity-25"
                : "cursor-pointer"
            )}
          >
            <span className="text-xl">{generator.emojiIcon}</span>
            <div className="flex flex-col flex-1 me-2">
              <span className="text-sm">
                {generator.name}{" "}
                {saveStore.purchasedGenerators[generator.name] && (
                  <span className="text-xs bg-gray-800 rounded-md px-1.5 text-gray-400">
                    x{saveStore.purchasedGenerators[generator.name]}
                  </span>
                )}
              </span>
              <span className="text-xs text-gray-400">
                {generator.description}
              </span>
            </div>

            <div className="flex flex-col items-end gap-1">
              <span className="text-sm px-2 py-0.5 bg-gray-800 rounded-md">
                {generator.inflationCost}u
              </span>
              <span className="text-xs text-gray-400">
                {generator.unitPerSecond}u/s
              </span>
            </div>
          </button>
        ))}
      </div>
    </aside>
  );
}
