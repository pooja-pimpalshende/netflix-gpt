import React, { useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO } from "../utils/constants";
import { toggleGptSearchVew } from "../utils/gptSlice";
import { SUPPORTED_LANGUAGES } from "../utils/constants";
import { changeLanguage } from "../utils/configSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
        navigate("/error");
      });
  };

  // need to use only once when that event happen hence useEffect
  //moved it here from body because we need this at central place in body we cannot use navigate as it not comes under appRouter
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        //cannot navigate here as it is parent component and navigate only work with child hence moving it to login.js
        navigate("/browse");
      } else {
        // User is signed out
        dispatch(removeUser());
        navigate("/");
      }
    });

    //unsubscribe when component unmount just like cleaning
    return () => unsubscribe();
  }, []);

  const handleGptSearchClick = () => {
    //Toggle gpt Search
    dispatch(toggleGptSearchVew());
  };

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };
  return (
    <div className="w-screen absolute px-8 py-2 bg-gradient-to-b from-black z-10 flex-col md:flex-row justify-between flex">
      <img className="w-44 mx-auto md:mx-0" src={LOGO} alt="logo" />
      {user && (
        <div className=" p-2 flex items-center justify-between">
          {showGptSearch && (
            <select
              className="p-1.5 bg-slate-900 text-white"
              onChange={handleLanguageChange}
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.identifier} value={lang.identifier}>
                  {lang.name}
                </option>
              ))}
            </select>
          )}
          <button
            className="py-1.5 px-2 mx-2 my-2 bg-blue-400 rounded-lg"
            onClick={handleGptSearchClick}
          >
            {showGptSearch ? "Home" : "GPT Search"}
          </button>
          <img
            className="hidden md:block w-10 h-10 m-1"
            alt="usericon"
            src={user?.photoURL}
          />
          <button onClick={handleSignOut} className="text-white font-bold">
            (Sign Out)
          </button>
        </div>
      )}
    </div>
  );
};
export default Header;
