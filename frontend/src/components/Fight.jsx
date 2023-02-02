import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PokeCard from "@components/PokeCard";

export default function Fight({
  defTeam,
  attackTeam,
  setStartFight,
  userId,
  defId,
}) {
  const navigate = useNavigate();
  const [attackScore, setAttackScore] = useState(0);
  const [defScore, setDefScore] = useState(0);
  const [turn, setTurn] = useState(0);
  const [winnerId, setWinnerId] = useState();
  const [logs, setLogs] = useState([]);

  const fight = (poke1, poke2) => {
    const pokemon1 = poke1;
    const pokemon2 = poke2;
    while (pokemon1.stats.HP > 0 && pokemon2.stats.HP > 0) {
      if (pokemon1.stats.speed > pokemon2.stats.speed) {
        pokemon2.stats.HP -= pokemon1.stats.attack;
        if (pokemon2.stats.HP > 0) {
          pokemon2.stats.HP -= pokemon1.stats.attack;
        }
      } else pokemon1.stats.HP -= pokemon2.stats.attack;
      if (pokemon1.stats.HP > 0) {
        pokemon1.stats.HP -= pokemon2.stats.attack;
      }
    }
    if (pokemon2.stats.HP > 0) {
      const logsTemp = logs;
      logsTemp.push(
        `${attackTeam[turn].name} contre ${defTeam[turn].name}, Vainqueur: ${
          defTeam[turn].name
        } => Score ${attackScore} - ${defScore + 1}`
      );
      setDefScore((prev) => prev + 1);
      setTurn((prev) => prev + 1);
      setLogs(logsTemp);
    } else {
      const logsTemp = logs;
      logsTemp.push(
        `${attackTeam[turn].name} contre ${defTeam[turn].name}, Vainqueur: ${
          attackTeam[turn].name
        } => Score ${attackScore + 1} - ${defScore}`
      );
      setAttackScore((prev) => prev + 1);
      setTurn((prev) => prev + 1);
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
            bg-yellow-300            
            flex
            flex-col
            px-10            
            align-between"
    >
      <div className="flex justify-end">
        <button
          type="button"
          className="text-red-500 p-2 border border-blue-700 bg-yellow-400 rounded font-normal"
          onClick={() => {
            setStartFight(false);
          }}
        >
          X
        </button>
      </div>
      <div>
        {turn < 5 && !winnerId ? (
          <button
            type="button"
            className="text-red-500 p-2 border border-blue-700 bg-yellow-400 rounded font-normal"
            onClick={() => {
              fight(attackTeam[turn], defTeam[turn]);
            }}
          >
            Fight{turn + 1}
          </button>
        ) : (
          <button
            type="button"
            className="text-red-500 p-2 border border-blue-700 bg-yellow-400 rounded font-normal"
            onClick={() => {
              handleResult(attackTeam[turn], defTeam[turn]);
            }}
          >
            Terminer
          </button>
        )}
      </div>
      <div className="h-[40vh] flex">
        {attackTeam[turn] && <PokeCard pokeInfo={attackTeam[turn]} />}
        <div className="flex items-center">
          <h1>VS</h1>
        </div>
        {defTeam[turn] && <PokeCard pokeInfo={defTeam[turn]} />}
      </div>
      <div className="h-[30vh] w-[100%] flex flex-col text-base md:text-lg  ">
        {logs.length > 0 &&
          logs.map((log) => {
            return (
              <div className=" mx-auto ">
                <p>{log}</p>
              </div>
            );
          })}
      </div>
      {attackScore > 2 && (
        <div>
          {" "}
          <p>Tu as Gagné la partie !</p>
        </div>
      )}
      {defScore > 2 && (
        <div>
          <p>Tu as Perdu la partie !</p>
        </div>
      )}
      {(defScore > 2 || attackScore > 2) && (
        <button
          type="button"
          className="text-red-500 p-2 border border-blue-700 bg-yellow-400 rounded font-normal"
          onClick={() => {
            handleResult(attackTeam[turn], defTeam[turn]);
          }}
        >
          Terminer
        </button>
      )}
    </div>
  );
}
