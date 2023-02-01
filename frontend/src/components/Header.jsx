import { Link } from "react-router-dom";
import { React } from "react";
// import { AuthContext } from "../context/AuthContext";

export default function Header() {
  // const navigate = useNavigate();
  // const { userToken } = useContext(AuthContext);

  return (
    <header className="bg-red-600 h-[10vh]">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="w-full py-2 flex items-center justify-between border-b border-red-500 lg:border-none">
          <div className="flex items-center">
            <Link to="/">
              <span className="sr-only">Workflow</span>
              <img
                className="h-10 w-auto"
                src="/image/logo.svg.png"
                alt="logo pokemon"
              />
            </Link>
          </div>
          <div className="ml-5 ">
            <button
              type="button"
              className="inline-block bg-yellow-400 py-2 px-2 m-1 border border-spacing-1   rounded-md text-base font-medium text-blue-800  hover:bg-opacity-75"
            >
              Se connecter
            </button>
            <button
              type="button"
              className="inline-block bg-yellow-400 py-2 px-2 border border-spacing-1 rounded-md text-base font-medium text-blue-800 hover:bg-indigo-50"
            >
              S'inscrire
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}
