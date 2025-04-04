import { useSaveStore } from "../stores/save";

export default function ResetButton() {
  const reset = useSaveStore((state) => state.reset);

  return (
    <button
      className="fixed bottom-2 right-2 px-2 py-0.5 bg-gray-800 rounded-md hover:bg-gray-700 transition-colors"
      onClick={reset}
    >
      Reset all data
    </button>
  );
}
