import React from "react";
import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
  if (!movies) return;
  return (
    <div className="px-1">
      <h1 className="text-sm md:text-lg py-4 text-white">{title}</h1>
      {/* overflow-x-scroll was not working hence use scroll-container added it in index.css */}
      <div className="scroll-container flex ">
        <div className="flex">
          {movies?.map((movie) => (
            <MovieCard key={movie.id} posterPath={movie.poster_path} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
