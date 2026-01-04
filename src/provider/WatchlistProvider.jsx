import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthProvider"; // Fixed: Import Context directly

// Create Context
const WatchlistContext = createContext();

// Custom Hook for easy access
export const useWatchlist = () => {
  return useContext(WatchlistContext);
};

const WatchlistProvider = ({ children }) => {
  const { user } = useContext(AuthContext); // Fixed: Use useContext hook
  const [watchlist, setWatchlist] = useState([]);

  // 1. Load Watchlist from LocalStorage when User logs in
  useEffect(() => {
    if (user && user.email) {
      const stored = localStorage.getItem(`watchlist_${user.email}`);
      if (stored) {
        setWatchlist(JSON.parse(stored));
      } else {
        setWatchlist([]);
      }
    } else {
      setWatchlist([]); // Clear watchlist on logout
    }
  }, [user]);

  // 2. Save Watchlist to LocalStorage whenever it changes
  useEffect(() => {
    if (user && user.email) {
      localStorage.setItem(
        `watchlist_${user.email}`,
        JSON.stringify(watchlist)
      );
    }
  }, [watchlist, user]);

  // Add Movie Function
  const addToWatchlist = (movie) => {
    const exists = watchlist.find((m) => m._id === movie._id);
    if (exists) {
      // Movie already exists, do nothing (Toast is handled in UI)
      return;
    }
    setWatchlist((prev) => [...prev, movie]);
  };

  // Remove Movie Function
  const removeFromWatchlist = (movieId) => {
    setWatchlist((prev) => prev.filter((m) => m._id !== movieId));
  };

  const watchlistInfo = {
    watchlist,
    addToWatchlist,
    removeFromWatchlist,
  };

  return (
    <WatchlistContext.Provider value={watchlistInfo}>
      {children}
    </WatchlistContext.Provider>
  );
};

export default WatchlistProvider;
