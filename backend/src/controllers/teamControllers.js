const models = require("../models");

const add = (req, res) => {
  if (parseInt(req.payload.sub, 10) !== req.body.userId) {
    res.sendStatus(403);
  } else {
    models.team
      .findAllForUser(req.body.userId)
      .then(([result]) => {
        if (result[0] == null) {
          models.team
            .insert(req.body)
            .then(([result2]) => {
              if (result2.affectedRows === 0) {
                res.sendStatus(404);
              } else {
                res.sendStatus(204);
              }
            })
            .catch((err) => {
              console.error(err);
              res.sendStatus(500);
            });
        } else {
          models.team
            .update(req.body)
            .then(([result2]) => {
              if (result2.affectedRows === 0) {
                res.sendStatus(404);
              } else {
                res.sendStatus(204);
              }
            })
            .catch((err) => {
              console.error(err);
              res.sendStatus(500);
            });
        }
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  }
};

const browse = (req, res) => {
  models.team
    .findAll()
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

async function movePokeIntoArray(pokeList, id) {
  const response = {};
  response.userId = id;
  response.poke = [];
  // const promises = [];
  for (let i = 0; i < 8; i += 1) {
    response.poke.push(pokeList[`poke${(i + 1).toString()}`]);
    // console.log(response);
  }
  return Promise.all(response.poke).then(() => {
    return response;
    // eslint-disable-next-line prettier/prettier
        });      
}

const read = (req, res) => {
  models.team
    .findAllForUser(req.params.id)
    .then(([rows]) => {
      if (rows[0] == null) {
        res.sendStatus(404);
      } else {
        movePokeIntoArray(rows[0], req.params.id).then((response) => {
          res.send(response);
        });
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const readDef = (req, res, next) => {
  models.team
    .findAllForUser(req.params.id)
    .then(([rows]) => {
      if (rows[0] == null) {
        res.sendStatus(404);
      } else {
        movePokeIntoArray(rows[0], req.params.id).then((response) => {
          req.body.poke = response.poke;
          next();
        });
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const readRandomUser = (req, res, next) => {
  const userId = parseInt(req.params.id, 10);
  models.team
    .findRandomUser()
    .then(([rows]) => {
      if (rows[0] == null) {
        res.sendStatus(404);
      } else if (rows[0].user_id !== userId) {
        req.params.id = rows[0].user_id;
        req.body.name = rows[0].name;
        next();
      } else {
        req.params.id = rows[1].user_id;
        req.body.name = rows[1].name;
        next();
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  add,
  read,
  readDef,
  browse,
  readRandomUser,
};
