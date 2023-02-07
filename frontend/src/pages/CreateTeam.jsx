import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import PokeCard from "@components/PokeCard";
import Loading from "@components/Loading";
import { GiShield } from "react-icons/gi";

import { AuthContext } from "../context/AuthContext";

export default function CreateTeam() {
  const { userId, teamRefresh, setTeamRefresh, userPoke1 } =
    useContext(AuthContext);
  const [teamOffer, setTeamOffer] = useState([]);
  const [teamSelect, setTeamSelect] = useState([]);
  const [renderSelect, setRenderSelect] = useState(false);
  const [validated, setValidated] = useState(false);
  const [teamLoading, setTeamLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      const response = await axios.get(`/pokemons`);

      if (response.data) {
        setTeamOffer(response.data);
        setTeamSelect([]);
        setValidated(false);
        setTeamLoading(false);
      }
    } catch (error) {
      console.error("probleme lors de la requete");
    }
  };

  const handleValidate = async () => {
    if (teamSelect.length === 8) {
      const poke = [...teamSelect];
      try {
        const response = await axios.post(
          `/teams`,
          {
            userId,
            poke,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response) {
          setValidated(true);
          if (!userPoke1) {
            setTeamRefresh(!teamRefresh);
          }
        }
      } catch (error) {
        console.error("probleme lors de la requete");
      }
    }
  };

  const pokeClick = (pokemon) => {
    if (teamSelect.indexOf(pokemon) === -1) {
      if (teamSelect.length < 8 && teamSelect.indexOf(pokemon) === -1) {
        const pokeId = pokemon;
        const teamSelectCopy = teamSelect;
        teamSelectCopy.push(pokeId);
        setTeamSelect(teamSelectCopy);
        setRenderSelect(!renderSelect);
      }
    } else {
      const teamSelectCopy = teamSelect;
      teamSelectCopy.splice(teamSelectCopy.indexOf(pokemon), 1);
      setTeamSelect(teamSelectCopy);
      setRenderSelect(!renderSelect);
    }
  };

  const handleReset = () => {
    setTeamSelect([]);
    setRenderSelect(!renderSelect);
  };

  useEffect(() => {
    if (teamLoading) {
      handleSubmit();
    }
  }, [teamLoading]);

  if (!userId) {
    return (
      <div className="h-[80vh] bg-white">
        <div
          className="h-[10vh] flex justify-center items-center border bg-center bg-cover bg-no-repeat bg-[url('/image/banniere.png')] "
          style={{ textShadow: "1px 2px 3px blue" }}
        >
          <div className="h-[100%] w-[100%] bg-gray-500 bg-opacity-40 flex justify-center items-center">
            <h1 className="text-xs sm:text-xl lg:text-2xl font-extrabold rounded   text-yellow-400 drop-shadow-[1_5px_35px_rgba(2,41,195,0.8)]">
              Choisis les 8 pokemons que tu veux dans ton équipe <br /> Les 5
              premiers sélectionnés seront aussi dans ton équipe de défense
            </h1>
          </div>
        </div>
        <div className="h-[5vh] flex justify-center items-center border ">
          <h1 className="text-xs sm:text-xl lg:text-2xl font-extrabold rounded   text-black drop-shadow-[1_5px_35px_rgba(2,41,195,0.8)]">
            Connectez vous pour créer une équipe
          </h1>
        </div>
        <div className="h-[65vh]  px-1 flex justify-center items-center flex-wrap border bg-center bg-cover bg-no-repeat bg-[url('/image/grass.jpg')]" />
      </div>
    );
  }

  return (
    <div className="h-[80vh] bg-white">
      <div
        className="h-[10vh] flex justify-center items-center border bg-center bg-cover bg-no-repeat bg-[url('/image/banniere.png')] "
        style={{ textShadow: "1px 2px 3px blue" }}
      >
        <div className="h-[100%] w-[100%] bg-gray-500 bg-opacity-40 flex justify-center items-center">
          <h1 className="text-xs sm:text-xl lg:text-2xl font-extrabold rounded   text-yellow-400 drop-shadow-[1_5px_35px_rgba(2,41,195,0.8)]">
            Choisis les 8 pokemons que tu veux dans ton équipe <br /> Les 5
            premiers sélectionnés seront aussi dans ton équipe de défense
          </h1>
        </div>
      </div>
      <div className="h-[5vh] flex justify-center items-center rounded-xl border-4 border-[rgba(188,188,188,255)]    bg-[rgba(194,217,173,255)]">
        <div className="h-[100%] w-[100%] flex justify-center items-center border border-black rounded-xl">
          <div className="h-[100%] w-[100%] flex justify-between items-center ">
            <img
              src="/image/pokeball.png"
              alt="pokeball"
              className="max-h-[100%] "
            />
            {!teamLoading ? (
              <button
                type="button"
                onClick={handleSubmit}
                className="inline-flex items-center max-h-[80%] px-6 py-2 md:py-3 border-2 border-double border-black shadow-sm text-sm md:text-base font-medium rounded-md text-gray-700 hover:bg-gray-600 hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
              >
                {teamOffer.length < 1 ? "Démarrer" : "Relancer le tirage"}
              </button>
            ) : (
              <Loading />
            )}
            {teamOffer.length > 0 && (
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center max-h-[80%] px-6 py-2 md:py-3 border-2 border-double border-black shadow-sm text-sm md:text-base font-medium rounded-md text-gray-700 hover:bg-gray-600 hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
              >
                Désélectionner
              </button>
            )}
            <img
              src="/image/pokeball.png"
              alt="pokeball"
              className="max-h-[100%] "
            />
          </div>
        </div>
      </div>
      <div className="h-[60vh]  px-1 flex justify-center items-center flex-wrap border bg-center bg-cover bg-no-repeat bg-[url('/image/grass.jpg')]">
        {teamOffer.length > 0 ? (
          teamOffer.map((pokemon) => {
            return (
              <button
                key={pokemon.id}
                type="button"
                onClick={() => pokeClick(pokemon.id)}
                className=" mx-auto relative w-[24%] h-[30%] max-h-[30%] rounded bg-center bg-cover bg-no-repeat bg-[url('/image/flash.png')]"
                style={{
                  border: teamSelect.indexOf(pokemon.id) !== -1 && `solid red`,
                }}
              >
                <PokeCard pokeInfo={pokemon} />
                <div
                  className="absolute h-[30%] w-[20%] top-[50%] left-[10%] flex items-end"
                  style={{ textShadow: "1px 2px 3px black" }}
                >
                  {teamSelect.indexOf(pokemon.id) !== -1 && (
                    <>
                      <p className="text-4xl text-red-600">
                        {teamSelect.indexOf(pokemon.id) + 1}
                      </p>
                      <p className="text-gray-500">
                        {teamSelect.indexOf(pokemon.id) < 5 && <GiShield />}
                      </p>
                    </>
                  )}
                </div>
              </button>
            );
          })
        ) : (
          <>
            <div className="mx-auto relative w-[24%] h-[30%] max-h-[30%] flex items-center rounded-full">
              <img
                className="mx-auto w-auto h-auto max-h-[100%]"
                src="/image/pokeball.png"
                alt="pokeball"
              />
            </div>
            <div className="mx-auto relative w-[24%] h-[30%] max-h-[30%]  flex items-center">
              <img
                className="mx-auto w-auto h-auto max-h-[100%]"
                src="/image/pokeball.png"
                alt="pokeball"
              />
            </div>
            <div className="mx-auto relative w-[24%] h-[30%] max-h-[30%] flex items-center">
              <img
                className="mx-auto w-auto h-auto max-h-[100%]"
                src="/image/pokeball.png"
                alt="pokeball"
              />
            </div>
            <div className="mx-auto relative w-[24%] h-[30%] max-h-[30%]  flex items-center">
              <img
                className="mx-auto w-auto h-auto max-h-[100%]"
                src="/image/pokeball.png"
                alt="pokeball"
              />
            </div>
            <div className="mx-auto relative w-[24%] h-[30%] max-h-[30%]  flex items-center">
              <img
                className="mx-auto w-auto h-auto max-h-[100%]"
                src="/image/pokeball.png"
                alt="pokeball"
              />
            </div>
            <div className="mx-auto relative w-[24%] h-[30%] max-h-[30%]  flex items-center">
              <img
                className="mx-auto w-auto h-auto max-h-[100%]"
                src="/image/pokeball.png"
                alt="pokeball"
              />
            </div>
            <div className="mx-auto relative w-[24%] h-[30%] max-h-[30%]  flex items-center">
              <img
                className="mx-auto w-auto h-auto max-h-[100%]"
                src="/image/pokeball.png"
                alt="pokeball"
              />
            </div>
            <div className="mx-auto relative w-[24%] h-[30%] max-h-[30%]  flex items-center">
              <img
                className="mx-auto w-auto h-auto max-h-[100%]"
                src="/image/pokeball.png"
                alt="pokeball"
              />
            </div>
            <div className="mx-auto relative w-[24%] h-[30%] max-h-[30%]  flex items-center">
              <img
                className="mx-auto w-auto h-auto max-h-[100%]"
                src="/image/pokeball.png"
                alt="pokeball"
              />
            </div>
            <div className="mx-auto relative w-[24%] h-[30%] max-h-[30%]  flex items-center">
              <img
                className="mx-auto w-auto h-auto max-h-[100%]"
                src="/image/pokeball.png"
                alt="pokeball"
              />
            </div>
            <div className="mx-auto relative w-[24%] h-[30%] max-h-[30%]  flex items-center">
              <img
                className="mx-auto w-auto h-auto max-h-[100%]"
                src="/image/pokeball.png"
                alt="pokeball"
              />
            </div>
            <div className="mx-auto relative w-[24%] h-[30%] max-h-[30%]  flex items-center">
              <img
                className="mx-auto w-auto h-auto max-h-[100%]"
                src="/image/pokeball.png"
                alt="pokeball"
              />
            </div>
          </>
        )}
      </div>
      <div className="h-[5vh] flex justify-center items-center rounded-xl border-4 border-[rgba(188,188,188,255)]    bg-[rgba(194,217,173,255)]">
        <div className="h-[100%] w-[100%] flex justify-center items-center border border-black rounded-xl">
          <div className="h-[100%] w-[100%] flex justify-between items-center ">
            <img
              src="/image/pokeball.png"
              alt="pokeball"
              className="max-h-[100%] "
            />
            {!validated ? (
              <button
                type="button"
                onClick={handleValidate}
                className={`inline-flex ${
                  teamSelect.length !== 8 && "hidden"
                }  items-center max-h-[80%] px-6 py-2 md:py-3 border-2 border-double border-black shadow-sm text-sm md:text-base font-medium rounded-md text-gray-700 hover:bg-gray-600 hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black`}
              >
                Valider
              </button>
            ) : (
              <Link
                to="/"
                className="inline-block bg-yellow-400 px-2 border-2 border-double  border-amber-600 rounded-md text-sm md:text-base font-medium text-blue-800 hover:bg-indigo-50"
              >
                Combattre
              </Link>
            )}
            <img
              src="/image/pokeball.png"
              alt="pokeball"
              className="max-h-[100%] "
            />
          </div>
        </div>
      </div>
    </div>
  );
}
