create database dindin

drop table if exists usuarios cascade;
create table usuarios(
  id serial primary key,
  nome varchar(150) not null,
  email varchar(150) not null unique,
  senha text
);

drop table if exists categorias cascade;
create table categorias(
  id serial primary key,
  descricao varchar(50) not null
);

drop table if exists transacoes cascade;
create table transacoes(
  id serial primary key,
  categoria_id int not null references categorias(id),
  usuario_id int not null references usuarios(id),
  valor bigint not null,
  data timestamp not null,  
  descricao text not null,
  tipo varchar(7) not null
); 