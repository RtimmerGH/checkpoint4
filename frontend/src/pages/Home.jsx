import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="bg-white h-[80vh]">
      <div
        className="h-[20vh] flex justify-center items-center border bg-center bg-cover bg-no-repeat bg-[url('/image/banniere.png')]"
        style={{ textShadow: "1px 2px 3px blue" }}
      >
        <div>
          <h1 className="text-5xl font-extrabold rounded   text-yellow-400 drop-shadow-[1_5px_35px_rgba(2,41,195,0.8)]">
            PokeBattle
          </h1>
        </div>
      </div>
      <div className="h-[20vh] flex justify-center items-center border  bg-center bg-cover bg-no-repeat bg-[url('/image/pokeban2.jpg')]">
        <Link
          to="/create-team"
          className="inline-flex items-center px-6 py-3 border border-spacing-1 text-base font-medium rounded-md shadow-sm text-blue-800 bg-yellow-400 hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Créer l'équipe
        </Link>
      </div>
      <div className="h-[20vh] flex justify-center items-center border  bg-center bg-cover bg-no-repeat bg-[url('/image/pokeban3.png')]">
        <Link
          to="/attack"
          className="inline-flex items-center px-6 py-3 border border-spacing-1 text-base font-medium rounded-md shadow-sm text-blue-800 bg-yellow-400 hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Attaquer
        </Link>
      </div>
      <div className="h-[20vh] flex justify-center items-center border bg-center bg-cover bg-no-repeat bg-[url('/image/pokeban4.jpg')]">
        <Link
          to="/scores"
          className="inline-flex items-center px-6 py-3 border border-spacing-1 text-base font-medium rounded-md shadow-sm text-blue-800 bg-yellow-400 hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Scores
        </Link>
      </div>
    </div>
  );
}
