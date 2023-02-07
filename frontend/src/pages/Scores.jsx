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
    <div className="w-[100vw] h-[80vh] bg-center bg-cover bg-no-repeat bg-[url('/image/grass.jpg')] flex justify-center items-center">
      <div
        className="        
      w-[95%] h-[95%]
    shadow p-10  bg-[rgba(196,42,42,255)] flex flex-col  justify-start border-2 border-black cursor-default  items-center rounded-3xl"
      >
        <div className="flex m-1 justify-around item w-[100%] ">
          <img
            src="image/classement.png"
            alt=" titre classement"
            className=" max-w-[60%]"
          />
        </div>
        <div className="w-[90%] h-[70%] bg-[rgba(188,188,188,255)] flex justify-center items-center border-2 border-black  rounded-3xl ">
          <div className="w-[90%] h-[90%] bg-[rgba(194,217,173,255)] rounded-3xl p-5 border-2 border-black overflow-auto">
            {ranking.length > 0 &&
              ranking.map((user) => {
                return (
                  <div
                    key={user.winner_id}
                    className=" mx-auto flex  justify-between   w-[90%] border-b-2  border-black text-left"
                  >
                    <p>{user.name}</p>
                    <p>Victoires: {user.num}</p>
                  </div>
                );
              })}
          </div>
        </div>

        <div className="w-[100%] h-[20%] mt-2 bg-contain bg-center bg-no-repeat bg-[url('/image/pokedex_bot.png')] " />
      </div>
    </div>
  );
}
