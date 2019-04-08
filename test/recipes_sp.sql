create table recipes_sp (
  id serial primary key,
  energy double precision,
  saturated_fat double precision,
  trans_fat double precision,
  sugar double precision,
  protein double precision,
  soy boolean,
  image_url_large text,
  breakfast integer
);
