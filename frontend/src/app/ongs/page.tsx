"use client";

import OngCard from "@/components/OngCard";

import React, { useState } from "react";
import { createPortal } from "react-dom";

import Navbar2 from "@/components/Navbar2";
import Lowerbar from "@/components/Lowerbar";
import Forms from "@/components/Forms_Ong";
import Sidebar from "@/components/Sidebar2";
import { ProfileInfo } from "@/types/profile";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export default function AdoptionPosts() {
    const profileInfos: [ProfileInfo] = [
      {
        id: 1,
        user_type: "ONG",
        name: "S.O.S. Doguinhos",
        location: { city: "São Carlos", state: "São Paulo" },
        imageUrl: "https://images.dog.ceo/breeds/poodle-standard/n02113799_1316.jpg",
        cellphone: "(12) 3 4567-8910",
        email: "aaa",
        animals: [],
      },
      {
        id: 2,
        user_type: "ONG",
        name: "Dogões S.A.",
        location: { city: "São Carlos", state: "São Paulo" },
        imageUrl: "https://images.dog.ceo/breeds/shiba/shiba-17.jpg",
        cellphone: "(12) 3 4567-8910",
        email: "aaa",
        animals: [],
      },
      {
        id: 3,
        user_type: "user",
        name: "Zeca",
        location: { city: "São Carlos", state: "São Paulo" },
        imageUrl: "",
        cellphone: "aaa",
        email: "aaa",
        animals: [],
      },
    ];

    const [isUserAdmin, setButtonVisible] = useState(false);

    const [isAuthVisible, setAuthVisible] = useState(false);

    const closeModal = () => setAuthVisible(false);
    const openModal = () => setAuthVisible(true);
  
    const hiddenClass = isAuthVisible ? "hidden" : "";
  
    const [isAuthVisible2, setAuthVisible2] = useState(false);
  
    const closeModal2 = () => setAuthVisible2(false);
    const openModal2 = () => setAuthVisible2(true);
  
    const hiddenClass2 = isAuthVisible2 ? "hidden" : "";

  return (
    <>
      <Navbar2 />
        <div className="text-center text-5xl font-bold m-10 mt-14">Conheça nossas ONG's parceiras!</div>
      
      
      <div className="p-4 mx-auto screen-max-width grid justify-items-center grid-autofit gap-4">
        {profileInfos.map((info) => (
          info.user_type === "ONG" 
          ? (<OngCard key={info.id} info={info} />)
          : null
        ))}
        <button onClick={openModal}
              className={isUserAdmin ? "btn text-9xl text-center content-center border rounded-2xl overflow-hidden w-full max-w-96 hover:shadow-md hover:scale-[101%] transition delay-50" : "hidden"}>
              +
            </button>
            {isAuthVisible &&
              createPortal(
                <div className="fixed top-0 left-0 w-full h-full bg-black/40 flex overflow-y-scroll z-20">
                  <div className="mx-auto my-auto p-4 w-full content-center flex justify-center">
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