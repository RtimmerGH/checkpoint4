const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    super({ table: "user" });
  }

  findUser(id) {
    return this.connection.query(
      `select id, name, email, score, fights_done, admin, team.poke1 from ${this.table} left join team on id = team.user_id where id = ?`,
      [id]
    );
  }

  findAllUsers() {
    return this.connection.query(
      `select id, name, email, score, fights_done, admin from  ${this.table}`
    );
  }

  insert(user) {
    return this.connection.query(
      `insert into ${this.table} (name, email, hashedPassword) values (?,?,?)`,
      [user.name, user.email, user.hashedPassword]
    );
  }

  update(user) {
    return this.connection.query(
      `update ${this.table} set name = ?, email = ? where id = ?`,
      [user.name, user.email, user.id]
    );
  }

  updatePassword(user) {
    return this.connection.query(
      `update ${this.table} set hashedPassword = ? where id = ?`,
      [user.hashedPassword, user.id]
    );
  }

  getUserByEmail(email) {
    return this.connection.query(
      `select name, email, hashedPassword, id, admin, score, fights_done, team.poke1 from ${this.table} left join team on id = team.user_id where email = ?`,
      [email]
    );
  }

  // getUserByEmail(email) {
  //   return this.connection.query(
  //     `select name, email, hashedPassword, id, admin from ${this.table} where email = ?`,
  //     [email]
  //   );
  // }
}

module.exports = UserManager;
