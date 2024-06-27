import Image from "next/image";

export default function Lowerbar() {
  return (
    <>
      <div className="border-b-2 bg-purple-300">
        <div className="my-20 mx-auto min-mx-5 screen-max-width grid justify-items-center grid-autofit items-center">
          <div>
            <h1 className="font-bold text-2xl text-center my-10">Sobre o Projeto</h1>
            <div className="text-justify mx-5 mb-10">
              Esse projeto, iniciado como atividade da disciplina de Engenharia de Software e Introdução 
              ao Desenvolvimento Web por alunos do curso bacharelado em ciências de computação da Universidade 
              de São Paulo, tem como objetivo criar uma plataforma web para facilitar a adoção de pets sob posse 
              de ONG's e outros usuários. Um dos principais objetivos dessa inciativa é diminuir o fluxo de novos 
              animais para dentro das ONG's responsáveis por realizar esse acolhimento, assim evitando uma possível 
              superlotação delas. Além disso, é imperativo que seja garantido a melhor qualidade de vida para esses 
              animais, seja em posse de ONG's com espaço para providencia-la ou em posse de novos donos, sendo o 
              objetivo dessa plataforma levar esses animais necessitados aos seus devidos lares.
            </div>
          </div>
          <Image alt="AdoCÃO logo" src="/logo.svg" width={400} height={400} />
        </div>
      </div>
    </>
  );
}
