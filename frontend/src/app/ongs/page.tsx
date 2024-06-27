"use client";

import OngCard from "@/components/OngCard";

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
  const [profileInfos, setProfileInfos] = useState([]);
  const [isUserAdmin, setIsUserAdmin] = useState(false);
  const [isAuthVisible, setAuthVisible] = useState(false);

  const closeModal = () => setAuthVisible(false);
  const openModal = () => setAuthVisible(true);
  
  const hiddenClass = isAuthVisible ? "hidden" : "";
  
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  
  const closeSidebar = () => setSidebarVisible(false);
  const openSidebar = () => setSidebarVisible(true);
  
  const hiddenClass2 = isSidebarVisible ? "hidden" : "";

  function getOngs() {
    //ongApi.getUserActualOngs().then(res => setProfileInfos(res));
    ongApi.getAll().then(res => setProfileInfos(res));
  }

  useEffect(getOngs, []);
  useEffect(() => {
    const token = getToken();
    setIsUserAdmin(token ? token.payload.isSuperAdmin : false);
  }, []);

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
