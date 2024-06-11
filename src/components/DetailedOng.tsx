import Image from "next/image";
import TagContainer from "./TagContainer";
import { ProfileInfo } from "@/types/profile";
import React from "react";
import {SocialMedia,SocialMediaProps} from "@/components/SocialMedia";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";


export type DetailedPostProps = {
  info: ProfileInfo;
  onClose?: () => void;
};

export default function DetailedOng({ info, onClose }: DetailedPostProps) {
  
  const descricaoHardcoded =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
  
  const ong_redessociais: SocialMediaProps = {
    url_instagram: "adsfsd",
    url_facebook: "bsdfs",
    url_twitter: "csdfs"
  };
  
  return (
    <div className="border rounded-t-2xl overflow-hidden max-w-4xl flex min-h-80 flex-col sm:flex-row bg-white">
      <div className="max-w-1/2 sm:w-1/2">
        <Image
          alt=""
          className="object-cover h-full"
          src={info.imageUrl}
          width={2000}
          height={2000}
        />
      </div>

      <div className="max-w-1/2 sm:w-1/2 p-4 flex flex-col">
        <div className="flex flex-row justify-between">
          <div className="flex flex-row gap-3">
            <h2 className="font-semibold text-2xl">{info.name}</h2>
          </div>
          {onClose && (
            <button onClick={onClose}>
              <FontAwesomeIcon
                className="mt-[0.1rem] h-[1.5rem] text-gray-400"
                icon={faXmark}
              />
            </button>
          )}
        </div>
        
        <div className="mt-2 flex flex-col">
          <span className="font-semibold text-xs">Local</span>
          <span>
            {info.location.city} ({info.location.state})
          </span>
          <span>
            {info.location.address}
          </span>
        </div>
        
        <div className="mt-2 flex flex-col">
          <span className="font-semibold text-xs">Contato</span>
          <span>
            {info.cellphone}
          </span>
        </div>
        
        <div className='mt-2 flex flex-col align-center'>
          <SocialMedia url_instagram={ong_redessociais.url_instagram}
                       url_facebook={ong_redessociais.url_facebook}
                       url_twitter={ong_redessociais.url_twitter}/>
        </div>
        
        <div className="mt-2 flex flex-col">
          <span className="font-semibold text-xs">Descrição</span>
          <span className="text-sm text-wrap">{descricaoHardcoded}</span>
        </div>
        
        
      </div>
    </div>
  );
}
