"use client";

import Image from "next/image";
import { ProfileInfo } from "@/types/profile";
import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import EditONG from "./EditONG";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser} from "@fortawesome/free-solid-svg-icons";

import { getToken } from "@/api/general.api";

export type OngCardProps = {
  info: ProfileInfo;
};



export default function OngCard({ info } : OngCardProps) {
  const ONGurl = `/ong?id=${info.id}`;

  return (
    <a href={ONGurl}>
      <button className="border rounded-t-2xl overflow-hidden w-full max-w-96 bg-white hover:shadow-md hover:scale-[101%] transition delay-50">
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
    </a>
  );
}
