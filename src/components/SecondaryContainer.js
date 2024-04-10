import React from "react";
import MovieList from "./MovieList";
import { useSelector } from "react-redux";
// {/**
//          * MovieList - Popular
//          *  - movieCard * n
//          * MovieList - Now Playing
//          * MovieList - Trending
//          * MovieList - Horror
//          */}
const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);
  console.log(movies);
  return (
    movies && (
      <div className="bg-black">
        <div className="-mt-48 pl-12 relative z-15">
          <MovieList title={"Now Playing"} movies={movies.nowPlayingMovies} />
          <MovieList title={"Trending"} movies={movies.nowPlayingMovies} />
          <MovieList title={"Popular"} movies={movies.popularMovies} />
          <MovieList
            title={"Upcoming Movies"}
            movies={movies.nowPlayingMovies}
          />
          <MovieList title={"Horror Movies"} movies={movies.nowPlayingMovies} />
        </div>
      </div>
    )
  );
};

export default SecondaryContainer;
