import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

type FormsProps = {
    onClose?: () => void;
};

export default function Forms({ onClose }: FormsProps) {
  const [isForms, setIsForms] = useState(true);

  return (
    <div className="forms-shape">
        <div className="relative">
            <h2 className="text-center text-3xl">{isForms ? "Formulário ONG" : "Formulário Gerente"}</h2>

            {onClose && (
                <button onClick={onClose}>
                <FontAwesomeIcon
                    className="mt-[0.1rem] h-[1.5rem] text-gray-400 absolute top-2 right-3"
                    icon={faXmark}
                />
                </button>
            )}

            {isForms && (
                <div>
                    <div>
                        <Label>Nome da ONG</Label>
                        <Input type="nome" placeholder="Arca de São Francisco" />
                    </div>
                    
                    <div>
                        <Label>Estado</Label>
                        <select className="border rounded-2xl p-2 w-full flex flex-col grid-rows-2 gap-5 bg-white text-sm">
                            <option>ES</option>
                            <option>MG</option>
                            <option>RJ</option>
                            <option>SC</option>
                            <option>SP</option>
                        </select>
                    </div>

                    <div>
                        <Label>Cidade</Label>
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
                        <Label>Endereço</Label>
                        <Input type="email" placeholder="Rua ..." />
                    </div>

                    <div>
                        <Label>CNPJ</Label>
                        <Input type="cnpj" placeholder="XX.XXX.XXX/XXXX-XX" />
                    </div>

                    <div className="text-center p-4">
                        <button
                            onClick={() => setIsForms((prev) => !prev)}
                            className="bg-purple-300 hover:bg-purple-400 duration-75 hover:scale-[105%] px-5 py-3 rounded-xl my-auto"
                        >
                            Próximo
                        </button>
                    </div>
                </div>
            )}

            

            {!isForms && (
                <div>
                    <div>
                        <Label>Email</Label>
                        <Input type="nome" placeholder="Zeca" />
                    </div>

                    <div >
                        <Label>Descrição</Label>
                        <Input type="descricao" className="h-20"/>
                    </div>

                    <div className="text-center p-4">
                        <a href="/postagens" className="mx-auto w-full max-w-60 bg-purple-300 hover:bg-purple-400 duration-75 hover:scale-[105%] px-5 py-3 rounded-xl my-auto">
                            Enviar
                        </a>
                    </div>
                </div>

            )}

            </div>
    </div>
    
  );
}