"use client";

import authApi from "@/api/auth.api";
import { getToken } from "@/api/general.api";
import Image from "next/image";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Login from "./Login";

export default function Navbar2() {
  const isUserLoggedIn = getToken() ? true : false;
  const [isAuthVisible, setAuthVisible] = useState(false);

  const closeModal = () => setAuthVisible(false);
  const openModal = () => setAuthVisible(true);

  const hiddenClass = isAuthVisible ? "hidden" : "";

  let trailing;
  if (isUserLoggedIn) {
    trailing = (
      <details className="block my-auto relative">
        <summary className="bg-purple-300 hover:bg-purple-400 duration-75 hover:scale-[105%] px-10 py-3 rounded-xl my-auto">
          Menu
        </summary>
        <ul className="absolute p-1 shadow-md menu z-10 bg-white rounded-box">
          <li className="hover:bg-gray-200">
            <a href="/perfil" className="w-full p-2 block text-center">
              Perfil
            </a>
          </li>
          <hr />
          <li className="hover:bg-gray-200">
            <a href="/postagens" className="w-full p-2 block text-center">
              Minhas Postagens
            </a>
          </li>
          <hr />
          <li className="hover:bg-gray-200">
            <a href="/ongs" className="w-full p-2 block text-center">
              ONG&lsquo;s
            </a>
          </li>
          <hr />
          <li className="hover:bg-gray-200">
            <a href="/my_ongs" className="w-full p-2 block text-center">
              Minhas ONG&lsquo;s
            </a>
          </li>
          <hr />
          <li className="hover:bg-gray-200">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                authApi.logout();
                window.location.href = "/";
              }}
              className="w-full p-2 block text-center"
            >
              Logout
            </a>
          </li>
        </ul>
      </details>
    );
  } else {
    trailing = (
      <button
        onClick={openModal}
        className="bg-purple-300 hover:bg-purple-400 duration-75 hover:scale-[105%] px-5 py-3 rounded-xl my-auto"
      >
        Entrar
      </button>
    );
  }

  return (
    <>
      <div className="z-10 border-b-2 h-20 shadow-sm sticky top-0 bg-white">
        <div className="mx-auto screen-max-width px-4 h-full flex flex-row justify-between align-middle">
          <a href="/" className="block my-auto">
            <Image alt="AdoCÃO logo" src="/logo.svg" width={200} height={200} />
          </a>
          {trailing}
          {isAuthVisible &&
            createPortal(
              <div className="fixed top-0 left-0 w-full h-full bg-black/40 flex overflow-y-scroll z-20">
                <div className="mx-auto my-auto p-4 w-full">
                  <Login onClose={closeModal} />
                </div>
              </div>,
              document.body
            )}
        </div>
      </div>
    </>
  );
}
