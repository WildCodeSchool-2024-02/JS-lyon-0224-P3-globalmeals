create table menu (
  id int unsigned primary key auto_increment not null,
  name varchar(100) not null,
  starter varchar(100) not null,
  picture_starter varchar(250) not null,
  starter_preparation_time varchar(100) not null,
  dish varchar(100) not null,
  picture_dish varchar(250) not null,
  dish_preparation_time varchar(100) not null,
  dessert varchar(100) not null,
  picture_dessert varchar(250) not null,
  dessert_preparation_time varchar(100) not null,
  cocktail varchar(100) not null,
  picture_cocktail varchar(250) not null,
  cocktail_preparation_time varchar(100) not null
);

create table recipe (
  id int unsigned primary key auto_increment not null,
  name varchar(100) not null,
  dish_picture varchar(250) not null,
  ingredient varchar(100) not null,
  step varchar(100) not null,
  step_time varchar(100) not null,
  cooking_time varchar(100) not null,
  menu_id int unsigned not null,
  foreign key(menu_id) references menu(id)
);
