"use client";

import Image from "next/image";
import { DogInfo, DogOwnerKind } from "@/types/dog";
import React, { useState, useEffect } from "react";
import DetailedPost from "./DetailedPost";
import Modal from "react-modal";
import { createPortal } from "react-dom";
import GenderIcon from "./GenderIcon";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import cityApi from "@/api/city.api";
import tagApi from "@/api/animaltag.api";
import specieApi from "@/api/animalspecie.api";
import animalApi from "@/api/animal.api";
import { siglasEstados } from "@/lib/utils";

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

  const [cities, setCities] = useState([]);
  const [estado, setEstado] = useState(info.location.state);

  const [tags, setTags] = useState([]);
  const [species, setSpecies] = useState([]);

  function getCities() {                
    if(estado)
      cityApi.getByState(estado).then(res => setCities(res));
  }

  useEffect(getCities, [estado]);
  useEffect(() => {
    tagApi.getAll().then((res) =>
      setTags(
        res.map((tag) => {
          tag.isMarked = false;
          return tag;
        })
      )
    );
  }, []);
  useEffect(() => {
    specieApi.getAll().then(res => setSpecies(res));
  }, []);
  
  async function editAnimal(event) {
    event.preventDefault();

    const formData = new FormData(event.target);

    const boolKeys = ['isNeutered', 'isDewormed'];
    for(const key of boolKeys) {
      if(formData.get(key)) {
        formData.delete(key);
        formData.append(key, '1');
      } else
        formData.append(key, '0');
    }
    
    console.log(formData);

    try {
      const res = await animalApi.update(info.id, formData);
      console.log('Atuailização feita com sucesso!');
    } catch(err) {
      console.log(err);
      switch(err.response.status) {
      default:
        console.log('Erro desconhecido');      
      }
    }
  }

  function renderTags(tags) {
    const cntPerLine = 2;
    const lines = [];

    let i = 0;
    while (i < tags.length) {
      let line = [];
      for (let j = 0; i < tags.length && j < cntPerLine; i++, j++)
        line.push(tags[i]);
      lines.push(line);
    }

    return (
      <div>
        <details className="dropdown">
          <summary className="dropdown-content border rounded-2xl p-2 my-5 w-full grid-rows-2 gap-5 bg-white">
            Tags
          </summary>
          <ul className="p-1 shadow menu z-[1] flex flex-col bg-white rounded-box">
            {lines.map((line, indexLine) => (
              <li className="flex">
                {line.map((tag, index) => (
                  <>
                    <Label className="w-1/3">{tag.name}</Label>
                    <Input
                      type="checkbox"
                      value={tag.isMarked}
                      onChange={(event) =>
                        handleTagMark(event, indexLine * cntPerLine + index)
                      }
                      className="h-5 hover:cursor-pointer w-1/6"
                    />
                  </>
                ))}
              </li>
            ))}
          </ul>
        </details>
      </div>
    );
  }

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
            {!tipo && (
              <div className="mx-auto my-auto p-4">
                <DetailedPost info={info} onClose={closeModal} />
              </div>
            )}
            {(tipo) && (
              <div className="mx-auto my-auto p-4 border rounded-t-2xl overflow-scroll max-w-4xl h-screen sm:flex-row bg-white">
                <div className="py-5">
                  <Label className="text-2xl text-center">Confirmar Adoção</Label>
                  <div className="mt-2 justify-center flex">
                    <button className="font-semibold bg-blue-600 rounded-full h-12 w-40 border text-xs">Já foi Adotado!!!</button>
                  </div>
                </div>
                <hr />
                <div className="py-5">
                  <Label className="text-2xl text-center">Editar Postagem</Label>
                  <form onSubmit={editAnimal}>                 
                    <div>
                      <Label>Nome do Animal</Label>
                      <Input name="name" type="nome" placeholder="Zeca" defaultValue={info.name} required />
                    </div>
                 
                    <div>
                      <Label>Estado</Label>
                      <select onChange={event => setEstado(event.target.value)} className="border rounded-2xl p-2 w-full flex flex-col grid-rows-2 gap-5 bg-white text-sm" defaultValue={info.location.state} required >
                        <option disabled></option>
                        {siglasEstados.map(sigla => (
                          <option key={sigla} value={sigla}>{sigla}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <Label>Cidade</Label>
                      <select name="CityId" className="border rounded-2xl p-2 w-full flex flex-col grid-rows-2 gap-5 bg-white text-sm" defaultValue={info.location.id} required>
                        <option disabled></option>
                        {cities.map((city) => (
                          <option key={city.id} value={city.id}>{city.name} ({city.state})</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <Label>Espécie</Label>
                      <select
                        name="AnimalSpecieId"
                        className="border rounded-2xl p-2 w-full flex flex-col grid-rows-2 gap-5 bg-white text-sm"
                        defaultValue={info.species.id} required>
                        <option disabled></option>
                        {species.map((specie) => (
                          <option key={specie.id} value={specie.id}>
                            {specie.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <Label>Sexo</Label>
                      <select name="animalGender" className="border rounded-2xl p-2 w-full flex flex-col grid-rows-2 gap-5 bg-white text-sm" defaultValue={info.gender === 'male' ? 'M' : 'F'} required>
                        <option value="M">Macho</option>
                        <option value="F">Fêmea</option>
                      </select>
                    </div>

                    <div>
                      <Label>Nascimento</Label>
                      <Input name="birthdate" type="date" placeholder="22/12/22" defaultValue={info.birthdate} required />
                    </div>

                    <div>
                      <Label>Peso</Label>
                      <Input name="weightInKg" type="peso" placeholder="30 kg" defaultValue={info.weightInKg} />
                    </div>

                    <div>
                      <Label>Altura</Label>
                      <Input name="heightInCm" type="peso" placeholder="3 cm" defaultValue={info.heightInCm} />
                    </div>

                    { renderTags(tags) }
                    
                    <div className="flex flex-row p-4 justify-start">
                      <div className="basis-1/2 flex flex-row">
                        <Label>Vermifugado</Label>
                        <Input name="isDewormed" type="checkbox" className="h-5 hover:cursor-pointer" defaultChecked={info.isDewormed} />
                      </div>
                      <div className="basis-1/2 flex flex-row">
                        <Label>Castrado</Label>
                        <Input name="isNeutered" type="checkbox" className="h-5 hover:cursor-pointer" defaultChecked={info.isNeutered}/>
                      </div>
                    </div>

                    <div >
                      <Label>Descrição</Label>
                      <Input name="description" type="descricao" className="h-20" defaultValue={info.description} required />
                    </div>

                    <div>
                      <Label>Trocar Imagem</Label>
                      <Input name="photo" type="file" className="hover:bg-purple-300 hover:cursor-pointer"  />
                    </div>
                    
                    <div className="text-center p-4">
                      <button type="submit" className="mx-auto w-full max-w-60 bg-purple-300 hover:bg-purple-400 duration-75 hover:scale-[105%] px-5 py-3 rounded-xl my-auto">
                        Enviar
                      </button>
                    </div>

                  </form>
                </div>
              </div>
            )}
          </div>,
          document.body
        )}
    </>
  );
}
