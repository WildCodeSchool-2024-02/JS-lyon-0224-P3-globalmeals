create table menu (
  id int unsigned primary key auto_increment not null,
  name varchar(100) not null,
  continent varchar(100) not null,
  picture varchar(250) not null,
  starter varchar(100) not null,
  dish varchar(100) not null,
  dessert varchar(100) not null,
  cocktail varchar(100) not null
);

create table recipe (
  name varchar(100) not null,
  dish_picture varchar(250) not null,
  ingredient varchar(100) not null,
  step varchar(100) not null,
  step_time varchar(100) not null,
  cooking_time varchar(100) not null,
  foreign key(menu_id) references menu(id)
);



