import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect, useRef } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

type FormsProps = {
  onClose?: () => void;
};

export default function Forms({ onClose }: FormsProps) {
  return (
    <div className="absolute left-0 top-0 border p-4 max-w-96 w-full h-screen overflow-auto flex flex-col gap-5 bg-white">
      <h2 className="title-filter">Filtros</h2>

      {onClose && (
        <button onClick={onClose}>
          <FontAwesomeIcon
            className="mt-[0.1rem] h-[1.5rem] text-gray-400 absolute top-5 right-5"
            icon={faXmark}
          />
        </button>
      )}
      <div className="overflow-scroll">
        <Label>Cidade</Label>
        <select className="border rounded-2xl p-2 w-full flex flex-col grid-rows-2 gap-5 bg-white text-sm">
          <option></option>
          <option>Analândia</option>
          <option>Araraquara</option>
          <option>Araras</option>
          <option>Belo Horizonte</option>
          <option>Brotas</option>
          <option>Descalvado</option>
          <option>Florianópolis</option>
          <option>Ibaté</option>
          <option>Itirapina</option>
          <option>Pirassununga</option>
          <option>Ribeirão Bonito</option>
          <option>Rio Claro</option>
          <option>Rio de Janeiro</option>
          <option>São Carlos</option>
          <option>São Paulo</option>
          <option>Vitória</option>
          <option>Outra</option>
        </select>
      </div>
      <div>
        <Label>Tipo de Dono</Label>
        <select className="border rounded-2xl p-2 w-full flex flex-col grid-rows-2 gap-5 bg-white text-sm">
          <option></option>
          <option>Pessoa Física</option>
          <option>ONG</option>
        </select>
      </div>
      <div>
        <Label>Espécie</Label>
        <select className="border rounded-2xl p-2 w-full flex flex-col grid-rows-2 gap-5 bg-white text-sm">
          <option></option>
          <option>Cachorro</option>
          <option>Gato</option>
          <option>Ave</option>
          <option>Peixe</option>
          <option>Roedor</option>
          <option>Réptil</option>
          <option>Coelho</option>
          <option>Outro</option>
        </select>
      </div>
      <div>
        <Label>Sexo</Label>
        <select className="border rounded-2xl p-2 w-full flex flex-col grid-rows-2 gap-5 bg-white text-sm">
          <option></option>
          <option>Macho</option>
          <option>Fêmea</option>
        </select>
      </div>

      <div>
        <Label>Idade Mínima</Label>
        <Input type="idade" placeholder="5 dias" />
      </div>

      <div>
        <Label>Idade Máxima</Label>
        <Input type="idade" placeholder="5 anos" />
      </div>

      <div>
        <Label>Peso Mínimo</Label>
        <Input type="peso" placeholder="30 g" />
      </div>

      <div>
        <Label>Peso Máximo</Label>
        <Input type="peso" placeholder="30 kg" />
      </div>

      <div>
        <Label>Tamanho Mínimo</Label>
        <Input type="altura" placeholder="5 cm" />
      </div>

      <div>
        <Label>Tamanho Máximo</Label>
        <Input type="altura" placeholder="5 m" />
      </div>

      <div>
        <details className="dropdown">
          <summary className="dropdown-content border rounded-2xl p-2 my-5 w-full grid-rows-2 gap-5 bg-white">
            Tags
          </summary>
          <ul className="p-1 shadow menu z-[1] flex flex-col bg-white rounded-box">
            <li className="flex">
              <Label className="w-1/3">Fofo</Label>
              <Input
                type="checkbox"
                className="h-5 hover:cursor-pointer w-1/6"
              />
              <Label className="w-1/3">Esperto</Label>
              <Input
                type="checkbox"
                className="h-5 hover:cursor-pointer w-1/6"
              />
            </li>

            <li className="flex">
              <Label className="w-1/3">Energético</Label>
              <Input
                type="checkbox"
                className="h-5 hover:cursor-pointer w-1/6"
              />
              <Label className="w-1/3">Brincalhão</Label>
              <Input
                type="checkbox"
                className="h-5 hover:cursor-pointer w-1/6"
              />
            </li>

            <li className="flex">
              <Label className="w-1/3">Agressivo</Label>
              <Input
                type="checkbox"
                className="h-5 hover:cursor-pointer w-1/6"
              />
              <Label className="w-1/3">Forte</Label>
              <Input
                type="checkbox"
                className="h-5 hover:cursor-pointer w-1/6"
              />
            </li>

            <li className="flex">
              <Label className="w-1/3">Calmo</Label>
              <Input
                type="checkbox"
                className="h-5 hover:cursor-pointer w-1/6"
              />
              <Label className="w-1/3">Saudável</Label>
              <Input
                type="checkbox"
                className="h-5 hover:cursor-pointer w-1/6"
              />
            </li>
          </ul>
        </details>
      </div>

      <div className="flex flex-row p-4 justify-start">
        <div className="basis-1/2 flex flex-row">
          <Label>Vermifugado</Label>
          <Input type="checkbox" className="h-5 hover:cursor-pointer" />
        </div>
        <div className="basis-1/2 flex flex-row">
          <Label>Castrado</Label>
          <Input type="checkbox" className="h-5 hover:cursor-pointer" />
        </div>
      </div>

      <div className="text-center p-4">
        <a
          href="/home"
          className="mx-auto w-full max-w-60 bg-purple-300 hover:bg-purple-400 duration-75 hover:scale-[105%] px-5 py-3 rounded-xl my-auto"
        >
          FILTRAR
        </a>
      </div>
    </div>
  );
}
