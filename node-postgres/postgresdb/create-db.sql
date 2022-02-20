create table Person (
   id serial not null primary key,
   name varchar(255),
   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
