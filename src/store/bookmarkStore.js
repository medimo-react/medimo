import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { getBookmarks, addBookmark, updateBookmark, deleteBookmark } from '../api/bookmarks';
import { mapBookmarks } from '../lib/bookmarkMappers';

const STORE_KEY = 'medimo-bookmark-store';
const LEGACY_FOLDERS_KEY = 'bookmark-folders';

const menuInitial = () => ({
  openMenuId: null,
  folderMoveId: null,
  folderMoveSelection: [],
  folderAddId: null,
  newFolderName: '',
});

const bookmarkStorage = createJSONStorage(() => ({
  getItem: (name) => {
    let str = localStorage.getItem(name);
    if (!str && name === STORE_KEY) {
      const legacy = localStorage.getItem(LEGACY_FOLDERS_KEY);
      if (legacy) {
        try {
          const arr = JSON.parse(legacy);
          if (Array.isArray(arr)) {
            str = JSON.stringify({ state: { customFolders: arr }, version: 0 });
          }
        } catch {
          /* ignore invalid legacy */
        }
      }
    }
    return str;
  },
  setItem: (name, value) => localStorage.setItem(name, value),
  removeItem: (name) => localStorage.removeItem(name),
}));

export const useBookmarkStore = create(
  persist(
    (set, get) => ({
      medicines: [],
      loading: true,
      search: '',
      selectedFolders: new Set(['전체']),
      customFolders: [],
      ...menuInitial(),

      closeMenu: () => set(menuInitial()),

      setSearch: (search) => set({ search }),

      toggleRowMenu: (medicineId) =>
        set((s) => ({
          openMenuId: s.openMenuId === medicineId ? null : medicineId,
          folderMoveId: null,
          folderMoveSelection: [],
          folderAddId: null,
          newFolderName: '',
        })),

      setFolderMoveSelection: (updater) =>
        set((s) => ({
          folderMoveSelection:
            typeof updater === 'function' ? updater(s.folderMoveSelection) : updater,
        })),

      setNewFolderName: (newFolderName) => set({ newFolderName }),

      openFolderMove: (medicine) =>
        set({
          folderMoveId: medicine.id,
          folderMoveSelection: [...medicine.folders],
        }),

      backFromFolderMove: () => set({ folderMoveId: null, folderMoveSelection: [] }),

      openFolderAdd: (medicineId) =>
        set({ folderAddId: medicineId, newFolderName: '' }),

      backFromFolderAdd: () => set({ folderAddId: null, newFolderName: '' }),

      selectFolderTab: (folder) =>
        set((s) => {
          if (folder === '전체') {
            return { selectedFolders: new Set(['전체']) };
          }
          if (s.selectedFolders.has(folder)) {
            return { selectedFolders: new Set(['전체']) };
          }
          return { selectedFolders: new Set([folder]) };
        }),

      syncFromServer: (data) => {
        if (Array.isArray(data)) {
          set({ medicines: mapBookmarks(data) });
        } else if (data?.bookmarks && Array.isArray(data.bookmarks)) {
          set({ medicines: mapBookmarks(data.bookmarks) });
        } else if (data?.id) {
          const updated = mapBookmarks([data])[0];
          set((s) => ({
            medicines: s.medicines.map((m) => (m.id === updated.id ? updated : m)),
          }));
        }
      },

      addMedicine: async (medicineId) => {
        const data = await addBookmark(medicineId);
        if (data) {
          const mapped = mapBookmarks([data])[0];
          set((s) => ({ medicines: [...s.medicines, mapped] }));
        }
      },

      fetchBookmarks: async () => {
        set({ loading: true });
        try {
          const data = await getBookmarks();
          if (Array.isArray(data)) {
            set({ medicines: mapBookmarks(data) });
          }
        } finally {
          set({ loading: false });
        }
      },

      deleteMedicine: async (medicine) => {
        get().closeMenu();
        set((s) => ({ medicines: s.medicines.filter((m) => m.id !== medicine.id) }));
        const data = await deleteBookmark(medicine.id);
        get().syncFromServer(data);
      },

      applyFolderMove: async (medicine) => {
        const { folderMoveSelection } = get();
        get().closeMenu();
        set((s) => ({
          medicines: s.medicines.map((m) =>
            m.id === medicine.id ? { ...m, folders: folderMoveSelection } : m
          ),
        }));
        const data = await updateBookmark(medicine.id, { folder: folderMoveSelection });
        get().syncFromServer(data);
      },

      addToNewFolder: () => {
        const trimmed = get().newFolderName.trim();
        if (!trimmed) return;
        const { medicines, customFolders } = get();
        const known = new Set(['전체', ...customFolders, ...medicines.flatMap((m) => m.folders)]);
        if (!known.has(trimmed)) {
          set({ customFolders: [...customFolders, trimmed] });
        }
        get().closeMenu();
      },
    }),
    {
      name: STORE_KEY,
      storage: bookmarkStorage,
      partialize: (state) => ({ customFolders: state.customFolders }),
    }
  )
);
