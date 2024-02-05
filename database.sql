-- users table 
create table users(
  user_id serial primary key,
  email varchar(255) unique not null,
  password varchar(255) not null,
  created_at date default current_date
);

CREATE TABLE maths (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    cover_img VARCHAR(255),
    page TEXT[] -- Assuming "page" is an array of text, adjust the data type as needed
);
