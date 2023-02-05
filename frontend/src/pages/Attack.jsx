import React, { useState, useEffect, useContext } from "react";
// import { Link } from "react-router-dom";
import axios from "axios";
import PokeCard from "@components/PokeCard";
import Fight from "@components/Fight";
import { AuthContext } from "../context/AuthContext";

export default function Attack() {
  const { userId, userPoke1 } = useContext(AuthContext);
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
    if (team.poke) {
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
    }
  };

  const pokeClick = (pokemon) => {
    if (teamSelect.indexOf(pokemon.id) === -1) {
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
    } else {
      const teamSelectCopy = teamSelect;
      const attackTeamCopy = attackTeam;
      attackTeamCopy.splice(teamSelectCopy.indexOf(pokemon.id), 1);
      teamSelectCopy.splice(teamSelectCopy.indexOf(pokemon.id), 1);
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

  if (!userId || !userPoke1) {
    return (
      <div className="h-[80vh] bg-white">
        <div
          className="h-[10vh] flex justify-center items-center border bg-center bg-cover bg-no-repeat bg-[url('/image/banniere.png')] "
          style={{ textShadow: "1px 2px 3px blue" }}
        >
          <div className="h-[100%] w-[100%] bg-gray-500 bg-opacity-40 flex justify-center items-center">
            <h1 className="text-xs sm:text-xl lg:text-2xl font-extrabold rounded   text-yellow-400 drop-shadow-[1_5px_35px_rgba(2,41,195,0.8)]">
              Choisis les pokemons que tu veux dans ton équipe
            </h1>
          </div>
        </div>
        <div className="h-[5vh] flex justify-center items-center border ">
          <h1 className="text-xs sm:text-xl lg:text-2xl font-extrabold rounded   text-black drop-shadow-[1_5px_35px_rgba(2,41,195,0.8)]">
            Pour combattre vous devez être connecté et avoir une équipe
          </h1>
        </div>
        <div className="h-[75vh]  px-1 flex justify-center items-center flex-wrap border bg-center bg-cover bg-no-repeat bg-[url('/image/grass.jpg')]" />
      </div>
    );
  }

  return (
    <div className="h-[80vh] bg-white ">
      <div
        className="h-[6vh] flex justify-center items-center border bg-center bg-cover bg-no-repeat bg-[url('/image/banniere.png')]"
        style={{ textShadow: "1px 2px 3px blue" }}
      >
        <div className="h-[100%] w-[100%] bg-gray-500 bg-opacity-40 flex justify-center items-center">
          <h1 className="text-base sm:text-xl lg:text-2xl font-extrabold rounded   text-yellow-400 drop-shadow-[1_5px_35px_rgba(2,41,195,0.8)]">
            Choisis les 5 pokemons que tu veux dans ton équipe
          </h1>
        </div>
      </div>
      <div className="h-[7vh] flex justify-center items-center border bg-contain bg-repeat bg-[url('/image/flash.jpg')]">
        <div className="h-[100%] w-[100%] flex justify-center items-center border bg-contain bg-repeat bg-[url('/image/pokeball.svg')]">
          <button
            type="button"
            onClick={handleReset}
            className="inline-block bg-yellow-400 py-2 px-2 border-2 border-double  border-amber-600 rounded-md text-base font-medium text-blue-800 hover:bg-blue-800 hover:text-yellow-400 "
          >
            Désélectionner tous les pokemons
          </button>
        </div>
      </div>
      <div className="h-[35vh]  px-1 flex justify-center flex-wrap border bg-blue-500">
        {teamOffer.length > 0 ? (
          teamOffer.map((pokemon) => {
            return (
              <button
                key={pokemon.id}
                type="button"
                onClick={() => pokeClick(pokemon)}
                className=" mx-auto relative w-[24%] h-[49%] max-h-[49%] rounded bg-center bg-cover bg-no-repeat bg-[url('/image/flash.png')]"
                style={{
                  border: teamSelect.indexOf(pokemon.id) !== -1 && `solid red`,
                }}
              >
                <PokeCard pokeInfo={pokemon} />
                <div
                  className="absolute h-[20%] w-[20%] top-[40%] left-[10%]  text-4xl text-left text-red-600 "
                  style={{ textShadow: "1px 2px 3px black" }}
                >
                  {teamSelect.indexOf(pokemon.id) !== -1 && (
                    <p>{teamSelect.indexOf(pokemon.id) + 1}</p>
                  )}
                </div>
              </button>
            );
          })
        ) : (
          <div>
            <p>Chargement de l'équipe...</p>
          </div>
        )}
      </div>
      <div className="h-[7vh] flex justify-center items-center border bg-contain bg-repeat bg-[url('/image/flash.jpg')]">
        <div className="h-[100%] w-[100%] flex justify-center items-center border bg-contain bg-repeat bg-[url('/image/pokeball.svg')]">
          {!defId ? (
            <button
              type="button"
              onClick={handleValidate}
              className="inline-block bg-yellow-400 py-2 px-2 mx-2 border-2   border-double  border-amber-600 rounded-md text-base font-medium text-blue-800 hover:bg-blue-800 hover:text-yellow-400"
            >
              Chercher un adversaire
            </button>
          ) : (
            <div
              type="button"
              className="inline-block bg-yellow-400 py-2 px-2 mx-2 border-2   border-double  border-amber-600 rounded-md text-base font-medium text-blue-800 "
            >
              Equipe de {defName}
            </div>
          )}
          {teamSelect.length === 5 && (
            <button
              type="button"
              onClick={() => setStartFight(true)}
              className="inline-block bg-yellow-400 py-2 px-2 mx-2 border-2   border-double  border-amber-600   rounded-md text-base font-medium text-blue-800 hover:bg-blue-800 hover:text-yellow-400"
            >
              Démarrer le combat
            </button>
          )}
        </div>
      </div>
      <div className="h-[35vh]  px-1 flex justify-center flex-wrap border bg-green-600    ">
        {defTeam.length > 0 ? (
          defTeam.map((pokemon, index) => {
            return (
              <button
                key={pokemon.id}
                type="button"
                className=" mx-auto relative w-[24%] h-[49%] max-h-[49%] rounded bg-center bg-cover bg-no-repeat bg-[url('/image/flash.png')]"
                style={{
                  border: teamSelect.length > index && `solid red`,
                }}
              >
                <PokeCard pokeInfo={pokemon} />
                <div
                  className="absolute h-[20%] w-[20%] top-[40%] left-[10%]  text-4xl text-left text-red-600 "
                  style={{ textShadow: "1px 2px 3px black" }}
                >
                  {teamSelect.length > index && <p>{index + 1}</p>}
                </div>
              </button>
            );
          })
        ) : (
          <div className=" h-[100%] w-[100%] bg-center bg-contain bg-no-repeat bg-[url('/image/silhouette.png')]" />
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
