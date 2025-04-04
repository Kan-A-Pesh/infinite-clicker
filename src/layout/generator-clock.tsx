import { useEffect } from "react";
import { useSaveStore } from "../stores/save";

const TICK_PER_SECOND = 100;

export default function GeneratorClock() {
  const saveStore = useSaveStore();

  useEffect(() => {
    const interval = setInterval(() => {
      const generatedUnits = Object.entries(
        saveStore.purchasedGenerators
      ).reduce((acc, [generatorName, count]) => {
        const generator = saveStore.availableGenerators[generatorName];
        return acc + (generator.unitPerSecond * count) / TICK_PER_SECOND;
      }, 0);

      saveStore.updateUnitCount(saveStore.unitCount + generatedUnits);
    }, 1000 / TICK_PER_SECOND);

    return () => clearInterval(interval);
  }, [saveStore]);

  return null;
}
