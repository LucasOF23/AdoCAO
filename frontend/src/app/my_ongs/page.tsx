"use client";

import OngCard from "@/components/OngCard2";

import React, { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { createPortal } from "react-dom";

import Navbar2 from "@/components/Navbar2";
import Lowerbar from "@/components/Lowerbar";
import Forms from "@/components/Forms_Ong";
import { ProfileInfo } from "@/types/profile";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faCircleUser} from "@fortawesome/free-solid-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";


import ongApi from "@/api/ong.api";
import { getToken } from "@/api/general.api";

export default function AdoptionPosts() {
  const [isWorker, setIsWorker] = useState(false);
  
  const [profileInfos, setProfileInfos] = useState([]);
  const [isUserAdmin, setIsUserAdmin] = useState(false);
  const [isAuthVisible, setAuthVisible] = useState(false);

  const [showOnlyWorkOngs, setShowOnlyWorkOngs] = useState(false);

  const closeModal = () => setAuthVisible(false);
  const openModal = () => setAuthVisible(true);
  
  const hiddenClass = isAuthVisible ? "hidden" : "";
  
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  
  const closeSidebar = () => setSidebarVisible(false);
  const openSidebar = () => setSidebarVisible(true);
  
  const hiddenClass2 = isSidebarVisible ? "hidden" : "";

  function getOngs() {
    if(showOnlyWorkOngs)
      ongApi.getUserActualOngs().then(res => setProfileInfos(res)); 
    else 
      ongApi.getAll().then(res => setProfileInfos(res));
  }

  useEffect(getOngs, [showOnlyWorkOngs]);
  useEffect(() => {
    const token = getToken();
    setIsWorker(token ? token.payload.isOngWorker : false);
    setIsUserAdmin(token ? token.payload.isSuperAdmin : false);
  }, []);

  return (
    <>
      <Navbar2 />
      {isWorker &&
        <button onClick={openSidebar} className="cursor-pointer itens-top absolute top-20 left-0 justify-center w-20 rounded-br-xl border mx-auto p-3 shadow-sm bg-white">
          <FontAwesomeIcon
            className="mt-[0.1rem] h-[1.5rem] text-gray-400"
            icon={faSearch}
          />
        </button>}
      {isSidebarVisible &&
        createPortal(
          <div className="fixed top-0 left-0 w-full h-full bg-black/40 flex overflow-y-scroll z-20">
            <div className="mx-auto my-auto p-4 w-full">
              <div className="absolute left-0 top-0 border p-4 max-w-96 w-full h-screen overflow-auto flex flex-col gap-5 bg-white">
                <h2 className="title-filter">Filtros</h2>

                <button onClick={closeSidebar}>
                  <FontAwesomeIcon
                    className="mt-[0.1rem] h-[1.5rem] text-gray-400 absolute top-5 right-5"
                    icon={faXmark}
                  />
                </button>
                <div className="flex flex-row p-4">
                  <div className="flex flex-row mx-auto my-auto">
                    <Label className="text-xl">Minhas ONG's</Label>
                    <Input type="checkbox" onChange={event => setShowOnlyWorkOngs(event.target.checked)} className="self-center h-5 hover:cursor-pointer"/>
                  </div>
                </div>
              </div>
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
      </div>
      <Lowerbar />
    </>
  );
}
