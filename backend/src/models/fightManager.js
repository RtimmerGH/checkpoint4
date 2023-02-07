/* eslint-disable no-param-reassign */
const AbstractManager = require("./AbstractManager");

class fightManager extends AbstractManager {
  constructor() {
    super({ table: "fight" });
  }

  insert(fight) {
    return this.connection.query(
      `insert into ${this.table} (attack_user_id, def_user_id, winner_id) values (?, ?, ?)`,
      [fight.attackUserId, fight.defUserId, fight.winnerId]
    );
  }

  findAllForUser(userId) {
    return this.connection.query(
      `select attack_user_id, def_user_id, winner_id from ${this.table} where attack_user_id = ? or def_user_id = ?`,
      [userId, userId]
    );
  }

  findRanking() {
    return this.connection.query(
      `SELECT user.name,winner_id,COUNT( winner_id) as num FROM ${this.table} inner join user on user.id = fight.winner_id group by winner_id order by num DESC;`
    );
  }
}

module.exports = fightManager;
