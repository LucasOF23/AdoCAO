# Instalando 

## Banco de dados

O banco utilizado é o PostgreSQL. Tenha ele instalado e crie um banco de dados, 
esquema e usuário para o projeto. Para conectar no postgres pela primeira vez,
o comando usual é:

`sudo -u postgres psql`

Depois, a sequência de comandos a seguir deve criar tudo que é necessários:

```
CREATE DATABASE adocao;
\c adocao;
CREATE SCHEMA adocao;
CREATE USER adocao_admin WITH ENCRYPTED PASSWORD 'adocao_admin';
GRANT ALL PRIVILEGES ON DATABASE adocao TO adocao_admin;
GRANT ALL PRIVILEGES ON SCHEMA adocao TO adocao_admin;
```

Modifique o nome de usuário e a senha caso ache necessário.

## Arquivo de configuração

Faça uma cópia do arquivo ".env.example" para ".env", e edite quaisquer dados necessários
no novo ".env" (deixe o de exemplo quieto).

## Resto

Execute o `npm install`. Depois, rode `npm dbsync.js` para criar as tabelas do banco de dados.

# Executando

`npm run dev`

