import { useState } from "react";

export default function Sidebar() {

  const [open, setOpen] = useState(false);

  return (
    <div className= {`${open ? "h-full" : ""} bg-gray-800 fixed w-72` }>
      <button className="text-2x text-white font-bold w-72 top-9" onClick={() => setOpen(!open)}>Menu de Busca</button>
      <hr />
      <select className={`${open ? "w-full" : "hidden"} select select-bordered max-w-xs` }>
        <option disabled selected>Espécie</option>
        <option>Cachorro</option>
        <option>Gato</option>
        <option>Pássaro</option>
      </select>
      <select className={`${open ? "w-full" : "hidden"} select select-bordered max-w-xs` }>
        <option disabled selected>Porte</option>
        <option>Grande</option>
        <option>Médio</option>
        <option>Pequeno</option>
      </select>
      <select className={`${open ? "w-full" : "hidden"} select select-bordered max-w-xs` }>
        <option disabled selected>Local</option>
        <option>MG</option>
        <option>RJ</option>
        <option>SP</option>
        <option>SC</option>
      </select>
      <select className={`${open ? "w-full" : "hidden"} select select-bordered max-w-xs` }>
        <option disabled selected>Tipo de Posse</option>
        <option>Particular</option>
        <option>ONG</option>
      </select>
      <select className={`${open ? "w-full" : "hidden"} select select-bordered max-w-xs` }>
        <option disabled selected>Tags</option>
        <option>Tranquilo(a)</option>
        <option>Fofo(a)</option>
        <option>Esperto(a)</option>
        <option>Energético(a)</option>
      </select>
    </div>
  );
}