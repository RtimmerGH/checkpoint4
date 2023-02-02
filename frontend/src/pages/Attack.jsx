import React, { useState, useEffect, useContext } from "react";
// import { Link } from "react-router-dom";
import axios from "axios";
import PokeCard from "@components/PokeCard";
import Fight from "@components/Fight";
import { AuthContext } from "../context/AuthContext";

export default function Attack() {
  const { userId } = useContext(AuthContext);
  const [team, setTeam] = useState([]);
  const [defTeam, setDefTeam] = useState([]);
  const [defId, setDefId] = useState();
  const [defName, setDefName] = useState();
  const [teamOffer, setTeamOffer] = useState([]);
  const [teamSelect, setTeamSelect] = useState([]);
  const [renderSelect, setRenderSelect] = useState(false);
  const [attackTeam, setAttackTeam] = useState([]);
  const [startFight, setStartFight] = useState(false);

  const getTeam = async () => {
    try {
      const response = await axios.get(`/teams/${userId}`);
      if (response.data) {
        setTeam(response.data);
        setTeamSelect([]);
      }
    } catch (error) {
      console.error("probleme lors de la requete");
    }
  };

  const getDefTeam = async () => {
    try {
      const response = await axios.get(`/pokemon-defteams/${userId}`);
      if (response.data) {
        setDefTeam(response.data.team);
        setDefId(response.data.userId);
        setDefName(response.data.name);
      }
    } catch (error) {
      console.error("probleme lors de la requete");
    }
  };

  const getTeamInfo = async () => {
    const poke = [...team.poke];
    try {
      const response = await axios.post(
        `/pokemon-teams`,
        {
          poke,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data) {
        setTeamOffer(response.data);
      }
    } catch (error) {
      console.error("probleme lors de la requete");
    }
  };

  const pokeClick = (pokemon) => {
    if (teamSelect.length < 5 && teamSelect.indexOf(pokemon.id) === -1) {
      const pokeId = pokemon.id;
      const teamSelectCopy = teamSelect;
      teamSelectCopy.push(pokeId);
      const attackTeamCopy = attackTeam;
      attackTeamCopy.push(pokemon);

      setTeamSelect(teamSelectCopy);
      setAttackTeam(attackTeamCopy);
      setRenderSelect(!renderSelect);
    }
  };

  const handleReset = () => {
    setTeamSelect([]);
    setAttackTeam([]);
    setRenderSelect(!renderSelect);
  };

  const handleValidate = async () => {
    getDefTeam();
  };

  useEffect(() => {
    if (team.length < 1) {
      getTeam();
    }
    if (teamOffer.length < 1) {
      getTeamInfo();
    }
  }, [team.length]);

  return (
    <div className="h-[80vh] bg-white">
      <div
        className="h-[5vh] flex justify-center items-center border bg-center bg-cover bg-no-repeat bg-[url('/image/banniere.png')] "
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
          onClick={handleReset}
          className="inline-block bg-yellow-400 py-0 sm:py-2 px-2 border border-spacing-1 rounded-md text-base font-medium text-blue-800 hover:bg-indigo-50"
        >
          Nouvel ordre
        </button>
      </div>
      <div className="h-[35vh]  px-1 flex justify-center flex-wrap border">
        {teamOffer.length > 0 ? (
          teamOffer.map((pokemon) => {
            return (
              <button
                type="button"
                onClick={() => pokeClick(pokemon)}
                className=" mx-auto relative w-[24%] h-[49%] max-h-[49%]"
              >
                <PokeCard key={pokemon.id} pokeInfo={pokemon} />
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
            <p>Les 5 premiers Pokemons choisis composeront votre équipe</p>
          </div>
        )}
      </div>
      <div className="h-[5vh] flex justify-center items-center border">
        {!defId ? (
          <button
            type="button"
            onClick={handleValidate}
            className="inline-block bg-yellow-400 py-0 sm:py-2 px-2 border border-spacing-1 rounded-md text-base font-medium text-blue-800 hover:bg-indigo-50"
          >
            Adversaire
          </button>
        ) : (
          <div
            type="button"
            className="inline-block bg-yellow-400 py-0 sm:py-2 px-2 border border-spacing-1 rounded-md text-base font-medium text-blue-800 hover:bg-indigo-50"
          >
            {defName}
          </div>
        )}
        <button
          type="button"
          onClick={() => setStartFight(true)}
          className="inline-block bg-yellow-400 py-0 sm:py-2 px-2 border border-spacing-1 rounded-md text-base font-medium text-blue-800 hover:bg-indigo-50"
        >
          Fight
        </button>
      </div>
      <div className="h-[35vh]  px-1 flex justify-center flex-wrap border">
        {defTeam.length > 0 ? (
          defTeam.map((pokemon) => {
            return (
              <button
                type="button"
                className=" mx-auto relative w-[24%] h-[49%] max-h-[49%]"
              >
                <PokeCard key={pokemon.id} pokeInfo={pokemon} />
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
            <p>
              Cliquez sur Adversaire pour voir l'équipe que vous allez affronter
            </p>
            <p>Selectionnez ensuite 5 pokemons pour la combattre</p>
          </div>
        )}
      </div>
      {startFight && (
        <Fight
          defTeam={defTeam}
          attackTeam={attackTeam}
          startFight={startFight}
          setStartFight={setStartFight}
          userId={userId}
          defId={defId}
        />
      )}
    </div>
  );
}
