import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

export default function Login({ loginModal, setLoginModal, setRegisterModal }) {
  if (!loginModal) return null;

  const {
    setUserTokenCookie,
    setUserName,
    setUserEmail,
    setUserRole,
    setUserId,
    setUserPoke1,
    setUserScore,
    setUserFightsDone,
  } = useContext(AuthContext);

  const [password, setPassword] = useState("");
  const [email, setemail] = useState("");

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const login = { email, password };
      // const { VITE_BACKEND_URL } = import.meta.env;
      // const response = await axios.post(`${VITE_BACKEND_URL}/login`, login);
      const response = await axios.post(`/login`, login);

      if (response.data.token) {
        setUserTokenCookie(response.data.token);
        setUserRole(response.data.user.admin);
        setUserName(response.data.user.name);
        setUserEmail(response.data.user.email);
        setUserId(response.data.user.id);
        setUserPoke1(response.data.user.poke1);
        setUserScore(response.data.user.score);
        setUserFightsDone(response.data.user.fights_done);
        setLoginModal(false);
      }
    } catch (error) {
      console.error("user not found");
    }
  };

  const handleChange = () => {
    setLoginModal(false);
    setRegisterModal(true);
  };

  const closeModal = (e) => {
    if (e.keyCode === 27) {
      setLoginModal(false);
    }
  };

  return (
    <div
      role="button"
      onClick={() => setLoginModal(false)}
      onKeyDown={closeModal}
      tabIndex={-1}
      className="
        fixed
        w-screen
        h-screen
        top-0
        left-0
        z-10
        bg-gray-600 
        bg-opacity-80    
        flex-grow
        flex
        flex-col        
        justify-center
        items-center    "
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        onKeyDown={null}
        tabIndex={-1}
        role="button"
        className="        
        w-full h-full
        shadow  md:w-1/2 md:auto p-10  bg-[rgba(196,42,42,255)] flex flex-col  justify-start border-2 border-black cursor-default  items-center rounded-3xl"
      >
        <div className="flex m-1 justify-around item w-[100%] ">
          <img
            src="image/connexion.png"
            alt=" titre se connecter"
            className=" max-w-[60%]"
          />
          <button
            type="button"
            className="text-red-500 px-2 max-h-10  border border-blue-700 bg-gray-700 font-normal rounded "
            onClick={() => {
              setLoginModal(false);
            }}
          >
            X
          </button>
        </div>
        <div className="w-[90%] h-[70%] bg-[rgba(188,188,188,255)] flex justify-center items-center border-2 border-black  rounded-3xl ">
          <div className="w-[90%] h-[90%] bg-[rgba(194,217,173,255)] rounded-3xl p-5 border-2 border-black">
            <form onSubmit={handleSubmit}>
              <div className="relative z-0 w-full group">
                <label
                  htmlFor="email"
                  className="block mb-1 text-sm font-medium text-gray-800"
                >
                  email
                </label>
                <input
                  type="email"
                  id="email"
                  defaultValue={email}
                  onChange={(e) => setemail(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-blue-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>

              <div className="relative z-0  w-full group">
                <label
                  htmlFor="password"
                  className="block mb-1 text-sm font-medium text-gray-800"
                >
                  Mot de passe
                </label>
                <input
                  type="password"
                  id="password"
                  defaultValue={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
              <button
                type="submit"
                className="text-gray-700 bg-gray-400 border border-blue-700 font-medium rounded-lg text-m w-full sm:w-auto mt-2 px-5 py-2.5 text-center"
              >
                Connexion
              </button>
            </form>
            <div className="text-sm font-medium text-black text-center flex flex-col items-start  mt-6 ">
              Pas de compte ?{" "}
              <div
                onClick={handleChange}
                onKeyDown={handleChange}
                role="button"
                tabIndex={0}
                className="text-gray-700 bg-gray-400 border border-blue-700 font-medium rounded-lg text-m w-full sm:w-auto mt-2 px-5 py-2.5 text-center"
              >
                S'enregistrer
              </div>
            </div>
          </div>
        </div>
        <div className="w-[100%] h-[20%] mt-2 bg-contain bg-center bg-no-repeat bg-[url('/image/pokedex_bot.png')] " />
      </div>
    </div>
  );
}
