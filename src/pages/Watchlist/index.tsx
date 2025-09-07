import { useState } from "react";
import { m } from "framer-motion";
import { AiOutlineHeart } from "react-icons/ai";

import { MovieCard } from "@/common";
import { useWatchlist } from "@/context/watchlistContext";
import { useMotion } from "@/hooks/useMotion";
import { maxWidth, mainHeading } from "@/styles";
import { cn } from "@/utils/helper";

const Watchlist = () => {
  const { watchlist } = useWatchlist();
  const { staggerContainer, fadeDown } = useMotion();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredWatchlist = watchlist.filter((item) =>
    (item.title || item.name)?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const movies = filteredWatchlist.filter((item) => item.category === "movie");
  const tvShows = filteredWatchlist.filter((item) => item.category === "tv");

  if (watchlist.length === 0) {
    return (
      <div className={cn(maxWidth, "min-h-screen flex flex-col items-center justify-center text-center")}>
        <m.div
          variants={staggerContainer(0.2, 0.4)}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center gap-6 will-change-transform motion-reduce:transform-none"
        >
          <m.div variants={fadeDown} className="text-6xl text-gray-400 will-change-transform motion-reduce:transform-none">
            <AiOutlineHeart />
          </m.div>
          <m.h2 variants={fadeDown} className={cn(mainHeading, "text-center will-change-transform motion-reduce:transform-none")}>
            Your Watchlist is Empty
          </m.h2>
          <m.p variants={fadeDown} className="text-gray-500 max-w-md will-change-transform motion-reduce:transform-none">
            Start exploring movies and TV shows, then add them to your watchlist by clicking the heart icon.
          </m.p>
        </m.div>
      </div>
    );
  }

  return (
    <div className={cn(maxWidth, "py-8")}>
      <m.div
        variants={staggerContainer(0.2, 0.4)}
        initial="hidden"
        animate="show"
        className="will-change-transform motion-reduce:transform-none"
      >
        <m.h1 variants={fadeDown} className={cn(mainHeading, "mb-6 will-change-transform motion-reduce:transform-none")}>
          My Watchlist ({watchlist.length})
        </m.h1>

        <m.div variants={fadeDown} className="mb-8 will-change-transform motion-reduce:transform-none">
          <input
            type="text"
            placeholder="Search your watchlist..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full max-w-md px-4 py-2 rounded-lg border dark:border-gray-600 dark:bg-gray-800 dark:text-white bg-white text-black focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </m.div>

        {filteredWatchlist.length === 0 && searchQuery && (
          <m.p variants={fadeDown} className="text-gray-500 text-center py-8 will-change-transform motion-reduce:transform-none">
            No results found for "{searchQuery}"
          </m.p>
        )}

        {movies.length > 0 && (
          <m.section variants={fadeDown} className="mb-12 will-change-transform motion-reduce:transform-none">
            <h2 className="text-2xl font-bold mb-6 dark:text-white text-black">
              Movies ({movies.length})
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
              {movies.map((item) => (
                <MovieCard
                  key={item.id}
                  movie={{
                    id: item.id,
                    poster_path: item.poster_path,
                    original_title: item.title || "",
                    name: item.name || "",
                    overview: item.overview,
                    backdrop_path: item.poster_path,
                  }}
                  category="movie"
                />
              ))}
            </div>
          </m.section>
        )}

        {tvShows.length > 0 && (
          <m.section variants={fadeDown} className="will-change-transform motion-reduce:transform-none">
            <h2 className="text-2xl font-bold mb-6 dark:text-white text-black">
              TV Shows ({tvShows.length})
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
              {tvShows.map((item) => (
                <MovieCard
                  key={item.id}
                  movie={{
                    id: item.id,
                    poster_path: item.poster_path,
                    original_title: item.title || "",
                    name: item.name || "",
                    overview: item.overview,
                    backdrop_path: item.poster_path,
                  }}
                  category="tv"
                />
              ))}
            </div>
          </m.section>
        )}
      </m.div>
    </div>
  );
};

export default Watchlist;