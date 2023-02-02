const models = require("../models");

const add = (req, res) => {
  if (parseInt(req.payload.sub, 10) !== req.body.userId) {
    res.sendStatus(403);
  } else {
    models.defteam
      .findAllForUser(req.body.userId)
      .then(([result]) => {
        if (result[0] == null) {
          models.defteam
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
          models.defteam
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
  models.def_team
    .findAll()
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
};
