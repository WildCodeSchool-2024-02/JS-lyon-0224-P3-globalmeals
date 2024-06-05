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
