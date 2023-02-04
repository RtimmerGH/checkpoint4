import * as React from "react";
import {
  Routes,
  Route,
  matchPath,
  useLocation,
  BrowserRouter as Router,
} from "react-router-dom";

import Header from "@components/Header";
import Footer from "@components/Footer";
import Home from "@pages/Home";
import CreateTeam from "@pages/CreateTeam";
import Attack from "@pages/Attack";
import Defense from "@pages/Defense";
import Scores from "@pages/Scores";

function MainContent() {
  const location = useLocation();
  const attack = matchPath({ path: "/attack" }, location.pathname);

  return (
    <>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/create-team" element={<CreateTeam />} />
        <Route path="/attack" element={<Attack />} />
        <Route path="/defense" element={<Defense />} />
        <Route path="/scores" element={<Scores />} />
      </Routes>
      {attack ? "" : <Footer />}
    </>
  );
}

function App() {
  // const { VITE_BACKEND_URL } = import.meta.env;

  // axios.defaults.baseURL = VITE_BACKEND_URL;
  // axios.defaults.headers.common.Authorization = `Bearer ${Cookies.get(
  //   "userToken"
  // )}`;
  // const { setUserName, setUserEmail, setUserRole, setUserId } =
  //   useContext(AuthContext);

  // useEffect(() => {
  //   const token = Cookies.get("userToken");
  //   if (token) {
  //     axios
  //       .get(`/reconnect`)
  //       .then((response) => {
  //         setUserName(response.data.name);
  //         setUserEmail(response.data.email);
  //         setUserRole(response.data.admin);
  //         setUserId(response.data.id);
  //       })
  //       .catch((error) => {
  //         console.error(error);
  //       });
  //   }
  // }, []);
  return (
    <div className="App h-[100vh]">
      <Router>
        <Header />
        <MainContent />
      </Router>
    </div>
  );
}

export default App;
