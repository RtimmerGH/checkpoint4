import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PokeCard from "@components/PokeCard";

export default function Fight({ defTeam, attackTeam, userId, defId }) {
  const navigate = useNavigate();
  const [attackScore, setAttackScore] = useState(0);
  const [defScore, setDefScore] = useState(0);
  const [turn, setTurn] = useState(-1);
  const [winnerId, setWinnerId] = useState();
  const [logs, setLogs] = useState([]);
  const [fightLogs, setFightLogs] = useState([]);
  const [pokeAttack, setPokeAttack] = useState(attackTeam[0]);
  const [pokeDef, setPokeDef] = useState(defTeam[0]);
  const [pokeAttackAttack, setPokeAttackAttack] = useState(false);
  const [pokeDefAttack, setPokeDefAttack] = useState(false);

  const pokeStrike = (poke1, poke2) => {
    poke2.stats.HP -= poke1.stats.attack;
    return poke2;
  };

  // eslint-disable-next-line no-promise-executor-return
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  useEffect(() => {
    async function delayPokeAttackAtack() {
      await delay(1000);
      const pokeAttackCopy = pokeAttack;
      let pokeDefCopy = pokeDef;
      const fightLogsTemp = fightLogs;
      pokeDefCopy = pokeStrike(pokeAttackCopy, pokeDefCopy);
      fightLogsTemp.push(
        `${attackTeam[turn].name} attaque ${defTeam[turn].name} et lui inflige: ${attackTeam[turn].stats.attack} points de dégats`
      );
      setFightLogs(fightLogsTemp);
      setPokeDef(pokeDefCopy);
      setPokeAttackAttack(false);
      setPokeDefAttack(true);
    }
    if (pokeAttackAttack && pokeAttack.stats.HP > 0) {
      delayPokeAttackAtack();
    }
    if (pokeAttackAttack && pokeAttack.stats.HP < 1) {
      const logsTemp = logs;
      logsTemp.push(
        `${attackTeam[turn].name} contre ${defTeam[turn].name}, Vainqueur: ${defTeam[turn].name}`
      );
      const fightLogsTemp = fightLogs;
      fightLogsTemp.push(`${attackTeam[turn].name} est vaincu !`);
      setDefScore((prev) => prev + 1);
      // setTurn((prev) => prev + 1);
      setLogs(logsTemp);
      setFightLogs(fightLogsTemp);
      setPokeAttackAttack(false);
    }
  }, [pokeAttackAttack]);

  useEffect(() => {
    async function delayPokeDefAtack() {
      await delay(1000);
      let pokeAttackCopy = pokeAttack;
      const pokeDefCopy = pokeDef;
      const fightLogsTemp = fightLogs;
      pokeAttackCopy = pokeStrike(pokeDefCopy, pokeAttackCopy);
      fightLogsTemp.push(
        `${defTeam[turn].name} attaque ${attackTeam[turn].name} et lui inflige: ${defTeam[turn].stats.attack} points de dégats`
      );
      setFightLogs(fightLogsTemp);
      setPokeAttack(pokeAttackCopy);
      setPokeDefAttack(false);
      setPokeAttackAttack(true);
    }
    if (pokeDefAttack && pokeDef.stats.HP > 0) {
      delayPokeDefAtack();
    }
    if (pokeDefAttack && pokeDef.stats.HP < 1) {
      const logsTemp = logs;
      logsTemp.push(
        `${attackTeam[turn].name} contre ${defTeam[turn].name}, Vainqueur: ${attackTeam[turn].name}`
      );
      const fightLogsTemp = fightLogs;
      fightLogsTemp.push(`${defTeam[turn].name} est vaincu !`);
      setAttackScore((prev) => prev + 1);
      // setTurn((prev) => prev + 1);
      setLogs(logsTemp);
      setFightLogs(fightLogsTemp);
      setPokeDefAttack(false);
    }
  }, [pokeDefAttack]);

  const fight = () => {
    if (!pokeDefAttack && !pokeAttackAttack) {
      setTurn((prev) => prev + 1);
      setPokeAttack(attackTeam[turn + 1]);
      setPokeDef(defTeam[turn + 1]);
      setFightLogs([]);
      if (attackTeam[turn + 1].stats.speed > defTeam[turn + 1].stats.speed) {
        setPokeAttackAttack(true);
      } else setPokeDefAttack(true);
    }
  };

  const handleResult = async () => {
    const attackUserId = userId;
    const defUserId = defId;
    try {
      const response = await axios.post(
        `/fights`,
        {
          attackUserId,
          defUserId,
          winnerId,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response) {
        navigate("/");
      }
    } catch (error) {
      console.error("user not found");
    }
  };

  useEffect(() => {
    if (attackScore > 2) {
      setWinnerId(userId);
    }
    if (defScore > 2) {
      setWinnerId(defId);
    }
  }, [defScore, attackScore]);

  return (
    <div
      className="
            fixed
            w-screen
            h-screen
            top-0
            left-0
            z-10
            bg-black            
            flex
            "
    >
      <div
        className="
            
            w-full
            h-full            
            bg-red-500            
            flex
            flex-col
            px-5            
            align-between rounded-3xl"
      >
        <div className="w-[100%] h-[30vh] bg-[rgba(188,188,188,255)] mt-6 flex justify-center items-center border-2 border-black  rounded-3xl ">
          <div className="h-[95%] w-[95%] relative flex bg-bottom rounded-3xl border-2 border-black bg-cover bg-no-repeat bg-[url('/image/arena2.png')]">
            {attackTeam[turn] ? (
              <div
                className={`relative h-[100%] w-[100%] ${
                  pokeAttackAttack && "border-4 border-green-500 rounded-3xl "
                } `}
              >
                <PokeCard pokeInfo={attackTeam[turn]} />
                {pokeAttack && pokeAttack.stats.HP < 1 && (
                  <div className="h-[100%] w-[100%] top-0 left-0 absolute bg-center bg-contain bg-no-repeat bg-[url('/image/cross.svg')]" />
                )}
              </div>
            ) : (
              <PokeCard pokeInfo={attackTeam[0]} />
            )}

            <div className="flex items-center">
              <h1 className="font-bold">VS</h1>
            </div>
            {defTeam[turn] ? (
              <div
                className={` relative h-[100%] w-[100%] ${
                  pokeDefAttack && "border-4 border-green-500 rounded-3xl "
                }`}
              >
                <PokeCard pokeInfo={defTeam[turn]} />
                {pokeDef && pokeDef.stats.HP < 1 && (
                  <div className="h-[100%] w-[100%] top-0 left-0 absolute bg-center bg-contain bg-no-repeat bg-[url('/image/cross.svg')]" />
                )}
              </div>
            ) : (
              <PokeCard pokeInfo={defTeam[0]} />
            )}
          </div>
        </div>
        <div className="flex justify-center mt-1 h-[4vh]">
          {turn < 5 && !winnerId ? (
            <button
              type="button"
              className="inline-flex items-center px-4 h-[4vh] border-2 border-double border-black text-base font-medium rounded-md shadow-sm text-black bg-gray-400 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
              onClick={() => {
                fight(pokeAttack, pokeDef);
              }}
            >
              Lancer le combat{turn + 2}
            </button>
          ) : (
            <button
              type="button"
              className="inline-flex items-center px-4 h-[4vh] border-2 border-double border-black text-base font-medium rounded-md shadow-sm text-black bg-gray-400 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
              onClick={() => {
                handleResult();
              }}
            >
              Terminer
            </button>
          )}
        </div>
        <div className="h-[25vh] text-xs sm:text-base md:text-lg">
          <h2 className="h-[3vh]">combat info</h2>
          <div className="w-[100%] h-[22vh] p-2 bg-[rgba(188,188,188,255)] flex justify-center items-center border-2 border-black  rounded-3xl ">
            <div className="h-[100%] w-[100%] overflow-auto bg-[rgba(194,217,173,255)] border border-black rounded-2xl">
              {fightLogs.length > 0 &&
                fightLogs.map((fightLog, index) => {
                  return (
                    // eslint-disable-next-line react/no-array-index-key
                    <div key={index} className=" block m-1 text-gray-800 ">
                      <p>{fightLog}</p>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
        <div className="h-[23vh] w-[100%] flex flex-col text-xs sm:text-base md:text-lg  ">
          <h2 className="h-[3vh]">Résultats</h2>
          <div className="w-[100%] h-[20vh] p-2 bg-[rgba(188,188,188,255)] flex justify-center items-center border-2 border-black  rounded-3xl ">
            <div className="h-[100%] w-[100%] overflow-auto bg-[rgba(194,217,173,255)] border border-black rounded-2xl">
              {logs.length > 0 &&
                logs.map((log) => {
                  return (
                    <div className=" block m-1 text-gray-800 ">
                      <p>{log}</p>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
        <div className="h-[5vh] mt-1 text-xs sm:text-base md:text-lg flex justify-center items-center">
          <div className="w-auto h-[100%] p-1 bg-[rgba(188,188,188,255)] flex justify-center items-center border-2 border-black  rounded-xl   ">
            <div className="h-[100%] w-[100%] px-2 min-w-fit overflow-auto bg-[rgba(194,217,173,255)] border border-black rounded-xl flex justify-center items-center">
              <p className="h-[100%] w-[100%]">{attackScore}</p>
            </div>
          </div>
          -
          <div className="w-auto h-[100%] p-1 bg-[rgba(188,188,188,255)] flex justify-center items-center border-2 border-black  rounded-xl ">
            <div className="h-[100%] w-[100%] px-2 min-w-fit overflow-auto bg-[rgba(194,217,173,255)] border border-black rounded-xl flex justify-center items-center">
              <p className="h-[100%] w-[100%] ">{defScore}</p>
            </div>
          </div>
        </div>
        {attackScore > 2 && (
          <div>
            {" "}
            <p>Tu as Gagné le match !</p>
          </div>
        )}
        {defScore > 2 && (
          <div>
            <p>Tu as Perdu le match !</p>
          </div>
        )}
        {(defScore > 2 || attackScore > 2) && (
          <button
            type="button"
            className="inline-flex items-center text-center px-4 py-1 my-1 border-2 border-double border-black text-base font-medium rounded-md shadow-sm text-black bg-gray-400 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
            onClick={() => {
              handleResult();
            }}
          >
            Terminer
          </button>
        )}
      </div>
    </div>
  );
}
