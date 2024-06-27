import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

type FormsProps = {
  onClose?: () => void;
};

export default function Sidebar({ onClose }: FormsProps) {

  return (
    <div className="absolute left-0 top-0 border p-4 max-w-96 w-full h-screen overflow-auto flex flex-col gap-5 bg-white">
      <h2 className="title-filter">Filtros</h2>

      {onClose && (
        <button onClick={onClose}>
          <FontAwesomeIcon
            className="mt-[0.1rem] h-[1.5rem] text-gray-400 absolute top-5 right-5"
            icon={faXmark}
          />
        </button>
      )}
            <div className="flex flex-row p-4">
                <div className="flex flex-row mx-auto my-auto">
                    <Label className="text-xl">Minhas ONG's</Label>
                    <Input type="checkbox" className="self-center h-5 hover:cursor-pointer"/>
                </div>
            </div>
            <div className="text-center p-4">
                <a href="/ongs" className="mx-auto w-full max-w-60 bg-purple-300 hover:bg-purple-400 duration-75 hover:scale-[105%] px-5 py-3 rounded-xl my-auto">
                    FILTRAR
                </a>
            </div>
        </div>
  );
}
