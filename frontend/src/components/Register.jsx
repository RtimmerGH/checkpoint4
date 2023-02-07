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

  const closeModal = (e) => {
    if (e.keyCode === 27) {
      setRegisterModal(false);
    }
  };

  const btn =
    email === "" ||
    password === "" ||
    password !== confirmPassword ||
    name === "" ? (
      <button
        type="submit"
        disabled
        className="text-gray-700 bg-gray-400 border border-blue-700 font-medium rounded-lg text-m w-full sm:w-auto mt-2 px-5 py-2.5 text-center"
      >
        Send
      </button>
    ) : (
      <button
        type="submit"
        className="text-gray-700 bg-gray-400 border border-blue-700 font-medium rounded-lg text-m w-full sm:w-auto mt-2 px-5 py-2.5 text-center"
      >
        Send
      </button>
    );

  return (
    <div
      role="button"
      onClick={() => setRegisterModal(false)}
      onKeyDown={closeModal}
      tabIndex={-1}
      className="
        fixed
        w-screen
        h-screen
        top-0
        left-0
        z-10
        bg-gray-600 
        bg-opacity-80    
        flex-grow
        flex
        flex-col        
        justify-center
        items-center    "
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        onKeyDown={null}
        tabIndex={-1}
        role="button"
        className="        
        w-full h-full
        shadow  md:w-1/2 md:auto p-10  bg-[rgba(196,42,42,255)] flex flex-col  justify-start border-2 border-black cursor-default  items-center rounded-3xl"
      >
        <div className="flex m-1 justify-around item w-[100%] ">
          <img
            src="image/createaccount.png"
            alt=" titre créer un compte"
            className=" max-w-[60%]"
          />
          <button
            type="button"
            className="text-red-500 px-2 max-h-10  border border-blue-700 bg-gray-700 font-normal rounded "
            onClick={() => {
              setRegisterModal(false);
            }}
          >
            X
          </button>
        </div>
        <div className="w-[90%] h-[70%] bg-[rgba(188,188,188,255)] flex justify-center items-center border-2 border-black  rounded-3xl ">
          <div className="w-[90%] h-[90%] bg-[rgba(194,217,173,255)] rounded-3xl p-5 border-2 border-black">
            <form onSubmit={handleSubmit}>
              <div className="relative z-0 w-full group">
                <label
                  htmlFor="floating_last_name"
                  className="block mb-1 text-sm font-medium text-gray-800 "
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

              <div className="relative z-0  w-full group">
                <label
                  htmlFor="floating_email"
                  className="block mb-1 text-sm font-medium text-gray-800"
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
              <div className="relative z-0  w-full group">
                <label
                  htmlFor="floating_password"
                  className="block mb-1 text-sm font-medium text-gray-800"
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
              <div className="relative z-0  w-full group">
                <label
                  htmlFor="floating_repeat_password"
                  className="block mb-1 text-sm font-medium text-gray-800"
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
              {btn}
            </form>
          </div>
        </div>
        <div className="w-[100%] h-[20%] mt-2 bg-contain bg-center bg-no-repeat bg-[url('/image/pokedex_bot.png')] " />
      </div>
    </div>
  );
}
