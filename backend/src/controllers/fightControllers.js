const models = require("../models");

const add = (req, res) => {
  if (parseInt(req.payload.sub, 10) !== req.body.attackUserId) {
    res.sendStatus(403);
  } else {
    models.fight
      .insert(req.body)
      .then(([result]) => {
        if (result.affectedRows === 0) {
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
};

const browse = (req, res) => {
  models.fight
    .findAll()
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const ranking = (req, res) => {
  models.fight
    .findRanking()
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  add,
  browse,
  ranking,
};
