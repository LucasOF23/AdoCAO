import Image from "next/image";
import React from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { ProfileInfo } from "@/types/profile";

export type DetailedPostProps = {
  info: ProfileInfo;
  onClose?: () => void;
};

export default function EditONG({ info, onClose }: DetailedPostProps) {

  const descricaoHardcoded =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

  return (
    <div className="forms-shape">

      <div className="p-4 flex flex-col">
        <div className="flex flex-row justify-between">
          {onClose && (
            <button onClick={onClose}>
              <FontAwesomeIcon
                className="mt-[0.1rem] h-[1.5rem] text-gray-400"
                icon={faXmark}
              />
            </button>
          )}
        </div>

        <div>
                <Label>Nome da ONG - {info.name}</Label>
                <Input type="nome" placeholder={info.name}/>
            </div>
            
            <div>
                <Label>Estado - {info.location.state}</Label>
                <select className="border rounded-2xl p-2 w-full flex flex-col grid-rows-2 gap-5 bg-white text-sm">
                    <option>ES</option>
                    <option>MG</option>
                    <option>RJ</option>
                    <option>SC</option>
                    <option>SP</option>
                </select>
            </div>

            <div>
                <Label>Cidade - {info.location.city}</Label>
                <select className="border rounded-2xl p-2 w-full flex flex-col grid-rows-2 gap-5 bg-white text-sm">
                    <option>Analândia</option>
                    <option>Araraquara</option>
                    <option>Araras</option>
                    <option>Belo Horizonte</option>
                    <option>Brotas</option>
                    <option>Descalvado</option>
                    <option>Florianópolis</option>
                    <option>Ibaté</option>
                    <option>Itirapina</option>
                    <option>Pirassununga</option>
                    <option>Ribeirão Bonito</option>
                    <option>Rio Claro</option>
                    <option>Rio de Janeiro</option>
                    <option>São Carlos</option>
                    <option>São Paulo</option>
                    <option>Vitória</option>
                    <option>Outra</option>
                </select>
            </div>

            <div>
                <Label>Endereço - {info.adress}</Label>
                <Input type="email" placeholder="Rua ..." />
            </div>

            <div>
                <Label>CNPJ - {info.cnpj}</Label>
                <Input type="cnpj" placeholder="XX.XXX.XXX/XXXX-XX" />
            </div>

            <div>
                <Label>Gerente Email - {info.managerEmail}</Label>
                <Input type="nome" placeholder="Zeca" />
            </div>

            <div>
                <Label>Descrição</Label>
                <Input type="nome" className="h-30" placeholder={info.Description} />
            </div>

            <div>
                <Label>Email - {info.contato.email}</Label>
                <Input type="contato" placeholder="email" />
            </div>

            <div>
                <Label>Telefone - {info.contato.telefone}</Label>
                <Input type="contato" placeholder="(XX) XXXXX-XXXX" />
            </div>

            <div>
                <Label>Facebook - {info.contato.face}</Label>
                <Input type="contato" placeholder="facebook" />
            </div>

            <div>
                <Label>Instagram - {info.contato.insta}</Label>
                <Input type="contato" placeholder="instagram" />
            </div>

            <div>
                <Label>Outro Contato - {info.contato.outro}</Label>
                <Input type="contato" placeholder="" />
            </div>

            <div className="text-center p-4">
                {onClose && (
                    <button className="mx-auto w-full max-w-60 bg-purple-300 hover:bg-purple-400 duration-75 hover:scale-[105%] px-5 py-3 rounded-xl my-auto" onClick={onClose}>
                    Enviar
                    </button>
                )}
            </div>
      </div>
    </div>
  );
}
