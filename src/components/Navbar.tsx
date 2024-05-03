import React from "react";
import Image from "next/image";

export default function Navbar() {
  return (
    <div className="z-10 border-b-2 h-20 shadow-sm sticky top-0 bg-white">
      <div className="mx-auto screen-max-width px-4 h-full flex flex-row justify-between align-middle">
        <Image alt="AdoCÃO logo" src="/logo.svg" width={200} height={200} />
        <button className="bg-purple-300 hover:bg-purple-400 duration-75 hover:scale-[105%] px-5 py-3 rounded-xl my-auto">
          Entrar
        </button>
      </div>
    </div>
  );
}
