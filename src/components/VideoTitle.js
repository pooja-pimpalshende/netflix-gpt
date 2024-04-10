import React from "react";

const VideoTitle = ({ title, overview }) => {
  return (
    <div className="w-screen aspect-video pt-[20%] px-12 absolute text-white bg-gradient-to-r from-black">
      <h1 className="text-5xl font-bold">{title}</h1>
      <p className="py-6 text-sm w-1/3">{overview}</p>
      <div className="flex">
        <button className="bg-white flex text-black p-2 px-8 rounded-sm text-sm hover:bg-opacity-50">
          <span className="self-center mr-1">
            <PlayIcon />
          </span>{" "}
          <span>Play</span>
        </button>
        <button className="bg-gray-500 mx-2 text-white p-2 px-10 bg-opacity-50 rounded-sm text-sm">
          More Info
        </button>
      </div>
    </div>
  );
};

const PlayIcon = () => {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5 2.69127C5 1.93067 5.81547 1.44851 6.48192 1.81506L23.4069 11.1238C24.0977 11.5037 24.0977 12.4963 23.4069 12.8762L6.48192 22.1849C5.81546 22.5515 5 22.0693 5 21.3087V2.69127Z"
        fill="currentColor"
      ></path>
    </svg>
  );
};

export default VideoTitle;
