import { useSidebarStore } from "../../stores/sidebar";

export default function Open() {
  const sidebarStore = useSidebarStore();

  return (
    <div className="fixed left-1/2 bottom-4 -translate-x-1/2 flex gap-2">
      <button
        className="bg-gray-950/50 backdrop-blur-sm border border-gray-500/75 rounded-lg size-14 transition-transform duration-300 grid place-items-center cursor-pointer hover:bg-gray-800"
        onClick={() => sidebarStore.setActiveSidebar("shop")}
      >
        Shop
      </button>

      <button
        className="bg-gray-950/50 backdrop-blur-sm border border-gray-500/75 rounded-lg size-14 transition-transform duration-300 grid place-items-center cursor-pointer hover:bg-gray-800"
        onClick={() => sidebarStore.setActiveSidebar("forge")}
      >
        Forge
      </button>
    </div>
  );
}
