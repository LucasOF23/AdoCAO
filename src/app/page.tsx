"use client";

import { useState } from "react";

import AdoptionCard from "@/components/AdoptionCard";
import { DogInfo } from "@/types/dog";

import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Lowerbar from "@/components/Lowerbar";
import EditPerfil from "@/app/edit_perfil/page";
import PageForms from "@/components/PageForms";
import ModalCreateONG from "@/components/ModalCreateONG";


export default function AdoptionPosts() {
  const dogInfos: DogInfo[] = [
    {
      id: 8,
      name: "Marie Currie",
      imageUrl: "https://images.dog.ceo/breeds/lhasa/n02098413_7389.jpg",
      owner: {
        kind: "ONG",
        name: "Cães Felizes",
      },
      location: {
        city: "Rio de Janeiro",
        state: "RJ",
      },
      gender: "female",
      ageInYears: 2,
      weightInKg: 8,
      heightInCm: 25,
      species: "Cachorro",
      breed: "Labrador Retriever",
      isNeutered: true,
      isDewormed: true,
      tags: ["Energética", "Amável", "Vacinação em dia"],
    },
    {
      id: 12,
      name: "Lisa Randall",
      imageUrl:
        "https://images.dog.ceo/breeds/spaniel-irish/n02102973_3220.jpg",
      owner: {
        kind: "user",
        name: "Massimo Bottura",
      },
      location: {
        city: "Milano",
        state: "IT",
      },
      gender: "female",
      ageInYears: 2,
      weightInKg: 8,
      heightInCm: 25,
      species: "Cachorro",
      breed: "Labrador Retriever",
      isNeutered: true,
      isDewormed: true,
      tags: ["Energética", "Amável", "Vacinação em dia"],
    },
    {
      id: 1,
      name: "Max Planck",
      imageUrl:
        "https://images.dog.ceo/breeds/poodle-standard/n02113799_1316.jpg",
      owner: { kind: "user", name: "José Silva" },
      location: { city: "São Paulo", state: "SP" },
      gender: "male",
      ageInYears: 2,
      weightInKg: 10,
      heightInCm: 30,
      species: "Cachorro",
      breed: "Vira-lata",
      isNeutered: true,
      isDewormed: true,
      tags: ["brincalhão", "amigável", "energético"],
    },
    {
      id: 2,
      name: "Erwin Schrodinger",
      imageUrl: "https://images.dog.ceo/breeds/dane-great/n02109047_17874.jpg",
      owner: { kind: "ONG", name: "Patitas Felizes" },
      location: { city: "Rio de Janeiro", state: "RJ" },
      gender: "male",
      ageInYears: 3,
      weightInKg: 8,
      heightInCm: 25,
      species: "Cachorro",
      breed: "Shih Tzu",
      isNeutered: true,
      isDewormed: true,
      tags: ["carinhosa", "tranquila", "fofa"],
    },
    {
      id: 3,
      name: "Niels Bohr",
      imageUrl: "https://images.dog.ceo/breeds/shiba/shiba-17.jpg",
      owner: { kind: "user", name: "Maria Oliveira" },
      location: { city: "Belo Horizonte", state: "MG" },
      gender: "male",
      ageInYears: 1,
      weightInKg: 12,
      heightInCm: 35,
      species: "Cachorro",
      breed: "Golden Retriever",
      isNeutered: false,
      isDewormed: true,
      tags: ["brincalhão", "inteligente", "protetor"],
    },
    {
      id: 11,
      name: "Ada Lovelace",
      imageUrl: "https://images.dog.ceo/breeds/coonhound/n02089078_3340.jpg",
      owner: {
        kind: "ONG",
        name: "Cães Lindos",
      },
      location: {
        city: "Goianinha",
        state: "RN",
      },
      gender: "female",
      ageInYears: 2,
      weightInKg: 8,
      heightInCm: 25,
      species: "Cachorro",
      breed: "Labrador Retriever",
      isNeutered: true,
      isDewormed: true,
      tags: ["Energética", "Amável", "Vacinação em dia"],
    },
    {
      id: 4,
      name: "Albert Einstein",
      imageUrl:
        "https://images.dog.ceo/breeds/sheepdog-shetland/n02105855_742.jpg",
      owner: { kind: "user", name: "Ana Silva" },
      location: { city: "São Paulo", state: "SP" },
      gender: "male",
      ageInYears: 2,
      weightInKg: 10,
      heightInCm: 30,
      species: "Cachorro",
      breed: "Vira-lata",
      isNeutered: true,
      isDewormed: true,
      tags: ["Brincalhão", "Carinhoso", "Ativo"],
    },
    {
      id: 10,
      name: "Katherine Johnson",
      imageUrl: "https://images.dog.ceo/breeds/mastiff-english/3.jpg",
      owner: {
        kind: "ONG",
        name: "Felizcao",
      },
      location: {
        city: "Serra da Saudade",
        state: "MG",
      },
      gender: "female",
      ageInYears: 2,
      weightInKg: 8,
      heightInCm: 25,
      species: "Cachorro",
      breed: "Labrador Retriever",
      isNeutered: true,
      isDewormed: true,
      tags: ["Energética", "Amável", "Vacinação em dia"],
    },
    {
      id: 5,
      name: "Werner Heisenberg",
      imageUrl: "https://images.dog.ceo/breeds/labradoodle/Cali.jpg",
      owner: { kind: "ONG", name: "Amigos dos Animais" },
      location: { city: "Rio de Janeiro", state: "RJ" },
      gender: "male",
      ageInYears: 3,
      weightInKg: 8,
      heightInCm: 25,
      species: "Cachorro",
      breed: "Poodle",
      isNeutered: true,
      isDewormed: true,
      tags: ["Docil", "Carente", "Pelagem Fofa"],
    },
    {
      id: 6,
      name: "Paul Dirac",
      imageUrl:
        "https://images.dog.ceo/breeds/setter-english/n02100735_4051.jpg",
      owner: { kind: "user", name: "Carlos Oliveira" },
      location: { city: "Belo Horizonte", state: "MG" },
      gender: "male",
      ageInYears: 4,
      weightInKg: 12,
      heightInCm: 35,
      species: "Cachorro",
      breed: "Labrador Retriever",
      isNeutered: false,
      isDewormed: true,
      tags: ["Energético", "Amigo", "Protetor"],
    },
    {
      id: 7,
      name: "Max Born",
      imageUrl: "https://images.dog.ceo/breeds/labrador/pic1_l.jpg",
      owner: {
        kind: "user",
        name: "João Silva",
      },
      location: {
        city: "São Paulo",
        state: "SP",
      },
      gender: "male",
      ageInYears: 3,
      weightInKg: 10,
      heightInCm: 30,
      species: "Cachorro",
      breed: "Vira-lata",
      isNeutered: true,
      isDewormed: true,
      tags: ["Brincalhão", "Amigável", "Castrado"],
    },
    {
      id: 9,
      name: "J. Robert Oppenheimer",
      imageUrl: "https://images.dog.ceo/breeds/boxer/n02108089_2791.jpg",
      owner: {
        kind: "ONG",
        name: "Cães Atômicos",
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
    },
  ];
  
  return (
    <>
      <Navbar />
      <Sidebar />
      <div className="p-4 mx-auto screen-max-width grid justify-items-center grid-autofit gap-4">
        {dogInfos.map((info) => (
          <AdoptionCard key={info.id} info={info} />
        ))}
      </div>
      <Lowerbar />
    </>
  );
}