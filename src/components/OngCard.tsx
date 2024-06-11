import Image from "next/image";
import React,{useState} from "react";
import { ProfileInfo } from "@/types/profile";
import { createPortal } from "react-dom";
import DetailedOng from "@/components/DetailedOng"

export type OngCardProps = {
  info: ProfileInfo;
};

export default function OngCard({ info }: OngCardProps) {
  const imageAlt = `Imagem da ONG "${info.name}"`;
  
  const [isModalVisible, setIsModalVisible] = useState(false);
  
  const openModal = () => setIsModalVisible(true);
  const closeModal = () => setIsModalVisible(false);
  
  return (
    <>
    <button className="border rounded-t-2xl overflow-hidden w-full max-w-lg hover:shadow-md hover:scale-[101%] transition delay-50 flex"
    onClick={openModal}>
      <div className="w-72 h-52">
        <Image
          alt={imageAlt}
          className="object-cover h-full"
          src={info.imageUrl}
          width={2000}
          height={2000}
        />
      </div>
      
      <div className="px-3 pb-3 pt-1">
        <h3 className="text-lg font-bold">{info.name}</h3>
        <p>
          em{" "}
          <span className="font-bold">
            {info.location.city} ({info.location.state})
          </span>
        </p>
        <p>Contato: {info.cellphone}</p>
      </div>
    </button>
    {isModalVisible &&
        createPortal(
          <div className="fixed top-0 left-0 w-full h-full bg-black/40 flex overflow-y-scroll z-20">
            <div className="mx-auto my-auto p-4">
              <DetailedOng info={info} onClose={closeModal} />
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
