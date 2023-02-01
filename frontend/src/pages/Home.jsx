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
      <div className="h-[20vh] flex justify-center items-center border">
        <p>Créer son équipe</p>
      </div>
      <div className="h-[20vh] flex justify-center items-center border">
        <p>Attaquer</p>
      </div>
      <div className="h-[20vh] flex justify-center items-center border">
        <p>Défendre</p>
      </div>
    </div>
  );
}
