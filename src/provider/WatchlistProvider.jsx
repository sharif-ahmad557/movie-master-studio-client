import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthProvider";
import { toast } from "react-hot-toast";

const WatchlistContext = createContext();

const WatchlistProvider = ({ children }) => {
  const { user } = useAuth(); 
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    if (user) {
      const stored = localStorage.getItem(`watchlist_${user.uid}`);
      if (stored) setWatchlist(JSON.parse(stored));
      else setWatchlist([]);
    } else {
      setWatchlist([]);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      localStorage.setItem(`watchlist_${user.uid}`, JSON.stringify(watchlist));
    }
  }, [watchlist, user]);

  const addToWatchlist = (movie) => {
    if (watchlist.find((m) => m._id === movie._id)) {
      toast.error("Movie is already in your watchlist");
      return;
    }
    setWatchlist((prev) => [...prev, movie]);
    toast.success(`${movie.title} added to your watchlist`);
  };

  const removeFromWatchlist = (movieId) => {
    setWatchlist((prev) => prev.filter((m) => m._id !== movieId));
    toast.success("Movie removed from your watchlist");
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

export const useWatchlist = () => useContext(WatchlistContext);

export default WatchlistProvider;
