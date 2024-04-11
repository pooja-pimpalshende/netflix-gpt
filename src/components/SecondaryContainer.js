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
  return (
    movies && (
      <div className="bg-black">
        <div className="-mt-48 pl-12 relative z-15">
          <MovieList title={"Now Playing"} movies={movies.nowPlayingMovies} />
          <MovieList
            title={"Top Rated Movies"}
            movies={movies.topRatedMovies}
          />
          <MovieList title={"Popular Movies"} movies={movies.popularMovies} />
          <MovieList title={"Upcoming Movies"} movies={movies.upcomingMovies} />
        </div>
      </div>
    )
  );
};

export default SecondaryContainer;
