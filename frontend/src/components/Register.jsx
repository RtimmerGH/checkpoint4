import React, { useState } from "react";
import axios from "axios";

export default function Register({ registerModal, setRegisterModal }) {
  if (!registerModal) return null;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        `/users`,
        {
          email,
          password,
          name,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(function handleResponse() {
        setRegisterModal(false);
      });
  };

  const btn =
    email === "" ||
    password === "" ||
    password !== confirmPassword ||
    name === "" ? (
      <button
        type="submit"
        disabled
        className="text-blue-700 bg-yellow-400 border border-blue-700 font-medium rounded-lg text-m w-full sm:w-auto px-5 py-2.5 text-center"
      >
        Send
      </button>
    ) : (
      <button
        type="submit"
        className="text-blue-700 bg-yellow-400 border border-blue-700 font-medium rounded-lg text-m w-full sm:w-auto px-5 py-2.5 text-center"
      >
        Send
      </button>
    );

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
            setRegisterModal(false);
          }}
        >
          X
        </button>
      </div>
      <h5 className="text-xl font-medium text-blue-700 mb-6">
        Créer un compte
      </h5>
      <form onSubmit={handleSubmit}>
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 mb-6 w-full group">
            <label
              htmlFor="floating_last_name"
              className="block mb-2 text-sm font-medium text-blue-700 dark:text-dark"
            >
              Nom / Pseudo
            </label>
            <input
              type="text"
              name="floating_last_name"
              id="name"
              defaultValue={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-blue-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder=" "
              required
            />
          </div>
        </div>
        <div className="relative z-0 mb-6 w-full group">
          <label
            htmlFor="floating_email"
            className="block mb-2 text-sm font-medium text-blue-700 dark:text-dark"
          >
            Adresse e-mail
          </label>
          <input
            type="email"
            name="floating_email"
            id="email"
            defaultValue={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-blue-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder=" "
            required
          />
        </div>
        <div className="relative z-0 mb-6 w-full group">
          <label
            htmlFor="floating_password"
            className="block mb-2 text-sm font-medium text-blue-700 dark:text-dark"
          >
            Mot de passe
          </label>
          <input
            type="password"
            name="floating_password"
            id="password"
            defaultValue={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-blue-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder=" "
            required
          />
        </div>
        <div className="relative z-0 mb-6 w-full group">
          <label
            htmlFor="floating_repeat_password"
            className="block mb-2 text-sm font-medium text-blue-700 dark:text-dark"
          >
            Confirmer le mot de passe
          </label>
          <input
            type="password"
            name="repeat_password"
            id="floating_repeat_password"
            defaultValue={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-blue-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder=" "
            required
          />
        </div>
        <div className="grid md:grid-cols-2 md:gap-6" />
        {btn}
      </form>
      <button
        type="button"
        onClick={() => {
          setRegisterModal(false);
        }}
        className="text-sm mt-10 font-medium text-cyan-500 dark:text-gray-300 text-center"
      >
        Fermer
      </button>
    </div>
  );
}
