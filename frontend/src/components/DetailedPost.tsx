import Image from "next/image";
import TagContainer from "./TagContainer";
import { DogInfo, DogOwnerKind } from "@/types/dog";
import React, { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import GenderIcon from "./GenderIcon";

export type DetailedPostProps = {
  info: DogInfo;
  onClose?: () => void;
};

function renderBoolean(value: boolean) {
  switch (value) {
  case true:
    return "Sim";
  case false:
    return "Não";
  }
}

function renderOwnerKind(kind: DogOwnerKind) {
  switch (kind) {
  case "ONG":
    return "ONG";
  case "user":
    return "Usuário";
  }
}

export default function DetailedPost({ info, onClose }: DetailedPostProps) {
  const imageAlt = `Imagem do cachorro "${info.name}"`;

  return (
    <div className="border rounded-t-2xl overflow-hidden max-w-4xl flex min-h-80 flex-col sm:flex-row bg-white">
      <div className="max-w-1/2 sm:w-1/2">
        <Image
          alt={imageAlt}
          className="object-cover h-full"
          src={info.imageUrl}
          width={2000}
          height={2000}
        />
      </div>

      <div className="max-w-1/2 sm:w-1/2 p-4 flex flex-col">
        <div className="flex flex-row justify-between">
          <div className="flex flex-row gap-3">
            <h2 className="font-semibold text-2xl">{info.name}</h2>
            <GenderIcon gender={info.gender}/>
          </div>
          {onClose && (
            <button onClick={onClose}>
              <FontAwesomeIcon
                className="mt-[0.1rem] h-[1.5rem] text-gray-400"
                icon={faXmark}
              />
            </button>
          )}
        </div>
        <div className="flex flex-row max-w-72 justify-between ">
          <div className="mt-2 flex flex-col">
            <span className="font-semibold text-xs">Peso</span>
            <span>{info.weightInKg ? `${info.weightInKg} kg` : '---' }</span>
          </div>
          <div className="mt-2 flex flex-col">
            <span className="font-semibold text-xs">Altura</span>
            <span>{info.heightInCm ? `${info.heightInCm} cm` : '---' }</span>
          </div>
          <div className="mt-2 flex flex-col">
            <span className="font-semibold text-xs">Idade</span>
            <span>
              {info.ageInYears} ano{info.ageInYears > 1 ? "s" : ""}
            </span>
          </div>
        </div>
        <div className="flex flex-row max-w-72 justify-between">
          <div className="mt-2 flex flex-col">
            <span className="font-semibold text-xs">Espécie</span>
            <span>{info.species.name}</span>
          </div>
          <div className="mt-2 flex flex-col">
            <span className="font-semibold text-xs">Castrado</span>
            <span>{renderBoolean(info.isNeutered)}</span>
          </div>
          <div className="mt-2 flex flex-col">
            <span className="font-semibold text-xs">Vermifugado</span>
            <span>{renderBoolean(info.isDewormed)}</span>
          </div>
        </div>
        <div className="mt-2 flex flex-col">
          <span className="font-semibold text-xs">
            {renderOwnerKind(info.owner.kind)} Responsável
          </span>
          <span>{info.owner.name}</span>
        </div>
        <div className="mt-2 flex flex-col">
          <span className="font-semibold text-xs">Local</span>
          <span>
            {info.location.name} ({info.location.state})
          </span>
        </div>
        <div className="mt-2 flex flex-col">
          <span className="font-semibold text-xs">Tags</span>
          <div className="flex flex-wrap">
            {info.tags.map((tag, index) => (
              <TagContainer
                key={index}
                text={tag.name}
                className="hover:scale-[104%] shadow-sm text-xs bg-purple-300"
              />
            ))}
          </div>
        </div>
        <div className="mt-2 flex flex-col">
          <span className="font-semibold text-xs">Descrição</span>
          <span className="text-sm text-wrap">{info.description}</span>
        </div>       
      </div>
    </div>
  );
}
