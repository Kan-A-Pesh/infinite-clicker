import { create } from "zustand";

type SidebarType = "shop" | "forge" | null;

interface SidebarState {
  activeSidebar: SidebarType;
  setActiveSidebar: (sidebar: SidebarType) => void;
  closeSidebar: () => void;
}

export const useSidebarStore = create<SidebarState>()((set) => ({
  activeSidebar: null,
  setActiveSidebar: (sidebar) =>
    set(() => ({
      activeSidebar: sidebar,
    })),
  closeSidebar: () =>
    set(() => ({
      activeSidebar: null,
    })),
}));
