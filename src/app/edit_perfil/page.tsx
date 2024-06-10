"use client";
import Image from "next/image";
import { useState } from "react";

import { FormsInput } from "@/components/FormsInput";
import { FormsSel } from "@/components/FormsSel";

import { ProfileInfo_edit } from "@/types/profile";

export type FormsInputProps = {
  info: ProfileInfo_edit;
};

export default function EditPerfil({ info }: FormsInputProps) {
  const ask_nome = <FormsInput key={0} title="Nome"></FormsInput>;
  const ask_email = <FormsInput key={1} title="Email"></FormsInput>;
  const ask_celular = <FormsInput key={2} title="Celular"></FormsInput>;
  const ask_df = (
    <FormsSel
      key={3}
      title="DF"
      items={[
        { id: 0, label: "SP" },
        { id: 1, label: "SC" },
        { id: 2, label: "MG" },
      ]}
    ></FormsSel>
  );
  const ask_cidade = <FormsInput key={4} title="Cidade"></FormsInput>;
  const ask_tipomoradia = (
    <FormsSel
      key={5}
      title="Tipo Moradia"
      items={[
        { id: 0, label: "casa" },
        { id: 1, label: "apartamento" },
        { id: 2, label: "chácara" },
        { id: 3, label: "sítio" },
        { id: 4, label: "outro" },
      ]}
    ></FormsSel>
  );
  
  const botao_confirmar = (
      <button key={100} className='btn w-full h-full bg-indigo-400 rounded-lg'>Submeter</button>
  );
  
  // const imageUrl = "https://static.wikia.nocookie.net/monica/images/d/d1/Tonh%C3%A3o_da_Rua_de_Baixo_botando_o_terror.png/revision/latest?cb=20200722132605&path-prefix=pt-br";
  return (
    <div className="grid content-center justify-items-center w-min-full pl-[50px] pr-[50px] pt-[50px] md:p-[20px]">
      <div
        className="flex flex-col md:flex-row md:h-[500px]
            md:w-[700px] w-full border-solid border-[5px] border-indigo-400
              min-w-[200px] rounded-lg md:space-x-[20px]"
      >
        <div className="w-full h-full pb-[75%] md:pb-[0px] md:w-[400px] md:h-full bg-yellow-500">
          {/* <Image
                  alt="Sua imagem"
                  className="object-cover w-full h-full"
                  src={imageUrl}
                  width={1000}
                  height={1000}
              /> */}
        </div>
        <div className="flex flex-col md:borderl-[30px] justify-between p-[10px] md:w-full md:max-w-[1000px] min-w-min">
          <div className="flex justify-center text-[20px]">
            Coloque seus dados aqui
          </div>
          {ask_nome}
          {ask_email}
          {ask_celular}
          <div className='min-w-min'>{ask_df}</div>
          {ask_cidade}
          <div className='min-w-min'>{ask_tipomoradia}</div>
          <div className='pt-[10px]'>
            <div className='flex flex-col justify-center align-center h-[30px]'>{botao_confirmar}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
