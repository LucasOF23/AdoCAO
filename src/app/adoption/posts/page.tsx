"use client";

import AdoptionCard from "@/components/AdoptionCard";
import { DogInfo } from "@/types/dog";

export default function AdoptionPosts() {
  const dogInfos: DogInfo[] = [
    {
      id: 1,
      name: "Bolinha",
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
      name: "Mel",
      imageUrl: "https://images.dog.ceo/breeds/dane-great/n02109047_17874.jpg",
      owner: { kind: "ONG", name: "Patitas Felizes" },
      location: { city: "Rio de Janeiro", state: "RJ" },
      gender: "female",
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
      name: "Thor",
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
      id: 4,
      name: "Max",
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
      id: 5,
      name: "Bela",
      imageUrl: "https://images.dog.ceo/breeds/labradoodle/Cali.jpg",
      owner: { kind: "ONG", name: "Amigos dos Animais" },
      location: { city: "Rio de Janeiro", state: "RJ" },
      gender: "female",
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
      name: "Thor",
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
      name: "Max",
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
      id: 8,
      name: "Luna",
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
  ];

  const options = [
    {
      label: "Option 1",
      value: 1,
    },
    {
      label: "Option 2",
      value: 2,
    },
    {
      label: "Option 3",
      value: 3,
    },
    {
      label: "Option 4",
      value: 4,
    },
  ];

  return (
    <>
      <div>AdoptionPosts</div>

      <div className="p-4 mx-auto screen-max-width grid justify-items-center grid-autofit gap-4">
        {dogInfos.map((info) => (
          <AdoptionCard key={info.id} info={info} />
        ))}
      </div>
    </>
  );
}
