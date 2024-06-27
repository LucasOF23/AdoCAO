"use client";

import AdoptionCard from "@/components/AdoptionCard";
import { DogInfo } from "@/types/dog";
import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";

import Navbar2 from "@/components/Navbar2";
import Sidebar from "@/components/Sidebar2";
import Lowerbar from "@/components/Lowerbar";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import animalApi from "@/api/animal.api";
import { getToken } from "@/api/general.api";

export default function AdoptionPosts() {
  const [dogInfos, setDogInfos] = useState([]);
  const [isAuthVisible, setAuthVisible] = useState(false);

  const closeModal = () => setAuthVisible(false);
  const openModal = () => setAuthVisible(true);

  const hiddenClass = isAuthVisible ? "hidden" : "";

  function getAllAnimals() {
    animalApi.getAll().then((res) => setDogInfos(res));
  }

  useEffect(getAllAnimals, []);

  return (
    <>
      <Navbar2 />
      <button
        onClick={openModal}
        className="cursor-pointer items-center justify-center w-20 rounded-br-xl
      border mx-auto sticky top-20 p-3 shadow-sm bg-white"
      >
        <FontAwesomeIcon
          className="mt-[0.1rem] h-[1.5rem] text-gray-400"
          icon={faSearch}
        />
      </button>
      {isAuthVisible &&
        createPortal(
          <div className="fixed top-0 left-0 w-full h-full bg-black/40 flex overflow-y-scroll z-20">
            <div className="mx-auto my-auto p-4 w-full">
              <Sidebar onClose={closeModal} updateAnimals={setDogInfos} />
            </div>
          </div>,
          document.body
        )}
      <div className="p-4 mx-auto screen-max-width grid justify-items-center grid-autofit gap-4">
        {dogInfos.map((info) => (
          <AdoptionCard tipo={false} key={info.id} info={info} />
        ))}
      </div>
      <Lowerbar />
    </>
  );
}
