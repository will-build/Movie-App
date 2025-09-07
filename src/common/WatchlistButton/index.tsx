import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { m } from "framer-motion";
import { useWatchlist } from "@/context/watchlistContext";
import { useMotion } from "@/hooks/useMotion";
import { IMovie, IWatchlistItem } from "@/types";

interface Props {
  movie: IMovie;
  category: "movie" | "tv";
  size?: "small" | "large";
  className?: string;
}

const WatchlistButton = ({ movie, category, size = "small", className = "" }: Props) => {
  const { addItem, removeItem, isInWatchlist } = useWatchlist();
  const { zoomIn } = useMotion();
  const inWatchlist = isInWatchlist(movie.id);
  
  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (inWatchlist) {
      removeItem(movie.id);
    } else {
      const watchlistItem: IWatchlistItem = {
        id: movie.id,
        category,
        title: movie.original_title,
        name: movie.name,
        poster_path: movie.poster_path,
        overview: movie.overview,
        dateAdded: new Date().toISOString(),
      };
      addItem(watchlistItem);
    }
  };

  const iconSize = size === "large" ? "text-2xl" : "text-lg";
  const buttonSize = size === "large" ? "p-3" : "p-2";

  return (
    <m.button
      variants={zoomIn(0.8, 0.3)}
      initial="hidden"
      animate="show"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={handleToggle}
      className={`${buttonSize} rounded-full bg-black/60 dark:bg-white/20 hover:bg-black/80 dark:hover:bg-white/30 text-white transition-all duration-300 backdrop-blur-sm ${className}`}
      title={inWatchlist ? "Remove from watchlist" : "Add to watchlist"}
    >
      {inWatchlist ? (
        <AiFillHeart className={`${iconSize} text-red-500`} />
      ) : (
        <AiOutlineHeart className={iconSize} />
      )}
    </m.button>
  );
};

export default WatchlistButton;