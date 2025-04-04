import { useSaveStore } from "../stores/save";

export default function Clicker() {
  const saveStore = useSaveStore();

  return (
    <div
      className="fixed inset-0"
      onClick={() => {
        saveStore.updateUnitCount(saveStore.unitCount + 1);
      }}
    ></div>
  );
}
