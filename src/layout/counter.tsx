import { useSaveStore } from "../stores/save";

export default function Counter() {
  const unitCount = useSaveStore((state) => state.unitCount);

  return (
    <span className="text-9xl font-bold -z-30 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/30 select-none">
      {unitCount.toFixed(0)}
    </span>
  );
}
