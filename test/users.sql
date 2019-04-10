create table users (
  id serial primary key,
  username varchar (100) unique not null,
  password varchar (100) not null,
  age numeric,
  height numeric,
  weight numeric
);
