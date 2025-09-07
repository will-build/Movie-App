import React, { useContext, useState, useEffect, useCallback } from "react";
import { IWatchlistItem } from "@/types";
import { getWatchlist, addToWatchlist, removeFromWatchlist, isInWatchlist } from "@/utils/watchlist";

interface WatchlistContextValue {
  watchlist: IWatchlistItem[];
  addItem: (item: IWatchlistItem) => void;
  removeItem: (id: string) => void;
  isInWatchlist: (id: string) => boolean;
  getWatchlistCount: () => number;
}

const context = React.createContext<WatchlistContextValue>({
  watchlist: [],
  addItem: () => {},
  removeItem: () => {},
  isInWatchlist: () => false,
  getWatchlistCount: () => 0,
});

interface Props {
  children: React.ReactNode;
}

const WatchlistProvider = ({ children }: Props) => {
  const [watchlist, setWatchlist] = useState<IWatchlistItem[]>([]);

  useEffect(() => {
    const initialWatchlist = getWatchlist();
    setWatchlist(initialWatchlist);
  }, []);

  const addItem = useCallback((item: IWatchlistItem) => {
    const newWatchlist = addToWatchlist(item);
    setWatchlist(newWatchlist);
  }, []);

  const removeItem = useCallback((id: string) => {
    const newWatchlist = removeFromWatchlist(id);
    setWatchlist(newWatchlist);
  }, []);

  const checkIsInWatchlist = useCallback((id: string) => {
    return isInWatchlist(id);
  }, []);

  const getWatchlistCount = useCallback(() => {
    return watchlist.length;
  }, [watchlist.length]);

  return (
    <context.Provider
      value={{
        watchlist,
        addItem,
        removeItem,
        isInWatchlist: checkIsInWatchlist,
        getWatchlistCount,
      }}
    >
      {children}
    </context.Provider>
  );
};

export default WatchlistProvider;

export const useWatchlist = () => {
  return useContext(context);
};