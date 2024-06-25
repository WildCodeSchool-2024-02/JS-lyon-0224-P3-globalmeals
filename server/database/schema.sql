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
  step_time varchar(100) not null,
  type varchar(15) not null,
  image varchar(255)
);

CREATE TABLE menu_recipe (
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
  menu_id INT UNSIGNED NOT NULL,
  recipe_id INT UNSIGNED NOT NULL,
  FOREIGN KEY (menu_id) REFERENCES menu(id),
  FOREIGN KEY (recipe_id) REFERENCES recipe(id)
);