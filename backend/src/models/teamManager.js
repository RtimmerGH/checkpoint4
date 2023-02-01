/* eslint-disable no-param-reassign */
const AbstractManager = require("./AbstractManager");

class teamManager extends AbstractManager {
  constructor() {
    super({ table: "team" });
  }

  insert(team) {
    return this.connection.query(
      `insert into ${this.table} (user_id, poke1, poke2, poke3, poke4, poke5, poke6, poke7, poke8) values (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        team.userId,
        team.poke1,
        team.poke2,
        team.poke3,
        team.poke4,
        team.poke5,
        team.poke6,
        team.poke7,
        team.poke8,
      ]
    );
  }

  findAllForUser(userId) {
    return this.connection.query(
      `select attack_user_id, def_user_id, winner_id from ${this.table} where attack_user_id = ? or def_user_id = ?`,
      [userId, userId]
    );
  }
}

module.exports = teamManager;
