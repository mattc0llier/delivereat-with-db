create database beer_db

CREATE TABLE menu (
  id serial PRIMARY KEY,
  name varchar (50) NOT NULL,
  price numeric default 0,
  image varchar (100)
);


CREATE TABLE purchase (
  id serial PRIMARY KEY,
  purchaseTime VARCHAR
);



CREATE TABLE menu_purchase (
  id serial PRIMARY KEY,
  quantity INT default 0,
  menu_id INT NOT NULL,
  purchase_id INT NOT NULL,
  FOREIGN KEY (menu_id) REFERENCES menu (id),
  FOREIGN KEY (purchase_id) REFERENCES purchase (id)
);


-- menu table
INSERT INTO public.menu
(name, price, image)
VALUES('Gamma Ray', 400, './static/img/gamma_1600x1600.jpg');

INSERT INTO public.menu
(name, price, image)
VALUES('Neck Oil', 500, './static/img/neck_oil_1600x1600.jpg');

INSERT INTO public.menu
(name, price, image)
VALUES('Lupuloid', 600, './static/img/lpuloid_1600x1600.jpg');

INSERT INTO public.menu
(name, price, image)
VALUES('8  Ball', 300, './static/img/8_ball_1600x1600.jpg');
