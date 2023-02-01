import * as React from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import { useContext, useEffect } from "react";

import Header from "@components/Header";
import Footer from "@components/Footer";
import Home from "@pages/Home";
import CreateTeam from "@pages/CreateTeam";
import Attack from "@pages/Attack";
import Defense from "@pages/Defense";
import Scores from "@pages/Scores";

import axios from "axios";
import Cookies from "js-cookie";
import { AuthContext } from "./context/AuthContext";

function App() {
  const { VITE_BACKEND_URL } = import.meta.env;

  axios.defaults.baseURL = VITE_BACKEND_URL;
  axios.defaults.headers.common.Authorization = `Bearer ${Cookies.get(
    "userToken"
  )}`;
  const { setUserInfos } = useContext(AuthContext);

  useEffect(() => {
    const token = Cookies.get("userToken");
    if (token) {
      axios
        .get(`/reconnect`)
        .then((response) => {
          setUserInfos({
            userId: response.data.id,
            userName: response.data.name,
            userEmail: response.data.email,
            isAdmin: response.data.admin,
          });
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/create-team" element={<CreateTeam />} />
          <Route path="/attack" element={<Attack />} />
          <Route path="/defense" element={<Defense />} />
          <Route path="/scores" element={<Scores />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
