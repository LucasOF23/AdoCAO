import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

import ongApi from "@/api/ong.api";
import cityApi from "@/api/city.api";
import { siglasEstados } from "@/lib/utils";
import { toast } from "react-toastify";

type FormsProps = {
  onClose?: () => void;
};

export default function FormsOng({ onClose }: FormsProps) {
  const [cities, setCities] = useState([]);
  const [estado, setEstado] = useState('');

  function getCities() {                
    if(estado)
      cityApi.getByState(estado).then(res => setCities(res));
  }
  
  useEffect(getCities, [estado]);

  async function addOng(event) {
    event.preventDefault();
    const keys = ['name', 'cnpj', 'CityId', 'address'];

    let data = {}
    for(const key of keys) {
      const value = event.target[key].value;
      if(value) data[key] = value;
    }

    data.cnpj = data.cnpj.replace(/\D/g, '');
    
    try {
      await ongApi.create(data);
      toast.info('ONG cadastrada com sucesso!');
      window.location.reload();
    } catch(err) {
      toast.error('Erro ao cadastrar ONG.');
      console.log(err.response);
      switch(err.response.status) {
      default:
        console.log('Erro desconhecido.');
      }
    }
  }
  
  return (
    <div className="forms-shape">
      <div className="relative">
        <h2 className="text-center text-3xl">Formulário ONG</h2>
        <form onSubmit={addOng}>

          {onClose && (
            <button type="button" onClick={onClose}>
              <FontAwesomeIcon
                className="mt-[0.1rem] h-[1.5rem] text-gray-400 absolute top-2 right-3"
                icon={faXmark}
              />
            </button>
          )}

          <div>
            <div>
              <Label>Nome da ONG</Label>
              <Input name="name" type="nome" placeholder="Arca de São Francisco" required />
            </div>
                      
            <div>
              <Label>Estado</Label>
              <select onChange={event => setEstado(event.target.value)} className="border rounded-2xl p-2 w-full flex flex-col grid-rows-2 gap-5 bg-white text-sm" required >
                <option disabled></option>
                {siglasEstados.map(sigla => (
                  <option key={sigla} value={sigla}>{sigla}</option>
                ))}
              </select>
            </div>

            <div>
              <Label>Cidade</Label>
              <select name="CityId" className="border rounded-2xl p-2 w-full flex flex-col grid-rows-2 gap-5 bg-white text-sm" required>
                <option disabled></option>
                {cities.map((city) => (
                  <option key={city.id} value={city.id}>{city.name} ({city.state})</option>
                ))}
              </select>
            </div>

            <div>
              <Label>Endereço</Label>
              <Input name="address" type="contato" placeholder="Rua ..." required />
            </div>

            <div>
              <Label>CNPJ</Label>
              <Input name="cnpj" type="cnpj" placeholder="XX.XXX.XXX/XXXX-XX" required />
            </div>

            <div className="text-center p-4">
              <button type="submit"
                className="bg-purple-300 hover:bg-purple-400 duration-75 hover:scale-[105%] px-5 py-3 rounded-xl my-auto"
              >
                Cadastrar
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
    
  );
}
