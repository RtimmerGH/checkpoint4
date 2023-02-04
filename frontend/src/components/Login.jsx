import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

export default function Login({ loginModal, setLoginModal, setRegisterModal }) {
  if (!loginModal) return null;

  const {
    setUserTokenCookie,
    setUserName,
    setUserEmail,
    setUserRole,
    setUserId,
  } = useContext(AuthContext);

  const [password, setPassword] = useState("");
  const [email, setemail] = useState("");

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const login = { email, password };
      // const { VITE_BACKEND_URL } = import.meta.env;
      // const response = await axios.post(`${VITE_BACKEND_URL}/login`, login);
      const response = await axios.post(`/login`, login);

      if (response.data.token) {
        setUserTokenCookie(response.data.token);
        setUserRole(response.data.user.admin);
        setUserName(response.data.user.name);
        setUserEmail(response.data.user.email);
        setUserId(response.data.user.id);
        setLoginModal(false);
      }
    } catch (error) {
      console.error("user not found");
    }
  };

  const handleChange = () => {
    setLoginModal(false);
    setRegisterModal(true);
  };

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
        flex-grow
        flex
        flex-col
        px-10
        justify-center
        align-between"
    >
      <div className="flex justify-end">
        <button
          type="button"
          className="text-red-500 p-2 border border-blue-700 bg-yellow-400 rounded font-normal"
          onClick={() => {
            setLoginModal(false);
          }}
        >
          X
        </button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <h5 className="flex justify-center text-xl font-medium text-blue-700 mx-auto">
          Se connecter
        </h5>
        <div className="mb-6">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-blue-700 dark:text-dark"
          >
            email
          </label>
          <input
            type="email"
            id="email"
            defaultValue={email}
            onChange={(e) => setemail(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-blue-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-blue-700 dark:text-dark"
          >
            Mot de passe
          </label>
          <input
            type="password"
            id="password"
            defaultValue={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="flex text-blue-700 bg-yellow-400 border border-blue-700 font-medium rounded-lg text-m sm:w-auto px-5 py-2.5
          mx-auto"
        >
          Connexion
        </button>
      </form>
      <div className="text-sm font-medium text-black text-center flex flex-col items-center mt-2 ">
        Pas de compte ?{" "}
        <div
          onClick={handleChange}
          onKeyDown={handleChange}
          role="button"
          tabIndex={0}
          className="text-blue-700 hover:underline w-fit"
        >
          S'enregistrer
        </div>
      </div>
    </div>
  );
}
