import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

type FormsProps = {
  isFromOng: boolean;
  ongId?: number;
  onClose?: () => void;
};

import cityApi from "@/api/city.api";
import tagApi from "@/api/animaltag.api";
import specieApi from "@/api/animalspecie.api";
import animalApi from "@/api/animal.api";
import { siglasEstados } from "@/lib/utils";

export default function Forms({tipo, isFromOng, ongId, onClose }: FormsProps) {
  const [isForms, setIsForms] = useState(true);

  const [cities, setCities] = useState([]);
  const [estado, setEstado] = useState('');

  const [tags, setTags] = useState([]);
  const [species, setSpecies] = useState([]);

  function getCities() {                
    if(estado)
      cityApi.getByState(estado).then(res => setCities(res));
  }

  useEffect(getCities, [estado]);
  useEffect(() => {
    tagApi.getAll().then((res) =>
      setTags(
        res.map((tag) => {
          tag.isMarked = false;
          return tag;
        })
      )
    );
  }, []);
  useEffect(() => {
    specieApi.getAll().then(res => setSpecies(res));
  }, []);
  
  async function addAnimal(event) {
    event.preventDefault();

    const formData = new FormData(event.target);

    const boolKeys = ['isNeutered', 'isDewormed'];
    for(const key of boolKeys) {
      if(formData.get(key)) {
        formData.delete(key);
        formData.append(key, '1');
      } else
        formData.append(key, '0');
    }

    formData.append('isUserOwned', isFromOng ? '0' : '1');
    if(isFromOng)
      formData.append('ongId', ongId);
    
    console.log(formData);

    try {
      const res = await animalApi.create(formData);
      console.log('Cadastro feito com sucesso!');
    } catch(err) {
      console.log(err);
      switch(err.response.status) {
      default:
        console.log('Erro desconhecido');      
      }
    }
  }

  function renderTags(tags) {
    const cntPerLine = 2;
    const lines = [];

    let i = 0;
    while (i < tags.length) {
      let line = [];
      for (let j = 0; i < tags.length && j < cntPerLine; i++, j++)
        line.push(tags[i]);
      lines.push(line);
    }

    return (
      <div>
        <details className="dropdown">
          <summary className="dropdown-content border rounded-2xl p-2 my-5 w-full grid-rows-2 gap-5 bg-white">
            Tags
          </summary>
          <ul className="p-1 shadow menu z-[1] flex flex-col bg-white rounded-box">
            {lines.map((line, indexLine) => (
              <li key={indexLine} className="flex">
                {line.map((tag, index) => (
                  <>
                    <Label className="w-1/3">{tag.name}</Label>
                    <Input
                      type="checkbox"
                      value={tag.isMarked}
                      onChange={(event) =>
                        handleTagMark(event, indexLine * cntPerLine + index)
                      }
                      className="h-5 hover:cursor-pointer w-1/6"
                    />
                  </>
                ))}
              </li>
            ))}
          </ul>
        </details>
      </div>
    );
  }
  
  return (
    <div className="forms-shape">
      <div className="relative">
        <h2 className="text-center text-3xl">Formulário Animal</h2>

        {onClose && (
          <button onClick={onClose}>
            <FontAwesomeIcon
              className="mt-[0.1rem] h-[1.5rem] text-gray-400 absolute top-2 right-3"
              icon={faXmark}
            />
          </button>
        )}

        <div className="">
          <form onSubmit={addAnimal}>                 
            <div>
              <Label>Nome do Animal</Label>
              <Input name="name" type="nome" placeholder="Zeca" required />
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
              <Label>Espécie</Label>
              <select
                name="AnimalSpecieId"
                className="border rounded-2xl p-2 w-full flex flex-col grid-rows-2 gap-5 bg-white text-sm"
                required>
                <option disabled></option>
                {species.map((specie) => (
                  <option key={specie.id} value={specie.id}>
                    {specie.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <Label>Sexo</Label>
              <select name="animalGender" className="border rounded-2xl p-2 w-full flex flex-col grid-rows-2 gap-5 bg-white text-sm" required>
                <option value="M">Macho</option>
                <option value="F">Fêmea</option>
              </select>
            </div>

            <div>
              <Label>Nascimento</Label>
              <Input name="birthdate" type="date" placeholder="22/12/22" required />
            </div>

            <div>
              <Label>Peso</Label>
              <Input name="weightInKg" type="peso" placeholder="30 kg" />
            </div>

            <div>
              <Label>Altura</Label>
              <Input name="heightInCm" type="peso" placeholder="3 m" />
            </div>

            <div className="flex flex-row p-4 justify-start">
              <div className="basis-1/2 flex flex-row">
                <Label>Vermifugado</Label>
                <Input name="isDewormed" type="checkbox" className="h-5 hover:cursor-pointer"/>
              </div>
              <div className="basis-1/2 flex flex-row">
                <Label>Castrado</Label>
                <Input name="isNeutered" type="checkbox" className="h-5 hover:cursor-pointer"/>
              </div>
            </div>

            <div >
              <Label>Descrição</Label>
              <Input name="description" type="descricao" className="h-20" required />
            </div>

            <div>
              <Label>Imagem</Label>
              <Input name="photo" type="file" className="hover:bg-purple-300 hover:cursor-pointer" required />
            </div>
                    
            <div className="text-center p-4">
              <button type="submit" className="mx-auto w-full max-w-60 bg-purple-300 hover:bg-purple-400 duration-75 hover:scale-[105%] px-5 py-3 rounded-xl my-auto">
                Enviar
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
    
  );
}
