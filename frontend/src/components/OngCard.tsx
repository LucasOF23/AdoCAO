"use client";

import Image from "next/image";
import { ProfileInfo } from "@/types/profile";
import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import EditONG from "./EditONG";
import { Label } from "@/components/ui/label";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";

import { getToken } from "@/api/general.api";

export type OngCardProps = {
  info: ProfileInfo;
};

export default function OngCard({ info }: OngCardProps) {
  const imageAlt = `Imagem da ONG "${info.name}"`;

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);

  const openModal = () => setIsModalVisible(true);
  const closeModal = () => setIsModalVisible(false);

  const token = getToken();
  useEffect(() => {
    const token = getToken();
    setIsSuperAdmin(token ? token.payload.isSuperAdmin : false);
  }, []);

  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        closeModal();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closeModal]);

  return (
    <>
      <button
        className="border rounded-t-2xl overflow-hidden w-full max-w-96 bg-white hover:shadow-md hover:scale-[101%] transition delay-50"
        onClick={openModal}
      >
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
                {info.location.name} ({info.location.state})
              </span>
            </p>
            <p>Contato: {info.contato.telefone}</p>
          </div>
        </div>
      </button>
      {isModalVisible &&
        createPortal(
          <div className="fixed top-0 left-0 w-full h-full bg-black/40 flex overflow-y-scroll z-20">
            <div
              className="mx-auto my-auto p-4 border rounded-t-2xl max-w-screen-md sm:flex-row bg-white"
              ref={ref}
            >
              <div className="py-5">
                <div className="mb-1 flex flex-row justify-between">
                  <div>
                    <Label className="text-3xl text-center font-bold">
                      {info.name}
                    </Label>
                  </div>
                  <div className="ml-3">
                    <button onClick={closeModal}>
                      <FontAwesomeIcon
                        className="mt-[0.1rem] h-[1.5rem] text-gray-400"
                        icon={faXmark}
                      />
                    </button>
                  </div>
                </div>
                <div>
                  <Label>
                    <span className="font-bold">Cidade:</span>{" "}
                    {info.location.name} ({info.location.state})
                  </Label>
                </div>
                <div>
                  <Label>
                    <span className="font-bold">Endereço:</span> {info.adress}
                  </Label>
                </div>
                <div className="my-2">
                  <div>
                    <Label>
                      <span className="font-bold">Telefone:</span>{" "}
                      {info.contato.telefone}
                    </Label>
                  </div>
                  <div>
                    <Label>
                      <span className="font-bold">Email:</span>{" "}
                      {info.contato.email}
                    </Label>
                  </div>
                  <div>
                    <Label>
                      <span className="font-bold">Facebook:</span>{" "}
                      {info.contato.face}
                    </Label>
                  </div>
                  <div>
                    <Label>
                      <span className="font-bold">Instagram:</span>{" "}
                      {info.contato.insta}
                    </Label>
                  </div>
                  <div>
                    <Label>
                      <span className="font-bold">Outro:</span>{" "}
                      {info.contato.outro}
                    </Label>
                  </div>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
