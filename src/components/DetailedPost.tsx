import Image from "next/image";
import TagContainer from "./TagContainer";
import { DogInfo, DogOwnerKind } from "@/types/dog";
import React from "react";

export type AdoptionCardProps = {
  info: DogInfo;
};

export default function AdoptionCard({ info }: AdoptionCardProps) {
  const imageAlt = `Imagem do cachorro "${info.name}"`;

  const descricaoHardcoded =
    "muito brincalhão, adora crianças, etc, etc, etc, etc, xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx...";

  return (
    <div className="border rounded-t-2xl overflow-hidden max-w-4xl flex min-h-80 flex-col sm:flex-row  ">
      <div className="w-full sm:w-1/2 flex justify-center items-center bg-purple-300 h-1/2 sm:h-full">
        <Image
          alt={imageAlt}
          className="object-cover w-full h-4/5"
          src={info.imageUrl}
          width={2000}
          height={2000}
        />
      </div>

      <div className="w-full sm:w-1/2 flex flex-col">
        <div className="px-3 flex flex-col bg-gray-100">
          <div className="flex justify-between m-1">
            <span>Nome: {info.name}</span>
            <span>Idade: {info.ageInYears} anos</span>
            <span>Sexo: {info.gender}</span>
          </div>
          <div className="flex justify-between m-1">
            <span>Porte: {info.heightInCm}cm</span>
            <span>Peso: {info.weightInKg}kg</span>
            <span></span>
          </div>
          <div className="flex justify-between m-1">
            <span>Espécie: {info.species}</span>
            <span>Raça: {info.breed}</span>
            <span></span>
          </div>
          <div className="m-1 flex flex-wrap">
            <span className="my-1 py-1">Tags: </span>
            {info.tags.map((tag, index) => (
              <TagContainer
                key={index}
                text={tag}
                color_class="bg-purple-300"
              />
            ))}
          </div>
          <div className="m-1 break-words">Sobre: {descricaoHardcoded}</div>
        </div>

        <div className="flex flex-col bg-gray-300 px-3 h-full">
          <p className="m-1">Responsável: {info.owner.name} </p>
          <p className="m-1">
            Localização: {info.location.city}, {info.location.state}
          </p>
          <p className="m-1">Contato: contato@gmail.com</p>
        </div>
      </div>
    </div>
  );
}
