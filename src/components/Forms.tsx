import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import TagContainer from "@/components/TagContainer";

type FormsProps = {
  onClose?: () => void;
};

export default function Forms({ onClose }: FormsProps) {
  const [isForms, setIsForms] = useState(true);

  const tags = [
    tag_fofo,
    tag_energetico,
    tag_brincalhao,
    tag_agressivo,
    tag_agitado,
    tag_esperto,
  ];

  return (
    <div className="mx-auto my-auto relative border rounded-t-2xl p-4 max-w-96 flex flex-col gap-5 bg-white">
      <h2 className="text-center text-3xl">{isForms ? "Formulário Dono" : "Formulário Animal"}</h2>

      {onClose && (
        <button onClick={onClose}>
          <FontAwesomeIcon
            className="mt-[0.1rem] h-[1.5rem] text-gray-400 absolute top-5 right-5"
            icon={faXmark}
          />
        </button>
      )}

      {isForms && (
        <div>
            <div>
                <Label>Nome do Responsável</Label>
                <Input type="nome" placeholder="joao pedro de alcantra" />
            </div>

            <div>
                <Label>Email</Label>
                <Input type="email" placeholder="joao@example.com" />
            </div>

            <div>
                <Label>Celular</Label>
                <Input type="telefone" placeholder="(XX) XXXXX-XXXX" />
            </div>

            <div>
                <Label>Estado</Label>
                <select className="border rounded-2xl p-2 w-full flex flex-col grid-rows-2 gap-5 bg-white text-sm">
                    <option>AC</option>
                    <option>AL</option>
                    <option>AP</option>
                    <option>AM</option>
                    <option>BA</option>
                    <option>CE</option>
                    <option>DF</option>
                    <option>ES</option>
                    <option>GO</option>
                    <option>MA</option>
                    <option>MT</option>
                    <option>MS</option>
                    <option>MG</option>
                    <option>PA</option>
                    <option>PB</option>
                    <option>PR</option>
                    <option>PE</option>
                    <option>PI</option>
                    <option>RJ</option>
                    <option>RN</option>
                    <option>RS</option>
                    <option>RO</option>
                    <option>RR</option>
                    <option>SC</option>
                    <option>SP</option>
                    <option>SE</option>
                    <option>TO</option>
                </select>
            </div>

            <div>
                <Label>Cidade</Label>
                <Input type="cidade" placeholder="Belo Horizonte" />
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
                <Label>Nome do Animal</Label>
                <Input type="nome" placeholder="Zeca" />
            </div>

            <div>
                <Label>Espécie</Label>
                <Input type="especie" placeholder="cachorro" />
            </div>

            <div>
                <Label>Raça</Label>
                <Input type="raca" placeholder="dálmata" />
            </div>

            <div>
                <Label>Sexo</Label>
                <select className="border rounded-2xl p-2 w-full flex flex-col grid-rows-2 gap-5 bg-white text-sm">
                    <option>Macho</option>
                    <option>Fêmea</option>
                </select>
            </div>

            <div>
                <Label>Idade</Label>
                <Input type="idade" placeholder="5 anos" />
            </div>

            <div>
                <Label>Peso</Label>
                <Input type="peso" placeholder="30 kg" />
            </div>

            <div>
                <Label>Porte</Label>
                <select className="border rounded-2xl p-2 w-full flex flex-col grid-rows-2 gap-5 bg-white text-sm">
                    <option>Pequeno</option>
                    <option>Médio</option>
                    <option>Grande</option>
                    <option>Gigante</option>
                </select>
            </div>

            <div>
                <Label>Tags</Label>
                <details className="dropdown content-center">
                    <summary className="dropdown-content">Menu</summary>
                    <ul className="p-1 shadow menu z-[1] bg-white rounded-box">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    </ul>
                </details>
            </div>

            <div className="flex flex-row p-4 justify-start">
                <div className="basis-1/2 flex flex-row">
                    <Label>Vermifugado</Label>
                    <Input type="checkbox" className="h-5 hover:cursor-pointer"/>
                </div>
                <div className="basis-1/2 flex flex-row content-center">
                    <Label>Castrado</Label>
                    <Input type="checkbox" className="h-5 hover:cursor-pointer"/>
                </div>
            </div>

            <div >
                <Label>Descrição</Label>
                <Input type="descricao" className="h-20"/>
            </div>

            <div>
                <Label>Imagem</Label>
                <Input type="file" className="hover:bg-purple-300 hover:cursor-pointer"/>
            </div>
            
            <div className="text-center p-4">
                <a href="/postagens" className="mx-auto w-full max-w-60 bg-purple-300 hover:bg-purple-400 duration-75 hover:scale-[105%] px-5 py-3 rounded-xl my-auto">
                    Enviar
                </a>
            </div>
        </div>

      )}

      
    </div>
  );
}