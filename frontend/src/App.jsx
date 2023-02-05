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
import Scores from "@pages/Scores";
import ModalRotate from "@components/ModalRotate";

function MainContent() {
  const location = useLocation();
  const attack = matchPath({ path: "/attack" }, location.pathname);

  return (
    <>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/create-team" element={<CreateTeam />} />
        <Route path="/attack" element={<Attack />} />
        <Route path="/scores" element={<Scores />} />
      </Routes>
      {attack ? "" : <Footer />}
    </>
  );
}

function App() {
  return (
    <div className="App h-[100vh]">
      <Router>
        <Header />
        <MainContent />
        <ModalRotate />
      </Router>
    </div>
  );
}

export default App;
