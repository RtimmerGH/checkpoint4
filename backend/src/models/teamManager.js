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
        team.poke[0],
        team.poke[1],
        team.poke[2],
        team.poke[3],
        team.poke[4],
        team.poke[5],
        team.poke[6],
        team.poke[7],
      ]
    );
  }

  update(team) {
    return this.connection.query(
      `update ${this.table} set poke1 = ?, poke2 = ?, poke3 = ?, poke4 = ?, poke5 = ?, poke6 = ?, poke7 = ?, poke8 = ? where user_id = ?`,
      [
        team.poke[0],
        team.poke[1],
        team.poke[2],
        team.poke[3],
        team.poke[4],
        team.poke[5],
        team.poke[6],
        team.poke[7],
        team.userId,
      ]
    );
  }

  findAllForUser(userId) {
    return this.connection.query(
      `select * from ${this.table} where user_id = ?`,
      [userId]
    );
  }

  findRandomUser() {
    return this.connection.query(
      `select user_id,user.name from ${this.table} inner join user on user_id = user.id order by RAND() LIMIT 2 `
    );
  }
}

module.exports = teamManager;
