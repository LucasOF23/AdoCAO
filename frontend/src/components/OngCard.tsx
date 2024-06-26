"use client";

import Image from "next/image";
import { ProfileInfo } from "@/types/profile";
import React, { useState } from "react";
import { createPortal } from "react-dom";
import EditONG from "./EditONG";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser} from "@fortawesome/free-solid-svg-icons";

export type OngCardProps = {
  info: ProfileInfo;
};

export default function OngCard({ info }: OngCardProps) {
  const imageAlt = `Imagem da ONG "${info.name}"`;

  const [isModalVisible, setIsModalVisible] = useState(false);

  const openModal = () => setIsModalVisible(true);
  const closeModal = () => setIsModalVisible(false);

  const [isUserAdmin, setAllonONG] = useState(false);

  const [isONGMember, setAllowONG2] = useState(false);

  return (
    <>
      <button onClick={isUserAdmin ? openModal : isONGMember ? openModal : closeModal}
        className="border rounded-t-2xl overflow-hidden w-full max-w-96 bg-white hover:shadow-md hover:scale-[101%] transition delay-50">
      <div className="border rounded-t-2xl overflow-hidden w-full max-w-lg hover:shadow-md hover:scale-[101%] transition delay-50 flex">
      <FontAwesomeIcon
          className="mt-[0.1rem] h-32 text-gray-400"
          icon={faCircleUser}
        />
        <div className="px-3 pb-3 pt-1">
          <h3 className="text-lg font-bold">{info.name}</h3>
          <p>
            em{" "}
            <span className="font-bold">
              {info.location.city} ({info.location.state})
            </span>
          </p>
          <p>Contato: {info.contato.telefone}</p>
        </div>
      </div>
      </button>
      {isModalVisible &&
        createPortal(
          <div className="fixed top-0 left-0 w-full h-full bg-black/40 flex overflow-y-scroll z-20">
            <div className="mx-auto my-auto p-4">
              <EditONG info={info} onClose={closeModal} />
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
