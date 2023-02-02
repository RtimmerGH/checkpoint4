const express = require("express");
const {
  hashPassword,
  verifyPassword,
  verifyToken,
  verifyAdmin,
  replaceReqParamIdByPayloadSub,
} = require("./middleware/auth");

const router = express.Router();

const userControllers = require("./controllers/userControllers");
const pokemonControllers = require("./controllers/pokemonControllers");
const fightControllers = require("./controllers/fightControllers");
const teamControllers = require("./controllers/teamControllers");
const defteamControllers = require("./controllers/defteamControllers");

// public routes
router.get("/pokemons", pokemonControllers.browsePokemon);
router.get("/pokemon-teams", pokemonControllers.browseTeam);
router.get("/pokemon-defteams", pokemonControllers.browseDefteam);
router.post("/users", hashPassword, userControllers.add);
router.get("/fights", fightControllers.browse);
router.get("/teams", teamControllers.browse);
router.get("/teams/:id", teamControllers.read);
router.get("/defteams", defteamControllers.browse);

router.post(
  "/login",
  userControllers.getUserByEmailWithPasswordAndPassToNext,
  verifyPassword
);

// Not public routes
router.use(verifyToken, verifyAdmin); // authentication wall : verifyToken is activated for each route after this line

router.post("/fights", fightControllers.add);
router.post("/teams", teamControllers.add);
router.post("/defteams", defteamControllers.add);
router.get("/reconnect", replaceReqParamIdByPayloadSub, userControllers.read);
router.get("/users", userControllers.browse);
router.get("/users/:id", userControllers.read);
router.put("/users/:id", userControllers.edit);
router.delete("/users/:id", userControllers.destroy);

module.exports = router;
