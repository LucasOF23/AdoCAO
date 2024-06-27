"use client";

import AdoptionCard from "@/components/AdoptionCard";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Forms from "@/components/Forms";
import Navbar2 from "@/components/Navbar2";
import Sidebar from "@/components/Sidebar2";
import Lowerbar from "@/components/Lowerbar";
import { ProfileInfo } from "@/types/profile";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import animalApi from "@/api/animal.api";
import { getToken } from "@/api/general.api";

export default function AdoptionPosts() {
  const [userId, setUserId] = useState(null);
  const [dogInfos, setDogInfos] = useState([]);
  const [isAuthVisible, setAuthVisible] = useState(false);

  const closeModal = () => setAuthVisible(false);
  const openModal = () => setAuthVisible(true);

  const hiddenClass = isAuthVisible ? "hidden" : "";

  const [isAuthVisible2, setAuthVisible2] = useState(false);

  const closeModal2 = () => setAuthVisible2(false);
  const openModal2 = () => setAuthVisible2(true);

  const hiddenClass2 = isAuthVisible2 ? "hidden" : "";

  useEffect(() => {
    const token = getToken();
    if(token) setUserId(token.payload.sub);
  }, []);

  useEffect(() => {
    if(userId)
      animalApi.getFromUser(userId).then(res => setDogInfos(res));
  }, [userId]);
  
  return (
    <>
      <Navbar2 />
      <button onClick={openModal2} className="cursor-pointer items-center justify-center w-20 rounded-br-xl
      border mx-auto sticky top-20 p-3 shadow-sm bg-white">
        <FontAwesomeIcon
          className="mt-[0.1rem] h-[1.5rem] text-gray-400"
          icon={faSearch}
        />
      </button>
      {isAuthVisible2 &&
        createPortal(
          <div className="fixed top-0 left-0 w-full h-full bg-black/40 flex overflow-y-scroll z-20">
            <div className="mx-auto my-auto p-4 w-full">
              <Sidebar onClose={closeModal2} />
            </div>
          </div>,
          document.body
        )}
      <div className="p-4 mx-auto screen-max-width grid justify-items-center grid-autofit gap-4">
        {dogInfos.map((info) => (
          <AdoptionCard tipo={true} key={info.id} info={info} isFromOng={false} />
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
              <div className="mx-auto my-auto p-4 w-full content-center flex justify-center">
                <Forms isFromOng={false} onClose={closeModal} />
              </div>
            </div>,
            document.body
          )}
      </div>
      <Lowerbar />
    </>
  );
}
