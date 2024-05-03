import React, { useState } from "react";
import Image from "next/image";
import { createPortal } from "react-dom";
import Login from "./Login";

export default function Navbar2() {
  return (
    <>
      <div className="z-10 border-b-2 h-20 shadow-sm sticky top-0 bg-white">
        <div className="mx-auto screen-max-width px-4 h-full flex flex-row justify-between align-middle">
          <Image alt="AdoCÃO logo" src="/logo.svg" width={200} height={200} />
          <details className="dropdown content-center">
            <summary className="btn hover:bg-purple-400 duration-75 hover:scale-[105%] px-5 py-3 rounded-xl m-auto">Menu</summary>
            <ul className="p-2 shadow menu dropdown-content z-[1] bg-white rounded-box w-52">
              <li className="hover:bg-gray-500"><a href="/perfil" className="home px-2">PERFIL</a></li>
              <hr />
              <li className="hover:bg-gray-500"><a href="/home" className="home px-2">Home</a></li>
              <hr />
              <li className="hover:bg-gray-500"><a href="/postagens" className="postagens px-2">Minhas Postagens</a></li>
              <hr />
              <li className="hover:bg-gray-500"><a href="/ongs" className="ongs px-2">ONG's</a></li>
            </ul>
          </details>
        </div>
      </div>
    </>
  );
}
