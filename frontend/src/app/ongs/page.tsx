"use client";

import OngCard from "@/components/OngCard";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";

import Navbar2 from "@/components/Navbar2";
import Lowerbar from "@/components/Lowerbar";
import Forms from "@/components/Forms_Ong";
import Sidebar from "@/components/Sidebar";
import { ProfileInfo } from "@/types/profile";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faCircleUser} from "@fortawesome/free-solid-svg-icons";

import ongApi from "@/api/ong.api";
import { getToken } from "@/api/general.api";

export default function AdoptionPosts() {
  const [isWorker, setIsWorker] = useState(false);
  
  const [profileInfos, setProfileInfos] = useState([]);
  
  const [isUserAdmin, setButtonVisible] = useState(false);

  const [isAuthVisible, setAuthVisible] = useState(false);

  const closeModal = () => setAuthVisible(false);
  const openModal = () => setAuthVisible(true);
  
  const hiddenClass = isAuthVisible ? "hidden" : "";
  
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  
  const closeSidebar = () => setSidebarVisible(false);
  const openSidebar = () => setSidebarVisible(true);
  
  const hiddenClass2 = isSidebarVisible ? "hidden" : "";

  function getOngs() {
    ongApi.getAll().then(res => setProfileInfos(res));
  }

  useEffect(getOngs, []);
  useEffect(() => {
    const token = getToken();
    setIsWorker(token ? token.payload.isOngWorker : false);
  }, []);

  return (
    <>
      <Navbar2 />
        {isWorker &&
          <button onClick={openSidebar} className="cursor-pointer itens-top absolute top-20 left-0 justify-center w-20 rounded-br-xl
          border mx-auto p-3 shadow-sm bg-white">
            <FontAwesomeIcon
                className="mt-[0.1rem] h-[1.5rem] text-gray-400"
                icon={faSearch}
              />
        </button>}
          {isSidebarVisible &&
            createPortal(
              <div className="fixed top-0 left-0 w-full h-full bg-black/40 flex overflow-y-scroll z-20">
                <div className="mx-auto my-auto p-4 w-full">
                  <Sidebar onClose={closeSidebar} />
                </div>
              </div>,
              document.body
            )}
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
