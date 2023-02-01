const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const models = require("../models");

const hashPassword = (req, res, next) => {
  // hash the password using argon2 then call next()
  argon2
    .hash(req.body.password, {
      type: argon2.argon2id,
      memory: 15360,
      iterations: 2,
      parallelism: 1,
    })
    .then((hashedPassword) => {
      // do something with hashedPassword
      req.body.hashedPassword = hashedPassword;
      delete req.body.password;
      next();
    })
    .catch((err) => {
      // do something with err
      console.error(err);
      res.sendStatus(500);
    });
};

const verifyPassword = (req, res) => {
  argon2
    .verify(req.user.hashedPassword.toString(), req.body.password)
    .then((isVerified) => {
      if (isVerified) {
        const token = jwt.sign(
          { sub: req.user.id.toString() },
          process.env.JWT_SECRET,
          { expiresIn: "24h" }
        );
        delete req.user.hashedPassword;
        res.status(200).json({
          token,
          user: req.user,
        });
      } else {
        res.status(401).send("La combinaison Email/Mot de passe est incorrect");
      }
    })
    .catch((err) => {
      // do something with err
      console.error(err);
      res.sendStatus(500);
    });
};

const verifyPasswordBeforeChangingIt = (req, res, next) => {
  argon2
    .verify(req.user.hashedPassword.toString(), req.body.password)
    .then((isVerified) => {
      if (isVerified) {
        req.body.password = req.body.newPassword;
        req.body.id = req.user.id;
        delete req.user.hashedPassword;
        next();
      } else {
        res.sendStatus(401);
      }
    })
    .catch((err) => {
      // do something with err
      console.error(err);
      res.sendStatus(500);
    });
};

const verifyToken = (req, res, next) => {
  try {
    const authorizationHeader = req.get("Authorization");
    if (authorizationHeader == null) {
      throw new Error("Authorization header is missing!");
    } else {
      const auth = req.get("authorization").split(" ");
      const type = auth[0];
      const token = auth[1];

      if (type !== "Bearer") {
        throw new Error("Authorization header has not the 'Bearer' type");
      } else {
        req.payload = jwt.verify(token, process.env.JWT_SECRET);
        next();
      }
    }
  } catch (err) {
    console.error(err);
    res.sendStatus(401);
  }
};

const verifyAdmin = (req, res, next) => {
  models.user
    .findUser(req.payload.sub)
    .then(([rows]) => {
      if (rows[0] == null) {
        res.sendStatus(404);
      } else {
        req.body.admin = rows[0].admin;
        next();
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const replaceReqParamIdByPayloadSub = (req, res, next) => {
  try {
    req.params.id = req.payload.sub;
    next();
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};
module.exports = {
  hashPassword,
  verifyPassword,
  verifyToken,
  verifyAdmin,
  replaceReqParamIdByPayloadSub,
  verifyPasswordBeforeChangingIt,
};
