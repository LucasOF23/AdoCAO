"use client";

import AdoptionCard from "@/components/AdoptionCard";

import React, { useState , useEffect} from "react";
import { createPortal } from "react-dom";
import Forms from "@/components/Forms";
import Navbar2 from "@/components/Navbar2";
import Sidebar from "@/components/Sidebar2";
import Lowerbar from "@/components/Lowerbar";
import { ProfileInfo } from "@/types/profile";
import { DogInfo } from "@/types/dog";
import EditONG from "@/components/EditONG";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import { useSearchParams } from 'next/navigation';

import animalApi from "@/api/animal.api";

export default function ONGPosts() {
  const searchParams = useSearchParams();
  const [id, setId] = useState<string | null>(null);

  const [dogInfos, setDogInfos] = useState([]);

  useEffect(() => {
    const idParam = searchParams.get('id');
    setId(idParam);
  }, [searchParams]);

  useEffect(() => {
    if(id)
      animalApi.getFromOng(id).then(res => setDogInfos(res));
  }, [id]);

  const [isAuthVisible, setAuthVisible] = useState(false);

  const closeModal = () => setAuthVisible(false);
  const openModal = () => setAuthVisible(true);

  const hiddenClass = isAuthVisible ? "hidden" : "";

  return (
    <>
      <Navbar2 />
      <EditONG ongId={id} />
      <div className="p-4 mx-auto screen-max-width grid justify-items-center grid-autofit gap-4">
        {dogInfos.map((info) => (
          <AdoptionCard tipo={true} key={info.id} info={info} isFromOng={true} />
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
                <Forms isFromOng={true} ongId={id} onClose={closeModal} />
              </div>
            </div>,
            document.body
          )}
      </div>
      <Lowerbar />
    </>
  );
}
