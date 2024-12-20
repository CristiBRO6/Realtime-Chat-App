import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useSidebarStore = create(
  persist(
    (set) => ({
      open: false,
      setOpen: (open) => set({ open })
    }),
    {
      name: 'sidebar-storage',
    }
  )
);