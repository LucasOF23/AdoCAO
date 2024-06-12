"use client";

import AdoptionCard from "@/components/AdoptionCard";

import Navbar2 from "@/components/Navbar2";
import PageForms from "@/components/ModalFormsPet";
import Sidebar from "@/components/Sidebar";
import Lowerbar from "@/components/Lowerbar";
import { ProfileInfo } from "@/types/profile";

export default function AdoptionPosts() {
  const profileInfo: ProfileInfo = 
        {
          id: 1,
          user_type: "user",
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
              city: "São Carlos",
              state: "SP",
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

  return (
    <>
        <Navbar2 />
        <Sidebar />
        <div className="p-4 mx-auto screen-max-width grid justify-items-center grid-autofit gap-4">
            {profileInfo.animals.map((info) => (
            <AdoptionCard key={info.id} info={info} />
            ))}
            <button className="btn text-9xl text-center content-center border rounded-2xl overflow-hidden
             max-w-96 hover:shadow-md hover:scale-[101%] transition delay-50" 
            onClick={()=>document.getElementById('my_modal_2').showModal()}>+</button>
            <dialog id="my_modal_2" className="modal">
                <div className="modal-box duration-1000">
                <PageForms />
                </div>
                <form method="dialog" className="modal-backdrop">
                  <button>FECHAR</button>
                </form>
            </dialog>
        </div>
        <Lowerbar />
    </>
  );
}