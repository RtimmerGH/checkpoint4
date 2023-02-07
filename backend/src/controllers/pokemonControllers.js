const axios = require("axios");

async function comparePokeLists(pokeList1, pokeList2) {
  let response = false;
  for (let i = 0; i < pokeList1.length; i += 1) {
    if (response) {
      break;
    }
    for (let j = 0; j < pokeList2.length; j += 1) {
      if (pokeList1[i].id === pokeList2[j].id) {
        response = true;
        break;
      }
    }
  }

  return Promise.resolve(response).then(() => {
    return response;
  });
}

const browsePokemon = (req, res) => {
  let resp = [];
  axios
    .get("https://pokebuildapi.fr/api/v1/random/team")
    .then((response) => {
      axios
        .get("https://pokebuildapi.fr/api/v1/random/team")
        .then((response2) => {
          comparePokeLists(response.data, response2.data).then((double) => {
            if (!double) {
              resp = [...response.data, ...response2.data];
              res.send(resp);
            } else {
              browsePokemon(req, res);
            }
          });
        })
        .catch((err) => {
          console.error(err);
          res.sendStatus(500);
        });
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
    (check === 2 && (req.body.poke.length === 5 || req.body.poke.length === 8))
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

const browseDefTeam = (req, res) => {
  getPokeTeamInfo(req, res, 5, 2)
    .then((pokeTeamId) => {
      const pokeDefTeam = {};
      pokeDefTeam.userId = req.params.id;
      pokeDefTeam.team = [...pokeTeamId];
      pokeDefTeam.name = req.body.name;
      res.send(pokeDefTeam);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  browsePokemon,
  browseTeam,
  browseDefTeam,
};
