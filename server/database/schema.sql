create table menu (
  id int unsigned primary key auto_increment not null,
  continent varchar(100) not null,
  country varchar(100) not null
);

create table recipe (
  id int unsigned primary key auto_increment not null,
  name varchar(100) not null,
  ingredient TEXT not null,
  step TEXT not null,
  -- step_time varchar(100) not null,
  type varchar(15) not null,
  image varchar(255),
  menu_id INT UNSIGNED NOT NULL,
  FOREIGN KEY (menu_id) REFERENCES menu(id)
  );

CREATE TABLE user (
    id INT unsigned PRIMARY KEY AUTO_INCREMENT NOT NULL,
    username VARCHAR(30) UNIQUE NOT NULL,
    mail VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);