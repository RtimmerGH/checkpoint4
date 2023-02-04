import { Link } from "react-router-dom";
import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Home() {
  const { userId, setLoginModal } = useContext(AuthContext);

  return (
    <div className="bg-white h-[80vh]">
      <div
        className="h-[20vh] flex justify-center items-center border bg-center bg-cover bg-no-repeat bg-[url('/image/banniere.png')]"
        style={{ textShadow: "1px 2px 3px blue" }}
      >
        <div>
          <h1 className="text-5xl font-extrabold rounded   text-yellow-400 drop-shadow-[1_5px_35px_rgba(2,41,195,0.8)]">
            PokeBattle
          </h1>
        </div>
      </div>
      <div className="h-[20vh] flex justify-center items-center border  bg-center bg-cover bg-no-repeat bg-[url('/image/pokeban2.jpg')]">
        {userId ? (
          <Link
            to="/create-team"
            className="inline-flex items-center px-6 py-3 border border-spacing-1 text-base font-medium rounded-md shadow-sm text-blue-800 bg-yellow-400 hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Créer l'équipe
          </Link>
        ) : (
          <button
            type="button"
            onClick={() => setLoginModal(true)}
            className="inline-block bg-yellow-400 py-2 px-2 m-1 border border-spacing-1   rounded-md text-base font-medium text-blue-800  hover:bg-opacity-75"
          >
            Créer l'équipe
          </button>
        )}
      </div>
      <div className="h-[20vh] flex justify-center items-center border  bg-center bg-cover bg-no-repeat bg-[url('/image/pokeban3.png')]">
        {userId ? (
          <Link
            to="/attack"
            className="inline-flex items-center px-6 py-3 border border-spacing-1 text-base font-medium rounded-md shadow-sm text-blue-800 bg-yellow-400 hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Combattre
          </Link>
        ) : (
          <button
            type="button"
            onClick={() => setLoginModal(true)}
            className="inline-block bg-yellow-400 py-2 px-2 m-1 border border-spacing-1   rounded-md text-base font-medium text-blue-800  hover:bg-opacity-75"
          >
            Combattre
          </button>
        )}
      </div>
      <div className="h-[20vh] flex justify-center items-center border bg-center bg-cover bg-no-repeat bg-[url('/image/pokeban4.jpg')]">
        <Link
          to="/scores"
          className="inline-flex items-center px-6 py-3 border border-spacing-1 text-base font-medium rounded-md shadow-sm text-blue-800 bg-yellow-400 hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Scores
        </Link>
      </div>
    </div>
  );
}
