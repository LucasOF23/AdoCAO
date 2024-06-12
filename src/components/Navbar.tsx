import React, { useState } from "react";
import Image from "next/image";
import { createPortal } from "react-dom";
import Login from "./Login";
import HrefButton from "./HrefButton";

export default function Navbar() {
  const [isAuthVisible, setAuthVisible] = useState(false);

  const closeModal = () => setAuthVisible(false);
  const openModal = () => setAuthVisible(true);
  
  const hiddenClass = isAuthVisible ? "hidden" : "";

  return (
    <>
      <div className="z-10 border-b-2 h-20 shadow-sm sticky top-0 bg-white">
        <div className="mx-auto screen-max-width px-4 h-full flex flex-row justify-between align-middle">
          
          <div className='min-w-min'>
            {/* <HrefButton href='/home'> */}
              <Image alt="AdoCÃO logo" src="/logo.svg" width={200} height={200} />
            {/* </HrefButton> */}
          </div>
          
          
          
          <button
            onClick={openModal}
            className="bg-purple-300 hover:bg-purple-400 duration-75 hover:scale-[105%] px-5 py-3 rounded-xl my-auto"
          >
            Entrar
          </button>
        </div>
      </div>
      {isAuthVisible &&
        createPortal(
          <div className="fixed top-0 left-0 w-full h-full bg-black/40 flex overflow-y-scroll z-20">
            <div className="mx-auto my-auto p-4 w-full">
              <Login onClose={closeModal} />
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
