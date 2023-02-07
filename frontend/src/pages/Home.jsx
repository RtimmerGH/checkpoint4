import { Link, useNavigate } from "react-router-dom";
import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Home() {
  const { userId, setLoginModal, userPoke1 } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleNotAttack = () => {
    if (!userId) {
      setLoginModal(true);
    }
    if (!userPoke1 && userId) {
      navigate("/create-team");
    }
  };

  return (
    <div className="w-[100vw] h-[80vh] bg-center bg-cover bg-no-repeat bg-[url('/image/grass.jpg')] flex justify-center items-center">
      <div
        className="        
      w-[95%] h-[95%]
    shadow p-10  bg-[rgba(196,42,42,255)] flex flex-col  justify-start border-2 border-black cursor-default  items-center rounded-3xl"
      >
        <div className="flex m-1 justify-around item w-[100%] ">
          <img
            src="image/pokebattle.png"
            alt=" titre PokeBattle"
            className=" max-w-[60%]"
          />
        </div>
        <div className="w-[90%] h-[60%] bg-[rgba(188,188,188,255)] flex justify-center items-center border-2 border-black  rounded-3xl ">
          <div className="w-[90%] h-[90%] bg-[rgba(194,217,173,255)] rounded-3xl p-5 border-2 border-black ">
            <div className="h-[10vh] flex justify-center items-center">
              {userId ? (
                <Link
                  to="/create-team"
                  className="inline-flex items-center px-6 py-3 border-2 border-double border-black shadow-sm text-base font-medium rounded-md text-gray-700 hover:bg-gray-600 hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                >
                  Créer l'équipe
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={() => setLoginModal(true)}
                  className="inline-flex items-center px-6 py-3 border-2 border-double border-black shadow-sm text-base font-medium rounded-md text-gray-700 hover:bg-gray-600 hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                >
                  Créer l'équipe
                </button>
              )}
            </div>
            <div className="h-[10vh] flex justify-center items-center ">
              {userId && userPoke1 ? (
                <Link
                  to="/attack"
                  className="inline-flex items-center px-6 py-3 border-2 border-double border-black shadow-sm text-base font-medium rounded-md text-gray-700 hover:bg-gray-600 hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                >
                  Combattre
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={() => handleNotAttack()}
                  className="inline-flex items-center px-6 py-3 border-2 border-double border-black shadow-sm text-base font-medium rounded-md text-gray-700 hover:bg-gray-600 hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                >
                  Combattre
                </button>
              )}
            </div>
            <div className="h-[10vh] flex justify-center items-center">
              <Link
                to="/scores"
                className="inline-flex items-center px-6 py-3 border-2 border-double border-black shadow-sm text-base font-medium rounded-md text-gray-700 hover:bg-gray-600 hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
              >
                Scores
              </Link>
            </div>
          </div>
        </div>
        <div className="w-[100%] h-[20%] mt-2 bg-contain bg-center bg-no-repeat bg-[url('/image/pokedex_bot.png')] " />
      </div>
    </div>
  );
}
