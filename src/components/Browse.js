import React from "react";
import Header from "./Header";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies.js";
import MainContainer from "./MainContainer.js";
import SecondaryContainer from "./SecondaryContainer.js";
import usePopularMovies from "../hooks/usePopularMovies.js";
import GptSearch from "./GptSearch.js";
import { useSelector } from "react-redux";
import useTopRatedMovies from "../hooks/useTopRatedMovies.js";
import useUpcomingMovies from "../hooks/useUpcomingMovies.js";

const Browse = () => {
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
  useNowPlayingMovies();
  usePopularMovies();
  useTopRatedMovies();
  useUpcomingMovies();
  return (
    <div>
      <Header />
      {showGptSearch ? (
        <GptSearch />
      ) : (
        // jsx expression should only have one parent there <></>
        <>
          <MainContainer />
          <SecondaryContainer />
        </>
      )}

      {/**
       * main movie container
       *  - video background
       *  - video title
       * secondary container
       *  - movielist * n
       *    - cards * n
       */}
    </div>
  );
};

export default Browse;
