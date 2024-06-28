# AdoCÃO

Esse projeto, iniciado como atividade da disciplina de Engenharia de Software e Introdução ao Desenvolvimento Web por alunos do curso bacharelado em ciências de computação da Universidade de São Paulo, tem como objetivo criar uma plataforma web para facilitar a adoção de pets sob posse de ONG's e outros usuários. Um dos principais objetivos dessa inciativa é diminuir o fluxo de novos animais para dentro das ONG's responsáveis por realizar esse acolhimento, assim evitando uma possível superlotação delas. Além disso, é imperativo que seja garantido a melhor qualidade de vida para esses animais, seja em posse de ONG's com espaço para providencia-la ou em posse de novos donos, sendo o objetivo dessa plataforma levar esses animais necessitados aos seus devidos lares.

# Instalando 

## Frontend

First, install and run the development server:

```bash
cd frontend
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Backend

### Banco de dados

O banco utilizado é o PostgreSQL. Tenha ele instalado e crie um banco de dados  
e usuário para o projeto. Para conectar no postgres pela primeira vez,
o comando usual é:

`sudo -u postgres psql`

Depois, a sequência de comandos a seguir deve criar tudo que é necessários:

```
CREATE DATABASE adocao;
\c adocao;
CREATE USER adocao_admin WITH ENCRYPTED PASSWORD 'adocao_admin';
GRANT ALL PRIVILEGES ON DATABASE adocao TO adocao_admin;
GRANT ALL PRIVILEGES ON SCHEMA public TO adocao_admin;
```

Modifique o nome de usuário e a senha caso ache necessário.

#### Arquivo de configuração

Faça uma cópia do arquivo ".env.example" para ".env", e edite quaisquer dados necessários
no novo ".env" (deixe o de exemplo quieto).

### MinIO

Siga o tutorial de exemplo básico do site.

### Resto

Execute o `npm install`. Depois, rode `node dbsync.js` para criar as tabelas do banco de dados.

### Executando

`npm run dev`

## Momento Atual

Atualmente o software tem apenas as suas necessidades mais básicas em funcionamento, conseguindo realizar postagens, editá-las, marcar elas como concluídas, e até mesmo a parte de gerenciamento das ONG's criando os usuários delas, apontando colaboradores, etc. O próximo rumo que esse software deveria tomar para qualquer um interessado em continuar o projeto seria gastar um tempo para melhorar o aspecto visual do site (que não é ruim mas poderia ser melhor), passar a pegar imagens dos usuários também e ongs oque não fizemos pelo prazo e pela dificuldade, implementar novos sistemas para garantir a qualidade da comunidade (como recuperar a senha e denunciar usuários) e então partir para expansões como criação de chats entre usuários por exemplo. O software tem muito potencial para evoluir e, caso queira fazer parte desse projeto, sinta-se a vontade para utilizar nosso código.

## Pessoas

Os principais membros envolvidos no desenvolvimento desse software são:

- Lucas de Oliveira Ferreira
- Bruno Matheus Foschiani Ricardo
- Allan Garcia Cavalcante e Silva
- Téo Sobrino Alves 
- Miguel Prates Ferreira de Lima Cantanhede
- Arthur Queiroz Moura

Com o suporte das professoras:

- Bruna Carolina Rodrigues da Cunha
- Rosana Teresinha Vaccare Braga
- Simone do Rocio Senger de Souza

## Apoiadores

Nosso produto controu com o apoio principalmente da instituição 'Arca de São Francisco', uma ONG de São Carlos - SP voltada principalmente para o resgate e adoção de animais, que nos guiou nos moldes em que deveriamos projetar o produto para atender as principais necessidades dos futuros usuários. Estendemos um agradeciamento especial para o nosso contato na instituição, o Jil, que sempre teve disposição para nos ajudar.
