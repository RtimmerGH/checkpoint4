import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import PokeCard from "@components/PokeCard";

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
  };

  const pokeClick = (pokemon) => {
    if (teamSelect.length < 8 && teamSelect.indexOf(pokemon) === -1) {
      const pokeId = pokemon;
      const teamSelectCopy = teamSelect;
      teamSelectCopy.push(pokeId);
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
        <div>
          <h1 className="text-base sm:text-xl lg:text-2xl font-extrabold rounded   text-yellow-400 drop-shadow-[1_5px_35px_rgba(2,41,195,0.8)]">
            Choisis les pokemons que tu veux dans ton équipe
          </h1>
        </div>
      </div>
      <div className="h-[5vh] flex justify-center items-center border">
        <button
          type="button"
          onClick={handleSubmit}
          className="inline-block bg-yellow-400 py-0 sm:py-2 px-2 border border-spacing-1 rounded-md text-base font-medium text-blue-800 hover:bg-indigo-50"
        >
          Démarrer
        </button>
        <button
          type="button"
          onClick={handleReset}
          className="inline-block bg-yellow-400 py-0 sm:py-2 px-2 border border-spacing-1 rounded-md text-base font-medium text-blue-800 hover:bg-indigo-50"
        >
          Rechoisir
        </button>
      </div>
      <div className="h-[60vh]  px-1 flex justify-center flex-wrap border">
        {teamOffer.length > 0 ? (
          teamOffer.map((pokemon) => {
            return (
              <button
                key={pokemon.id}
                type="button"
                onClick={() => pokeClick(pokemon.id)}
                className=" mx-auto relative w-[24%] h-[30%] max-h-[30%]"
              >
                <PokeCard pokeInfo={pokemon} />
                <div className="absolute h-[20%] w-[20%] top-[30%] left-[40%] text-4xl text-red-600 ">
                  {teamSelect.indexOf(pokemon.id) !== -1 && (
                    <p>{teamSelect.indexOf(pokemon.id) + 1}</p>
                  )}
                </div>
              </button>
            );
          })
        ) : (
          <div>
            <p>Cliquez sur Démarrer pour lancer la selection.</p>
            <p>
              Les 5 premiers Pokemons choisis composeront votre équipe de
              défense.
            </p>
          </div>
        )}
      </div>
      <div className="h-[5vh] flex justify-center items-center border">
        {!validated ? (
          <button
            type="button"
            onClick={handleValidate}
            className="inline-block bg-yellow-400 py-0 sm:py-2 px-2 border border-spacing-1 rounded-md text-base font-medium text-blue-800 hover:bg-indigo-50"
          >
            Valider
          </button>
        ) : (
          <Link
            to="/"
            className="inline-block bg-yellow-400 py-0 sm:py-2 px-2 border border-spacing-1 rounded-md text-base font-medium text-blue-800 hover:bg-indigo-50"
          >
            Combattre
          </Link>
        )}
      </div>
    </div>
  );
}
