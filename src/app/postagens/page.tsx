"use client";

import AdoptionCard from "@/components/AdoptionCard";
import { DogInfo } from "@/types/dog";

import Navbar2 from "@/components/Navbar2";
import PageForms from "@/components/PageForms";
import Sidebar from "@/components/Sidebar";

export default function AdoptionPosts() {
  const dogInfos: DogInfo[] = [
    {
      id: 8,
      name: "Marie Currie",
      imageUrl: "https://images.dog.ceo/breeds/lhasa/n02098413_7389.jpg",
      owner: {
        kind: "user",
        name: "Lucas Ferreira",
      },
      location: {
        city: "Belo Horizonte",
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
      id: 12,
      name: "Lisa Randall",
      imageUrl:
        "https://images.dog.ceo/breeds/spaniel-irish/n02102973_3220.jpg",
      owner: {
        kind: "user",
        name: "Lucas Ferreira",
      },
      location: {
        city: "Belo Horizonte",
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
    }
  ];

  return (
    <>
        <Navbar2 />
        <Sidebar />
        <div className="p-4 mx-auto screen-max-width grid justify-items-center grid-autofit gap-4">
            {dogInfos.map((info) => (
            <AdoptionCard key={info.id} info={info} />
            ))}
            <button className="btn text-9xl text-center content-center border rounded-2xl overflow-hidden
            w-full max-w-96 hover:shadow-md hover:scale-[101%] transition delay-50" 
            onClick={()=>document.getElementById('my_modal_2').showModal()}>+</button>
            <dialog id="my_modal_2" className="modal w-1000">
                <div className="modal-box">
                <PageForms />
                </div>
                <form method="dialog" className="modal-backdrop">
                <button>FECHAR</button>
                </form>
            </dialog>
        </div>
    </>
  );
}