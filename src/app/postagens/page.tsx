"use client";

import AdoptionCard from "@/components/AdoptionCard";

import React, { useState } from "react";
import { createPortal } from "react-dom";
import Forms from "@/components/Forms";
import Navbar2 from "@/components/Navbar2";
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

  const [isAuthVisible, setAuthVisible] = useState(false);

  const closeModal = () => setAuthVisible(false);
  const openModal = () => setAuthVisible(true);

  const hiddenClass = isAuthVisible ? "hidden" : "";

  return (
    <>
        <Navbar2 />
        <Sidebar />
        <div className="p-4 mx-auto screen-max-width grid justify-items-center grid-autofit gap-4">
            {profileInfo.animals.map((info) => (
            <AdoptionCard key={info.id} info={info} />
            ))}
            <button
              onClick={openModal}
              className="btn text-9xl text-center content-center border rounded-2xl overflow-hidden
            w-full max-w-96 hover:shadow-md hover:scale-[101%] transition delay-50"
            >
              +
            </button>
            {isAuthVisible &&
              createPortal(
                <div className="fixed top-0 left-0 w-full h-full bg-black/40 flex overflow-y-scroll z-20">
                  <div className="mx-auto my-auto p-4 w-full">
                    <Forms onClose={closeModal} />
                  </div>
                </div>,
                document.body
              )}
        </div>
        <Lowerbar />
    </>
  );
}