"use client";

import Image from "next/image";
import { DogInfo, DogOwnerKind } from "@/types/dog";
import React, { useState } from "react";
import DetailedPost from "./DetailedPost";
import Modal from "react-modal";
import { createPortal } from "react-dom";
import GenderIcon from "./GenderIcon";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export type AdoptionCardProps = {
  tipo: boolean;
  info: DogInfo;
};

function getOwnerPrefix(kind: DogOwnerKind) {
  switch (kind) {
  case "ONG":
    return "da ONG";
  case "user":
    return "do usuário";
  }
}

export default function AdoptionCard({ tipo, info }: AdoptionCardProps) {
  const imageAlt = `Imagem do cachorro "${info.name}"`;
  const ownerPrefix = getOwnerPrefix(info.owner.kind);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const openModal = () => setIsModalVisible(true);
  const closeModal = () => setIsModalVisible(false);

  const [isOwner, setIsOwner] = useState(false);

  return (
    <>
      <button
        onClick={openModal}
        className="border rounded-t-2xl overflow-hidden w-full max-w-96 bg-white hover:shadow-md hover:scale-[101%] transition delay-50"
      >
        <div className="w-full h-72">
          <Image
            alt={imageAlt}
            className="object-cover w-full h-full"
            src={info.imageUrl}
            width={2000}
            height={2000}
          />
        </div>
        <div className="px-3 pb-3 pt-1 text-start">
          <div className="flex flex-row">
            <h3 className="text-lg font-bold">{info.name}</h3>
            <GenderIcon gender={info.gender} className="ml-2 h-5" />
          </div>

          <p>
            {ownerPrefix} <span className="font-bold">{info.owner.name}</span>
          </p>
          <p>
            em{" "}
            <span className="font-bold">
              {info.location.name} ({info.location.state})
            </span>
          </p>
        </div>
      </button>
      {isModalVisible &&
        createPortal(
          <div className="fixed top-0 left-0 w-full h-full bg-black/40 flex overflow-y-scroll z-20">
            <div className="mx-auto my-auto p-4">
              <DetailedPost tipo={tipo} info={info} onClose={closeModal} />
            </div>
            {(tipo) && (
              <div className="mx-auto my-auto p-4 border rounded-t-2xl  overflow-scroll max-w-4xl flex h-screen flex-col sm:flex-row bg-white">
                <div className="">
                  <Label className="text-2xl text-center">Editar Postagem</Label>

                  {isOwner && (<>
                  <div>
                    <Label>Nome do Responsável</Label>
                    <Input type="nome" placeholder="joao pedro de alcantra" />
                  </div>

                  <div>
                    <Label>Celular</Label>
                    <Input type="telefone" placeholder="(XX) XXXXX-XXXX" />
                  </div>
                  </>)}

                  {!isOwner&& (<>
                  <div>
                    <Label>Nome da ONG</Label>
                    <Input type="nome" placeholder="arca de sao francisco" />
                  </div>

                  <div>
                    <Label>CNPJ</Label>
                    <Input type="telefone" placeholder="XX.XXX.XXX/XXXX-XX" />
                  </div>
                  </>)}
                  
                  <div>
                    <Label>Email</Label>
                    <Input type="email" placeholder="joao@example.com" />
                  </div>

                  <div>
                    <Label>Estado</Label>
                    <select className="border rounded-2xl p-2 w-full flex flex-col grid-rows-2 gap-5 bg-white text-sm">
                      <option>ES</option>
                      <option>MG</option>
                      <option>RJ</option>
                      <option>SC</option>
                      <option>SP</option>
                    </select>
                  </div>

                  <div>
                    <Label>Cidade</Label>
                    <select className="border rounded-2xl p-2 w-full flex flex-col grid-rows-2 gap-5 bg-white text-sm">
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
                    <Label>Nome do Animal</Label>
                    <Input type="nome" placeholder="Zeca" />
                  </div>

                  <div>
                    <Label>Espécie</Label>
                    <select className="border rounded-2xl p-2 w-full flex flex-col grid-rows-2 gap-5 bg-white text-sm">
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
                      <option>Macho</option>
                      <option>Fêmea</option>
                    </select>
                  </div>

                  <div>
                    <Label>Nascimento</Label>
                    <Input type="idade" placeholder="22/12/22" />
                  </div>

                  <div>
                    <Label>Peso</Label>
                    <Input type="peso" placeholder="30 kg" />
                  </div>

                  <div>
                    <Label>Altura</Label>
                    <Input type="peso" placeholder="3 m" />
                  </div>

                  <div>
                    <details className="dropdown">
                      <summary className="dropdown-content border rounded-2xl p-2 my-5 w-full grid-rows-2 gap-5 bg-white">Tags</summary>
                      <ul className="p-1 shadow menu z-[1] flex flex-col bg-white rounded-box">
                        <li className="flex">
                          <Label className="w-1/3">Fofo</Label>
                          <Input type="checkbox" className="h-5 hover:cursor-pointer w-1/6"/>
                          <Label className="w-1/3">Esperto</Label>
                          <Input type="checkbox" className="h-5 hover:cursor-pointer w-1/6"/>
                        </li>

                        <li className="flex">
                          <Label className="w-1/3">Energético</Label>
                          <Input type="checkbox" className="h-5 hover:cursor-pointer w-1/6"/>
                          <Label className="w-1/3">Brincalhão</Label>
                          <Input type="checkbox" className="h-5 hover:cursor-pointer w-1/6"/>
                        </li>

                        <li className="flex">
                          <Label className="w-1/3">Agressivo</Label>
                          <Input type="checkbox" className="h-5 hover:cursor-pointer w-1/6"/>
                          <Label className="w-1/3">Forte</Label>
                          <Input type="checkbox" className="h-5 hover:cursor-pointer w-1/6"/>
                        </li>

                        <li className="flex">
                          <Label className="w-1/3">Calmo</Label>
                          <Input type="checkbox" className="h-5 hover:cursor-pointer w-1/6"/>
                          <Label className="w-1/3">Saudável</Label>
                          <Input type="checkbox" className="h-5 hover:cursor-pointer w-1/6"/>
                        </li>
                      </ul>
                    </details>
                  </div>

                  <div className="flex flex-row p-4 justify-start">
                    <div className="basis-1/2 flex flex-row">
                      <Label>Vermifugado</Label>
                      <Input type="checkbox" className="h-5 hover:cursor-pointer"/>
                    </div>
                    <div className="basis-1/2 flex flex-row">
                      <Label>Castrado</Label>
                      <Input type="checkbox" className="h-5 hover:cursor-pointer"/>
                    </div>
                  </div>

                  <div >
                    <Label>Descrição</Label>
                    <Input type="descricao" className="h-20"/>
                  </div>

                  <div>
                    <Label>Imagem</Label>
                    <Input type="file" className="hover:bg-purple-300 hover:cursor-pointer"/>
                  </div>
                    
                  <div className="text-center p-4">
                    <a href="/postagens" className="mx-auto w-full max-w-60 bg-purple-300 hover:bg-purple-400 duration-75 hover:scale-[105%] px-5 py-3 rounded-xl my-auto">
                      Enviar
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>,
          document.body
        )}
    </>
  );
}
