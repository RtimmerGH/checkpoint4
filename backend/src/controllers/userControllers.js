const models = require("../models");

const browse = (req, res) => {
  if (req.body.admin !== 1) {
    res.sendStatus(403);
  } else {
    models.user
      .findAllUsers()
      .then(([rows]) => {
        res.send(rows);
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  }
};

const read = (req, res) => {
  if (
    parseInt(req.params.id, 10) !== parseInt(req.payload.sub, 10) &&
    req.body.admin !== 1
  ) {
    res.sendStatus(403);
  } else {
    models.user
      .findUser(req.params.id)
      .then(([rows]) => {
        if (rows[0] == null) {
          res.sendStatus(404);
        } else {
          res.send(rows[0]);
        }
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  }
};

const edit = (req, res) => {
  const user = req.body;
  // TODO validations (length, format...)
  user.id = parseInt(req.params.id, 10);
  if (user.id !== parseInt(req.payload.sub, 10) && user.admin !== 1) {
    res.sendStatus(403);
  } else {
    models.user
      .update(user)
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

const add = (req, res) => {
  const user = req.body;

  // TODO validations (length, format...)

  models.user
    .insert(user)
    .then(([result]) => {
      res.location(`/users/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("L'adresse email est déjà utilisé");
    });
};

const destroy = (req, res) => {
  const user = req.body;
  user.id = parseInt(req.params.id, 10);
  if (user.id !== parseInt(req.payload.sub, 10) && user.admin !== 1) {
    res.sendStatus(403);
  } else {
    models.user
      .delete(req.params.id)
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

const getUserByEmailWithPasswordAndPassToNext = (req, res, next) => {
  const { email } = req.body;

  models.user
    .getUserByEmail(email)
    .then(([users]) => {
      if (users[0] != null) {
        // eslint-disable-next-line prefer-destructuring
        req.user = users[0];
        next();
      } else {
        res.status(401).send("La combinaison Email/Mot de passe est incorrect");
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};

const changePassword = (req, res) => {
  const user = req.body;

  // TODO validations (length, format...)

  models.user
    .updatePassword(user)
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
};

module.exports = {
  browse,
  read,
  edit,
  add,
  destroy,
  getUserByEmailWithPasswordAndPassToNext,
  changePassword,
};
