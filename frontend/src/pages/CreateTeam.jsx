import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import PokeCard from "@components/PokeCard";
import { GiShield } from "react-icons/gi";

import { AuthContext } from "../context/AuthContext";

export default function CreateTeam() {
  const { userId } = useContext(AuthContext);
  const [teamOffer, setTeamOffer] = useState([]);
  const [teamSelect, setTeamSelect] = useState([]);
  const [renderSelect, setRenderSelect] = useState(false);
  const [validated, setValidated] = useState(false);

  const handleSubmit = async () => {
    try {
      const response = await axios.get(`/pokemons`);

      if (response.data) {
        setTeamOffer(response.data);
        setTeamSelect([]);
        setValidated(false);
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

  return (
    <div className="h-[80vh] bg-white">
      <div
        className="h-[10vh] flex justify-center items-center border bg-center bg-cover bg-no-repeat bg-[url('/image/banniere.png')] "
        style={{ textShadow: "1px 2px 3px blue" }}
      >
        <div className="h-[100%] w-[100%] bg-gray-500 bg-opacity-40 flex justify-center items-center">
          <h1 className="text-xs sm:text-xl lg:text-2xl font-extrabold rounded   text-yellow-400 drop-shadow-[1_5px_35px_rgba(2,41,195,0.8)]">
            Choisis les pokemons que tu veux dans ton équipe <br /> Les 5
            premiers sélectionnés seront aussi dans ton équipe de défense
          </h1>
        </div>
      </div>
      <div className="h-[5vh] flex justify-center items-center border bg-contain bg-repeat bg-[url('/image/flash.jpg')]">
        <div className="h-[100%] w-[100%] flex justify-center items-center border bg-contain bg-repeat bg-[url('/image/pokeball.svg')]">
          <button
            type="button"
            onClick={handleSubmit}
            className="inline-block bg-yellow-400  mx-2 px-2 border-2 border-double  border-amber-600 rounded-md text-base font-medium text-blue-800 hover:bg-indigo-50"
          >
            {teamOffer.length < 1 ? "Démarrer" : "Relancer le tirage"}
          </button>
          {teamOffer.length > 0 && (
            <button
              type="button"
              onClick={handleReset}
              className="inline-block bg-yellow-400 mx-2 px-2 border-2 border-double  border-amber-600 rounded-md text-base font-medium text-blue-800 hover:bg-indigo-50"
            >
              Désélectionner
            </button>
          )}
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
                src="/image/pokeball.svg"
                alt="pokeball"
              />
            </div>
            <div className="mx-auto relative w-[24%] h-[30%] max-h-[30%]  flex items-center">
              <img
                className="mx-auto w-auto h-auto max-h-[100%]"
                src="/image/pokeball.svg"
                alt="pokeball"
              />
            </div>
            <div className="mx-auto relative w-[24%] h-[30%] max-h-[30%] flex items-center">
              <img
                className="mx-auto w-auto h-auto max-h-[100%]"
                src="/image/pokeball.svg"
                alt="pokeball"
              />
            </div>
            <div className="mx-auto relative w-[24%] h-[30%] max-h-[30%]  flex items-center">
              <img
                className="mx-auto w-auto h-auto max-h-[100%]"
                src="/image/pokeball.svg"
                alt="pokeball"
              />
            </div>
            <div className="mx-auto relative w-[24%] h-[30%] max-h-[30%]  flex items-center">
              <img
                className="mx-auto w-auto h-auto max-h-[100%]"
                src="/image/pokeball.svg"
                alt="pokeball"
              />
            </div>
            <div className="mx-auto relative w-[24%] h-[30%] max-h-[30%]  flex items-center">
              <img
                className="mx-auto w-auto h-auto max-h-[100%]"
                src="/image/pokeball.svg"
                alt="pokeball"
              />
            </div>
            <div className="mx-auto relative w-[24%] h-[30%] max-h-[30%]  flex items-center">
              <img
                className="mx-auto w-auto h-auto max-h-[100%]"
                src="/image/pokeball.svg"
                alt="pokeball"
              />
            </div>
            <div className="mx-auto relative w-[24%] h-[30%] max-h-[30%]  flex items-center">
              <img
                className="mx-auto w-auto h-auto max-h-[100%]"
                src="/image/pokeball.svg"
                alt="pokeball"
              />
            </div>
            <div className="mx-auto relative w-[24%] h-[30%] max-h-[30%]  flex items-center">
              <img
                className="mx-auto w-auto h-auto max-h-[100%]"
                src="/image/pokeball.svg"
                alt="pokeball"
              />
            </div>
            <div className="mx-auto relative w-[24%] h-[30%] max-h-[30%]  flex items-center">
              <img
                className="mx-auto w-auto h-auto max-h-[100%]"
                src="/image/pokeball.svg"
                alt="pokeball"
              />
            </div>
            <div className="mx-auto relative w-[24%] h-[30%] max-h-[30%]  flex items-center">
              <img
                className="mx-auto w-auto h-auto max-h-[100%]"
                src="/image/pokeball.svg"
                alt="pokeball"
              />
            </div>
            <div className="mx-auto relative w-[24%] h-[30%] max-h-[30%]  flex items-center">
              <img
                className="mx-auto w-auto h-auto max-h-[100%]"
                src="/image/pokeball.svg"
                alt="pokeball"
              />
            </div>
          </>
        )}
      </div>
      <div className="h-[5vh] flex justify-center items-center border bg-contain bg-repeat bg-[url('/image/flash.jpg')]">
        <div className="h-[100%] w-[100%] flex justify-center items-center border bg-contain bg-repeat bg-[url('/image/pokeball.svg')]">
          {!validated ? (
            <button
              type="button"
              onClick={handleValidate}
              className={`inline-block ${
                teamSelect.length !== 8 ? "bg-gray-400 " : "bg-yellow-400"
              } px-2 border-2 border-double  border-amber-600 rounded-md text-base font-medium text-blue-800`}
            >
              Valider
            </button>
          ) : (
            <Link
              to="/"
              className="inline-block bg-yellow-400 px-2 border-2 border-double  border-amber-600 rounded-md text-base font-medium text-blue-800 hover:bg-indigo-50"
            >
              Combattre
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
