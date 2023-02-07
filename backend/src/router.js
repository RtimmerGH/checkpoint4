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

// public routes
router.get("/scores", fightControllers.ranking);
router.get("/pokemons", pokemonControllers.browsePokemon);
router.get("/pokemon-teams", pokemonControllers.browseTeam);
router.post("/pokemon-teams", pokemonControllers.browseTeam);
router.get(
  "/pokemon-defteams/:id",
  teamControllers.readRandomUser,
  teamControllers.readDef,
  pokemonControllers.browseDefTeam
);
router.post("/users", hashPassword, userControllers.add);
router.get("/fights", fightControllers.browse);
router.get("/teams", teamControllers.browse);
router.get("/teams/:id", teamControllers.read);

router.post(
  "/login",
  userControllers.getUserByEmailWithPasswordAndPassToNext,
  verifyPassword
);

// Not public routes
router.use(verifyToken, verifyAdmin); // authentication wall : verifyToken is activated for each route after this line

router.post("/fights", fightControllers.add);
router.post("/teams", teamControllers.add);
router.get("/reconnect", replaceReqParamIdByPayloadSub, userControllers.read);
router.get("/users", userControllers.browse);
router.get("/users/:id", userControllers.read);
router.put("/users/:id", userControllers.edit);
router.delete("/users/:id", userControllers.destroy);

module.exports = router;
