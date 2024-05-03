"use client";

import Image from "next/image";

import { useState } from "react";

import Navbar from "@/components/Navbar2";
import { ProfileInfo } from "@/types/profile";
import { unescape } from "querystring";
import Lowerbar from "@/components/Lowerbar";

export default function AdoptionPosts() {
    const profileInfo: ProfileInfo = 
        {
          id: 1,
          name: "Zeca",
          location: { city: "São Carlos", state: "São Paulo" },
          imageUrl: "https://images.dog.ceo/breeds/lhasa/n02098413_7389.jpg",
          cellphone: "(16) 9xxxx-xxxx",
          email: "zeca@estadual.com.br",
          animals: [{
            id: 9,
            name: "J. Robert Oppenheimer",
            imageUrl: "https://images.dog.ceo/breeds/boxer/n02108089_2791.jpg",
            owner: {
              kind: "user",
              name: "Zeca",
            },
            location: {
              city: "Zurich",
              state: "SW",
            },
            gender: "male",
            ageInYears: 1,
            weightInKg: 4,
            heightInCm: 20,
            species: "Cachorro",
            breed: "Boxer",
            isNeutered: true,
            isDewormed: true,
            tags: ["Energético", "Amável", "Explosivo"],
          }]
        }
    ;

    const [mobile, setMobile] = useState(false);

    return (
    <>
      <Navbar />
      <div className="p-4 screen-max-width grid justify-items-center grid-autofit ">
        <Image
            alt={`Imagem do Perfil ${profileInfo.name}`}
            className="object-cover"
            src={profileInfo.imageUrl}
            width={400}
            height={400}
          />
        <div className="w-full">
            <h1 className="text-5xl font-bold text-center p-5">Meu Perfil</h1>
            <hr />
            <div className="p-4 screen-max-width grid justify-items-center grid-autofit">
                <div>
                    <h2 className="text-2xl font-bold p-5">Dados Pessoais:</h2>
                    <div className="p-5">
                        <ul>
                            <li>Nome: {profileInfo.name}</li>
                            <li>Email: {profileInfo.email}</li>
                            <li>Celular: {profileInfo.cellphone}</li>
                            <li>Estado: {profileInfo.location.state}</li>
                            <li>Cidade: {profileInfo.location.city}</li>
                        </ul>
                    </div>
                </div>
                <div>
                    <h2 className="text-2xl font-bold p-5">Animais para Doação:</h2>
                    <div className="p-5">
                        {profileInfo.animals.map((info) => (
                        <h3>Nome: {info.name}</h3>
                        ))}
                    </div>
                </div>
            </div>   
        </div>
      </div>
      <hr />
      <div className="p-4 mx-auto screen-max-width grid justify-items-center grid-autofit gap-4">
        <button className="py-7 px-10 bg-purple-600 rounded-md">Editar Perfil</button>
        <button className="py-7 px-10 bg-purple-600 rounded-md">Trocar Senha</button>
        <button className="py-7 px-10 bg-rose-600 rounded-md">Apagar Perfil</button>
      </div>
      <Lowerbar />
    </>
  );
}