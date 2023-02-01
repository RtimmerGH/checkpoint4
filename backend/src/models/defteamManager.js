/* eslint-disable no-param-reassign */
const AbstractManager = require("./AbstractManager");

class defteamManager extends AbstractManager {
  constructor() {
    super({ table: "def_team" });
  }

  insert(team) {
    return this.connection.query(
      `insert into ${this.table} (user_id, poke1, poke2, poke3, poke4, poke5) values (?, ?, ?, ?, ?, ?)`,
      [team.userId, team.poke1, team.poke2, team.poke3, team.poke4, team.poke5]
    );
  }
}

module.exports = defteamManager;
