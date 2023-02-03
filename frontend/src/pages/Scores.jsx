import * as React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Scores() {
  const [ranking, setRanking] = useState([]);

  useEffect(() => {
    if (ranking.length < 1) {
      axios
        .get(`/scores`)
        .then((response) => {
          setRanking(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);
  return (
    <div className="h-[80vh] bg-yellow-500 flex flex-col">
      <div className="flex flex-col text-center my-2">
        <p>Tableau des Scores!</p>
        {ranking.length > 0 &&
          ranking.map((user) => {
            return (
              <div
                key={user.winner_id}
                className=" mx-auto flex  justify-around  w-[90vw] border border-amber-600"
              >
                <p>{user.name}</p>
                <p>Victoires: {user.num}</p>
              </div>
            );
          })}
      </div>
    </div>
  );
}
