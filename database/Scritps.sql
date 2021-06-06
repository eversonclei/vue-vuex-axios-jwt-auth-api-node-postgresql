/* 
	Scripts: Autenticação de usuários em Vue + Bootstrap-Vue + Vue-Gravatar + Vue-Toasted + Axios + JWT + Backend NodeJS + PostgreSQL !!!
	Autor: Everson Clei	
*/	

	
CREATE DATABASE auth WITH OWNER = postgres ENCODING = 'UTF8';

CREATE TABLE public.users (
  id SERIAL,
  name VARCHAR(100),
  email VARCHAR(100),
  password VARCHAR(100),
  admin BOOLEAN DEFAULT false,
  "deletedAt" TIMESTAMP(0) WITHOUT TIME ZONE,  
  CONSTRAINT users_email_key UNIQUE(email),
  CONSTRAINT users_pkey PRIMARY KEY(id)
) 
WITH (oids = false);

ALTER TABLE public.users ALTER COLUMN id SET STATISTICS 0;

ALTER TABLE public.users OWNER TO postgres;

/* 
	Usuário Mock Padrão: admin@gmail.com - Senha: 123  
*/
INSERT INTO public.users ("id", "name", "email", "password", "admin")
VALUES 
  (1, E'Admin', E'admin@gmail.com', E'$2a$10$rQMnhydle5AS7Lii7riM.ewWV0iG3zNFJUUXEHa2nKJ6hB9KNhUeK', True);  
  
  