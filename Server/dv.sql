create database weather;
use weather;
create table users (
	email_id varchar(225) not null unique,
    username varchar(225) not null,
    password varchar(225) not null,
    primary key(email_id)
);
insert into users values ( 'snehaadoss2015@gmail.com' , 'snehaa' , 'rk' );
select * from users;

create table favorites ( 
	email_id varchar(225) not null,
	city varchar(225) not null
);
insert into favorites values ( 'snehaadoss2015@gmail.com' , 'chennai' );
select * from favorites;

