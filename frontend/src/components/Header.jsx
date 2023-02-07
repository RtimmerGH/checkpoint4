import { Link } from "react-router-dom";
import { React, useState, useContext } from "react";
import Login from "@components/Login";
import Register from "@components/Register";
import { AuthContext } from "../context/AuthContext";

export default function Header() {
  // const navigate = useNavigate();
  const { userToken, userName, setUserTokenCookie, loginModal, setLoginModal } =
    useContext(AuthContext);
  // const [loginModal, setLoginModal] = useState(false);
  const [registerModal, setRegisterModal] = useState(false);

  const handleChange = () => {
    setLoginModal(true);
  };

  const handleRegister = () => {
    setRegisterModal(true);
  };

  const handleDisconnect = () => {
    setUserTokenCookie(null);
  };

  return (
    <header className="bg-red-600 h-[10vh] border-b-2 border-black">
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
            {!userToken ? (
              <button
                type="button"
                onClick={handleChange}
                className="inline-block bg-yellow-400 py-2 px-2 m-1 border border-spacing-1 border-blue-800   rounded-md text-sm md:text-base  font-medium text-blue-800  hover:bg-opacity-75"
              >
                Se connecter
              </button>
            ) : (
              <div className="inline-block bg-yellow-400 py-2 px-2 m-1 border border-spacing-1  border-blue-800 rounded-md text-sm md:text-base font-medium text-blue-800  hover:bg-opacity-75">
                {userName}
              </div>
            )}
            {!userToken ? (
              <button
                type="button"
                onClick={handleRegister}
                className="inline-block bg-yellow-400 py-2 px-2 border border-spacing-1border-blue-800 rounded-md text-sm md:text-base font-medium text-blue-800 hover:bg-indigo-50"
              >
                S'inscrire
              </button>
            ) : (
              <button
                type="button"
                onClick={handleDisconnect}
                className="inline-block bg-yellow-400 py-2 px-2 border border-spacing-1 border-blue-800 rounded-md text-sm md:text-base font-medium text-blue-800 hover:bg-indigo-50"
              >
                Déconnecter
              </button>
            )}
          </div>
        </div>
        {loginModal && (
          <Login
            loginModal={loginModal}
            setLoginModal={setLoginModal}
            setRegisterModal={setRegisterModal}
          />
        )}
        {registerModal && (
          <Register
            registerModal={registerModal}
            setRegisterModal={setRegisterModal}
          />
        )}
      </nav>
    </header>
  );
}
