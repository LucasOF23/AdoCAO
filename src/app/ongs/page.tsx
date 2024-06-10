"use client";

import OngCard from "@/components/OngCard";

import Navbar2 from "@/components/Navbar2";
import Lowerbar from "@/components/Lowerbar";
import { ProfileInfo } from "@/types/profile";
import ModalCreateONG from "@/components/ModalCreateONG"
import HrefButton from "@/components/HrefButton";
import HrefDiv from "@/components/HrefDiv";

export default function AdoptionPosts() {
    const profileInfos: [ProfileInfo] = [
      {
        id: 1,
        user_type: "ONG",
        name: "S.O.S. Doguinhos",
        location: { city: "São Carlos", state: "São Paulo" },
        imageUrl: "https://images.dog.ceo/breeds/poodle-standard/n02113799_1316.jpg",
        cellphone: "(12) 3 4567-8910",
        email: "aaa",
        animals: [],
      },
      {
        id: 2,
        user_type: "ONG",
        name: "Dogões S.A.",
        location: { city: "São Carlos", state: "São Paulo" },
        imageUrl: "https://images.dog.ceo/breeds/shiba/shiba-17.jpg",
        cellphone: "(12) 3 4567-8910",
        email: "aaa",
        animals: [],
      },
      {
        id: 3,
        user_type: "user",
        name: "Zeca",
        location: { city: "São Carlos", state: "São Paulo" },
        imageUrl: "",
        cellphone: "aaa",
        email: "aaa",
        animals: [],
      },
    ];
  

  
  return (
    <>
      <Navbar2 />
      <div className="text-center text-5xl font-bold m-10">Conheça nossas ONG's parceiras!</div>
      
      
      <div className="flex flex-row">
          <p className='min-w-max'>Você é um Admin! você pode criar ONGs: </p>
          <button className="btn text-[15px] border rounded-2xl overflow-hidden
          w-full min-w-min w-[90px] hover:shadow-md hover:scale-[101%] transition delay-50" 
          onClick={() => document.getElementById('my_modal_3').showModal()}>
              Criar ONG
              <dialog id="my_modal_3" className="modal w-1000">
                <div className="modal-box justify-start items-start">
                  <ModalCreateONG />
                </div>
                <form method="dialog" className="modal-backdrop">
                  <button>FECHAR</button>
                </form>
              </dialog>
          </button>
      </div>
      
      
      
      
      <div className="p-4 mx-auto screen-max-width grid justify-items-center grid-autofit gap-4">
        {profileInfos.map((info) => (
          info.user_type === "ONG" 
            ? <>
              <HrefDiv href='/home'>
                <OngCard key={info.id} info={info} />
              </HrefDiv>
              
            </>
          : null
        ))}
      </div>
      <Lowerbar />
    </>
  );
}