DROP TABLE IF EXISTS `item`;

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,  
  `email` varchar(255) NOT NULL,
  `score` int NOT NULL DEFAULT 0,
  `fights_done` int NOT NULL DEFAULT 0,
  `hashedPassword` varchar(255) NOT NULL,
  `admin` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO
  user (name, email, hashedPassword, admin)
VALUES
  ('admin', 'admin@gmail.com', '$argon2id$v=19$m=65536,t=3,p=1$CIEbKZNo6pCTTsu8tgQU2Q$T4Iidc3Kbnksn02Q6C2v+NF+8590r4UcHAhckpBll/Q',1),
  ('Romain', 'timmer@gmail.com', '$argon2id$v=19$m=65536,t=3,p=1$IiwgyuOQ6m8uekQH4Tz/Qg$GQr4Y1wC/2BXn2TF/qPApUxqU7pZxXao7AXgu1wX5kk',1),
  ('Rémy',  'bernardin@gmail.com', '$argon2id$v=19$m=65536,t=3,p=1$W5LUI7siqBwBAVUpolk+sw$v6rdgSw0Y8by65NXjMB3HIxDAULTuKd98+2Xw/+3SUw',0),
  ('Lucas' , 'fasilleau@gmail.com', '$argon2id$v=19$m=65536,t=3,p=1$1t06KFrossBRrBAGepe9uQ$h3qFJ46mWsgcrJ+y7WhrVd4RLqhGVZ1PafAtoouTmxk',0),
  ('Léon', 'versavel@gmail.com', '$argon2id$v=19$m=65536,t=3,p=1$dvW02UvenzYp2hVvtviP6w$gp1lRRDpVUZBe91mvB/bgbRqtxY6dGSA37J93opOkCQ',0);


DROP TABLE IF EXISTS `fight`;
 CREATE TABLE fight (
    id int primary key NOT NULL AUTO_INCREMENT,
    attack_user_id INTEGER ,
    def_user_id INTEGER ,
    winner_id INTEGER,    
    fight_date datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (attack_user_id) REFERENCES user(id) ON DELETE CASCADE,
    FOREIGN KEY (def_user_id) REFERENCES user(id) ON DELETE CASCADE,
    FOREIGN KEY (winner_id) REFERENCES user(id) ON DELETE CASCADE
); 

DROP TABLE IF EXISTS `team`;
CREATE TABLE team (    
    user_id int NOT NULL,
    poke1 int NOT NULL,
    poke2 int NOT NULL,
    poke3 int NOT NULL,
    poke4 int NOT NULL,
    poke5 int NOT NULL,
    poke6 int NOT NULL, 
    poke7 int NOT NULL, 
    poke8 int NOT NULL,     
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE,
    UNIQUE KEY `user_id` (`user_id`)    
) ENGINE = InnoDB DEFAULT CHARSET = utf8;
