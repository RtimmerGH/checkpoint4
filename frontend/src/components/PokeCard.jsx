import React from "react";
import { GiHearts, GiFist, GiShield, GiStopwatch } from "react-icons/gi";

export default function PokeCard({ pokeInfo }) {
  return (
    <div className="w-[100%] h-[100%]">
      <div className="bg-white h-[100%] rounded overflow-hidden shadow-lg">
        <div
          className=" flex justify-between bg-yellow-500  w-[100%] h-[80%] border-b bg-center bg-cover bg-no-repeat"
          style={{
            backgroundImage: `url(${pokeInfo.image})`,
          }}
        >
          <div className="w-[50%] flex">
            <div
              className=" flex justify-between m-1 h-[30%] w-[30%] bg-center bg-contain bg-no-repeat"
              style={{
                backgroundImage: `url(${pokeInfo.apiTypes[0].image})`,
              }}
            />
            {pokeInfo.apiTypes[1] && (
              <div
                className=" flex justify-between m-1 h-[30%] w-[30%] bg-center bg-contain  bg-no-repeat"
                style={{
                  backgroundImage: `url(${pokeInfo.apiTypes[1].image})`,
                }}
              />
            )}
          </div>
          <div className=" flex flex-col content-center m-1 border-b bg-center bg-cover bg-no-repeat">
            <p className=" flex items-center h-fit">
              <GiHearts color="red" /> {pokeInfo.stats.HP}
            </p>
            <p className=" flex items-center h-fit">
              <GiFist color="red" /> {pokeInfo.stats.attack}
            </p>
            <p className=" flex items-center h-fit">
              <GiShield color="red" /> {pokeInfo.stats.defense}
            </p>
            <p className=" flex items-center h-fit">
              <GiStopwatch color="red" /> {pokeInfo.stats.speed}
            </p>
          </div>
        </div>
        <div className="border-b">
          <div className="text-center">
            <p className="text-sm font-medium text-gray-800 leading-none">
              {pokeInfo.name}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
