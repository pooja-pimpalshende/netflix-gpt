import React, { useRef } from "react";
import lang from "../utils/languageConstants";
import { useSelector } from "react-redux";
import openai from "../utils/openai";

import { API_OPTIONS } from "../utils/constants";
import { addGptMovieResults } from "../utils/gptSlice";
import { useDispatch } from "react-redux";

const GptSearchBar = () => {
  const dispatch = useDispatch();
  const langKey = useSelector((store) => store.config.lang);
  const searchText = useRef(null);

  const searchMovieTMDB = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "&include_adult=false&language=en-US&page=1",
      API_OPTIONS
    );
    const json = await data.json();
    return json.results;
  };

  const handleGptSearchClick = async () => {
    //make an api call to openai and get movie results

    const gptQuery =
      "Act as a movie Recommendation system and suggest some movies for query :" +
      searchText.current.value +
      ". Only give me names of 5 movies, comma seperated like the example result given ahead. Example Result: Gadar, Sholay, Don, Golmaal, Koi Mil Gaya";

    // const gptResults = await openai.chat.completions.create({
    //   messages: [{ role: "user", content: gptQuery }],
    //   model: "gpt-3.5-turbo",
    // });
    // const gptResults = await ollama.generate({
    //   model: "mistral",
    //   prompt: gptQuery,
    //   stream: false,
    // });
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "mistral",
        prompt: gptQuery,
        stream: false,
      }),
    };
    const response1 = await fetch(
      "http://127.0.0.1:11434/api/generate",
      requestOptions
    );
    const reader = response1.body?.getReader();
    const { value } = await reader.read();
    const decodedValue = new TextDecoder("utf-8").decode(value);

    // if (!gptResults.choices) {
    //   //TODO write error handling
    // }

    // console.log(gptResults.choices?.[0]?.message?.content);

    const { response } = JSON.parse(decodedValue);

    // const gptMovies = gptResults.choices?.[0]?.message?.content.split(",");
    const gptMovies = response.split(",").slice(0, 3);
    //we will get array of movies with comma separated
    //for each movie we will search TMDB API
    const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));
    //it will return promise for each movie as api will take some time to return result

    const tmdbResults = await Promise.all(promiseArray);

    dispatch(
      addGptMovieResults({ movieNames: gptMovies, movieResults: tmdbResults })
    );
  };

  return (
    <div className="pt-[35%] md:pt-[10%] flex justify-center">
      <form
        className="bg-black w-full md:w-1/2 grid grid-cols-12"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          type="text"
          className="p-4 m-4 col-span-9"
          placeholder={lang[langKey].gptSearchPlaceHolder}
        />
        <button
          className="col-span-3 py-2 px-4 m-4 rounded-md bg-red-700 text-white"
          onClick={handleGptSearchClick}
        >
          {lang[langKey].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
