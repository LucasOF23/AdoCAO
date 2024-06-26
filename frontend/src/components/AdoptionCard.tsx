"use client";

import Image from "next/image";
import { DogInfo, DogOwnerKind } from "@/types/dog";
import React, { useState } from "react";
import DetailedPost from "./DetailedPost";
import Modal from "react-modal";
import { createPortal } from "react-dom";
import GenderIcon from "./GenderIcon";

export type AdoptionCardProps = {
  info: DogInfo;
};

function getOwnerPrefix(kind: DogOwnerKind) {
  switch (kind) {
    case "ONG":
      return "da ONG";
    case "user":
      return "do usuário";
  }
}

export default function AdoptionCard({ info }: AdoptionCardProps) {
  const imageAlt = `Imagem do cachorro "${info.name}"`;
  const ownerPrefix = getOwnerPrefix(info.owner.kind);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const openModal = () => setIsModalVisible(true);
  const closeModal = () => setIsModalVisible(false);

  return (
    <>
      <button
        onClick={openModal}
        className="border rounded-t-2xl overflow-hidden w-full max-w-96 hover:shadow-md hover:scale-[101%] transition delay-50"
      >
        <div className="w-full h-72">
          <Image
            alt={imageAlt}
            className="object-cover w-full h-full"
            src={info.imageUrl}
            width={2000}
            height={2000}
          />
        </div>
        <div className="px-3 pb-3 pt-1 text-start">
          <div className="flex flex-row">
            <h3 className="text-lg font-bold">{info.name}</h3>
            <GenderIcon gender={info.gender} className="ml-2 h-5" />
          </div>

          <p>
            {ownerPrefix} <span className="font-bold">{info.owner.name}</span>
          </p>
          <p>
            em{" "}
            <span className="font-bold">
              {info.location.city} ({info.location.state})
            </span>
          </p>
        </div>
      </button>
      {isModalVisible &&
        createPortal(
          <div className="fixed top-0 left-0 w-full h-full bg-black/40 flex overflow-y-scroll z-20">
            <div className="mx-auto my-auto p-4">
              <DetailedPost info={info} onClose={closeModal} />
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
