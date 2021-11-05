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
