const axios = require("axios");

const browsePokemon = (req, res) => {
  axios
    .get("https://pokebuildapi.fr/api/v1/random/team")
    .then((response) => {
      res.send(response.data);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

async function getPokeTeamInfo(req, res, quant, check) {
  const pokeTeamId = [];
  if (
    (check === 1 && req.body.poke.length === 8) ||
    (check === 2 && req.body.poke.length === 5)
  ) {
    const promises = [];
    for (let i = 0; i < quant; i += 1) {
      promises.push(
        axios
          .get(`https://pokebuildapi.fr/api/v1/pokemon/${req.body.poke[i]}`)
          .then((response) => {
            pokeTeamId[i] = response.data;
          })
          .catch((err) => {
            console.error(err);
            res.sendStatus(500);
          })
      );
    }
    return Promise.all(promises).then(() => {
      return pokeTeamId;
    });
  }
  return pokeTeamId;
}

const browseTeam = (req, res) => {
  getPokeTeamInfo(req, res, 8, 1)
    .then((pokeTeamId) => res.send(pokeTeamId))
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const browseDefteam = (req, res) => {
  getPokeTeamInfo(req, res, 5, 2)
    .then((pokeTeamId) => res.send(pokeTeamId))
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  browsePokemon,
  browseTeam,
  browseDefteam,
};
