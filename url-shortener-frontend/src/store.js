import { create } from 'zustand';
import * as api from './api';

export const useUrlStore = create((set, get) => ({
  urls: [],
  loading: false,
  error: '',

  /* async actions */
  async load() {
    set({ loading: true, error: '' });
    try {
      const list = await api.listUrls();
      set({ urls: list });
    } catch (err) {
      set({ error: err.message });
    } finally {
      set({ loading: false });
    }
  },

  async create(payload) {
    try {
      const u = await api.createUrl(payload);
      set((s) => ({ urls: [u, ...s.urls] }));
    } catch (err) {
      throw err;            // let component show toast/banner
    }
    await api.createUrl(payload);
    await get().load();
  },

  async remove(id) {
    await api.deleteUrl(id);
    set((s) => ({ urls: s.urls.filter((u) => u.id !== id) }));
    await api.deleteUrl(id);
    await get().load(); 
  },

  async updateClicks(id) {
    const clicks = await api.incClick(id);      // backend returns new count
    set((s) => ({
      urls: s.urls.map((u) =>
        u.id === id ? { ...u, clicks } : u
      ),
    }));
  },
}));
