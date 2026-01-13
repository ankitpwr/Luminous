import { create } from "zustand";
import type { StateCreator } from "zustand";
import { Colors, type ColorValue } from "@/lib/styletypes";

interface SettingState {
  sidebar: boolean;
  color: ColorValue;
}

interface SettingAction {
  setSidebar: (sidebar: boolean) => void;
  setColor: (color: ColorValue) => void;
}

type SettingStoreType = SettingState & SettingAction;

const SettingStore: StateCreator<SettingStoreType> = (set) => ({
  sidebar: false,
  color: Colors.Grey,

  setSidebar: (sidebar: boolean) => set({ sidebar: sidebar }),
  setColor: (color: ColorValue) => set({ color: color }),
});

const useSettingStore = create<SettingStoreType>(SettingStore);
export default useSettingStore;
