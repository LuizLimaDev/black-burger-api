CREATE DATABASE black_burger;

CREATE TABLE IF NOT EXISTS users(
  id serial primary key,
  name varchar(100) not null,
  email varchar(100) not null unique,
  phone varchar(14) not null,
  password text not null,
  favorites_products int
)

CREATE TABLE IF NOT EXISTS users_thirdservice(
  id serial primary key,
  name varchar(100) not null,
  email varchar(100) not null unique,
  iamge varchar(500) not null,
  favorites_products int
)

CREATE TABLE IF NOT EXISTS products_categories(
	id serial primary key,
  name varchar(100) not null
)

CREATE TABLE IF NOT EXISTS products(
	id serial primary key,
  img text not null,
  name varchar(100) not null,
  description text not null,
  price int not null,
  category_id int references products_categories(id)
)

CREATE TABLE IF NOT EXISTS user_favorites(
 	id serial primary key,
  user_id int references users(id),
  product_id int references products(id)
)

CREATE TABLE IF NOT EXISTS user_order(
	id serial primary key,
  user_id int references users(id),
  adress text not null,
  cpf varchar(11) not null,
  payment_type varchar(50) not null,
  price int,
  discount int,
  tax int,
  total_price int,
  creat_at timestamp default now()
)

CREATE TABLE IF NOT EXISTS order_item(
	id serial primary key,
  order_id int references user_order(id) not null,
  product_id int references products(id) not null,
  quantity int not null,
  create_at time(0) default now()
)

CREATE TABLE IF NOT EXISTS users_admin(
	id serial primary key,
  name varchar(100),
  email varchar(100),
  password text
)

DROP TABLE user_favorites

CREATE TABLE IF NOT EXISTS category_type (
 id serial primary key,
name varchar(100) not null
)

ALTER TABLE products
ADD product_type int
references category_type(id)
