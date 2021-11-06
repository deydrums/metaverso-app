CREATE DATABASE IF NOT EXISTS metaverso;
USE metaverso;

CREATE TABLE users(
id              int(255) auto_increment not null,
name            varchar(50) NOT NULL,
dpi             varchar(100),
image           text,
tel             varchar(255),
birthday        varchar(255),
gender          varchar(255),
email           varchar(255) NOT NULL,
password        text NOT NULL,
created_at      datetime DEFAULT NULL,
updated_at      datetime DEFAULT NULL,
CONSTRAINT pk_users PRIMARY KEY(id),
UNIQUE KEY unique_email (email)

)ENGINE=InnoDb;

CREATE TABLE IF NOT EXISTS events(
id                      int(255) auto_increment not null,
user_id                 int(255) not null,
location                text,
description             text,
created_at              datetime,
updated_at              datetime,
CONSTRAINT pk_events PRIMARY KEY (id),
CONSTRAINT fk_events_users FOREIGN KEY(user_id) REFERENCES users(id)
)ENGINE=InnoDb; 

CREATE TABLE IF NOT EXISTS participants(
id                      int(255) auto_increment not null,
user_id                 int(255) not null,
event_id                int(255) not null,
created_at              datetime,
updated_at              datetime,
CONSTRAINT pk_participants PRIMARY KEY (id),
CONSTRAINT fk_participants_users FOREIGN KEY (user_id) REFERENCES users(id),
CONSTRAINT fk_participants_events FOREIGN KEY (event_id) REFERENCES events(id)
)ENGINE=InnoDb; 


SELECT u.name AS 'Participantes' 
FROM users u, participants p
WHERE p.event_id = 1 GROUP BY u.id;


SELECT u.name AS 'Participantes',e.description AS 'Evento' 
FROM users u, participants p, events e
WHERE p.event_id = 1 GROUP BY u.id;


SELECT u.*
FROM users u
INNER JOIN participants p ON p.user_id = u.id
INNER JOIN events e ON p.event_id = e.id
WHERE p.event_id = 1 GROUP BY u.id;

SELECT e.*, u.name AS user
FROM users u
INNER JOIN events e ON e.user_id = u.id;

