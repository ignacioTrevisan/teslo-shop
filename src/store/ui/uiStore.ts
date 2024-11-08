import { create } from 'zustand'

type Store = {
  IsSideBarOpen: boolean,
  toogleIsSideBarState: () => void;
}

export const useUiStore = create<Store>()((set, get) => ({
  IsSideBarOpen: false,
  toogleIsSideBarState: () => {
    const currentSideBarMode = get().IsSideBarOpen;
    set({ IsSideBarOpen: !currentSideBarMode });

  }
}))
