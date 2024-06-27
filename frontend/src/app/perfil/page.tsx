"use client";

import Image from "next/image";

import { useState } from "react";

import { CopyText } from "@/components/CopyText";
import Navbar from "@/components/Navbar2";
import HrefButton from "@/components/HrefButton";
import { ProfileInfo } from "@/types/profile";
import { DogInfo } from "@/types/dog";
import { unescape } from "querystring";
import Lowerbar from "@/components/Lowerbar";
import EditableLabel from "@/components/EditableLabel";
import EditableImg from "@/components/EditableImg";
import FormsEditProfile from "@/components/Forms-Edit-Profile";
import { profile } from "console";

export default function EditPerfil() {
  const profileInfo: ProfileInfo = {
    id: 1,
    user_type: "user",
    name: "Tonhão",
    location: {
      city: "São Carlos",
      state: "SP",
    },
    adress: "Rua dos bobos numero zero",
    cnpj: "123.456.789-00",
    animals: [],
    membersEmail: [],
    managerEmail: "",
    contato: {
      email: "toinhodosfoguetes@nasa.gov",
      insta: "@tonhaomalucao",
      face: "Antonio da Silva",
      telefone: "(01) 2345 - 7890",
      outro: "Meu twitter: @tonhaotwitteroficial",
    },
    Description: "",
  };

  return (
    <>
      <Navbar />
      <div className="mx-auto pt-[2vw] screen-max-width">
        <div className="w-full">
          <div>
            <h1 className="text-5xl font-bold text-center pt-5">Meu Perfil</h1>
          </div>
          
          <hr />
          <div className="pt-4 mx-auto max-w-fit">
            <FormsEditProfile info_perfil={profileInfo}></FormsEditProfile>
          </div>
        </div>
      </div>
      <hr />
      <div className="p-4 mx-auto screen-max-width grid justify-items-center grid-autofit gap-4">
        {/* <div className="py-7 px-10 bg-purple-600 rounded-md"><HrefButton href='/edit_perfil'>Editar Perfil</HrefButton></div>
        <div className="py-7 px-10 bg-purple-600 rounded-md"><HrefButton href='/trocar_senha'>Trocar Senha</HrefButton></div>
        <div className="py-7 px-10 bg-rose-600 rounded-md"><HrefButton href='/confirmar_apagar'>Apagar Perfil</HrefButton></div> */}
      </div>
      <Lowerbar />
    </>
  );
}
