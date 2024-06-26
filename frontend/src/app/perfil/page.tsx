"use client";

import Navbar from "@/components/Navbar2";
import Lowerbar from "@/components/Lowerbar";
import FormsEditProfile from "@/components/Forms-Edit-Profile";

export default function EditPerfil() {
  return (
    <>
      <Navbar />
      <div className="mx-auto pt-[2vw] screen-max-width">
        <div className="w-full">
          <div>
            <h1 className="text-5xl font-bold text-center pt-5">Meu Perfil</h1>
          </div>
          
          <hr />
          <div className="pt-4 mx-auto max-w-fit">
            <FormsEditProfile></FormsEditProfile>
          </div>
        </div>
      </div>
      <hr />
      <div className="p-4 mx-auto screen-max-width grid justify-items-center grid-autofit gap-4">
        {/* <div className="py-7 px-10 bg-purple-600 rounded-md"><HrefButton href='/edit_perfil'>Editar Perfil</HrefButton></div>
        <div className="py-7 px-10 bg-purple-600 rounded-md"><HrefButton href='/trocar_senha'>Trocar Senha</HrefButton></div>
        <div className="py-7 px-10 bg-rose-600 rounded-md"><HrefButton href='/confirmar_apagar'>Apagar Perfil</HrefButton></div> */}
      </div>
      <Lowerbar />
    </>
  );
}
