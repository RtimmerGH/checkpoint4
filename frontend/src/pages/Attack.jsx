import React, { useState, useEffect, useContext } from "react";
// import { Link } from "react-router-dom";
import axios from "axios";
import PokeCard from "@components/PokeCard";
import Fight from "@components/Fight";
import Loading from "@components/Loading";
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
  const [defLoading, setDefLoading] = useState(false);

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
        setDefLoading(false);
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
    setDefLoading(true);
  };

  const fight = async (e) => {
    if (e.keyCode === 13) {
      setStartFight(true);
    }
  };

  useEffect(() => {
    if (defLoading) {
      getDefTeam();
    }
  }, [defLoading]);

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
              Choisis les 5 pokemons que tu veux dans ton équipe
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
      <div className="h-[7vh] flex justify-center items-center  rounded-xl border-4 border-[rgba(188,188,188,255)]    bg-[rgba(194,217,173,255)]">
        <div className="h-[100%] w-[100%] flex justify-between items-center border border-black rounded-xl">
          <img
            src="/image/pokeball.png"
            alt="pokeball"
            className="max-h-[100%] "
          />
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center max-h-[80%] px-6 py-3 border-2 border-double border-black shadow-sm text-sm md:text-base font-medium rounded-md text-gray-700 hover:bg-gray-600 hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
          >
            Désélectionner tous les pokemons
          </button>
          <img
            src="/image/pokeball.png"
            alt="pokeball"
            className="max-h-[100%] "
          />
        </div>
      </div>
      <div className="h-[35vh]  px-1 flex justify-center flex-wrap border bg-blue-600">
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
      <div className="h-[7vh] flex justify-center items-center  rounded-xl border-4 border-[rgba(188,188,188,255)]    bg-[rgba(194,217,173,255)]">
        <div className="h-[100%] w-[100%] flex justify-center items-center border border-black rounded-xl">
          <div className="h-[100%] w-[100%] flex justify-between items-center ">
            <img
              src="/image/pokeball.png"
              alt="pokeball"
              className="max-h-[100%] "
            />
            {!defId && !defLoading ? (
              <button
                type="button"
                onClick={handleValidate}
                className="inline-flex items-center max-h-[80%] px-6 py-3 border-2 border-double border-black shadow-sm text-sm md:text-base font-medium rounded-md text-gray-700 hover:bg-gray-600 hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
              >
                Chercher un adversaire
              </button>
            ) : (
              <div className="inline-flex items-center max-h-[80%] px-2 py-3  shadow-sm text-sm md:text-base font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black">
                Equipe de {defName}
              </div>
            )}
            {teamSelect.length === 5 && (
              <div
                role="button"
                tabIndex={-1}
                onKeyDown={fight}
                onClick={() => setStartFight(true)}
                className="relative h-[80%] max-h-[80%]"
              >
                <button
                  type="button"
                  className="inline-flex items-center max-h-[100%] px-6 py-3 border-2 border-double border-black shadow-sm text-sm md:text-base font-medium rounded-md text-gray-700 hover:bg-gray-600 hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                >
                  Combattre
                </button>
              </div>
            )}
            <img
              src="/image/pokeball.png"
              alt="pokeball"
              className="max-h-[100%] "
            />
          </div>
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
          <div className=" h-[100%] w-[100%] bg-center bg-contain bg-no-repeat bg-[url('/image/silhouette.png')]">
            {defLoading && <Loading />}
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
