import { IWatchlistItem } from "@/types";

const WATCHLIST_STORAGE_KEY = "tmovies-watchlist";

export const getWatchlist = (): IWatchlistItem[] => {
  try {
    const watchlist = localStorage.getItem(WATCHLIST_STORAGE_KEY);
    return watchlist ? JSON.parse(watchlist) : [];
  } catch (error) {
    console.error("Error loading watchlist from localStorage:", error);
    return [];
  }
};

export const saveWatchlist = (watchlist: IWatchlistItem[]): void => {
  try {
    localStorage.setItem(WATCHLIST_STORAGE_KEY, JSON.stringify(watchlist));
  } catch (error) {
    console.error("Error saving watchlist to localStorage:", error);
  }
};

export const addToWatchlist = (item: IWatchlistItem): IWatchlistItem[] => {
  const watchlist = getWatchlist();
  const existingIndex = watchlist.findIndex(watchlistItem => watchlistItem.id === item.id);
  
  if (existingIndex === -1) {
    const newWatchlist = [...watchlist, item];
    saveWatchlist(newWatchlist);
    return newWatchlist;
  }
  
  return watchlist;
};

export const removeFromWatchlist = (id: string): IWatchlistItem[] => {
  const watchlist = getWatchlist();
  const newWatchlist = watchlist.filter(item => item.id !== id);
  saveWatchlist(newWatchlist);
  return newWatchlist;
};

export const isInWatchlist = (id: string): boolean => {
  const watchlist = getWatchlist();
  return watchlist.some(item => item.id === id);
};