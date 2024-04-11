import { API_OPTIONS } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addTrailerVideo } from "../utils/moviesSlice";
import { useEffect } from "react";
import { useSelector } from "react-redux";

//fetch trailer video and updating store with trailer video data
const useMovieTrailer = (movieId) => {
  const dispatch = useDispatch();
  const trailerVideo = useSelector((store) => store.movies.trailerVideo);
  const getMovieVideo = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
      API_OPTIONS
    );
    const json = await data.json();

    const filterData = json.results.filter((video) => video.type === "Trailer");
    //if there  are no trailer then it will get first result
    const trailer = filterData.length ? filterData[1] : json.results[0];

    dispatch(addTrailerVideo(trailer));
  };
  useEffect(() => {
    if (!trailerVideo) getMovieVideo();
  }, []);
};

export default useMovieTrailer;
