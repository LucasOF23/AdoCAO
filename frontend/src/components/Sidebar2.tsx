import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect, useRef } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import animalApi from "@/api/animal.api";
import cityApi from "@/api/city.api";
import specieApi from "@/api/animalspecie.api";
import tagApi from "@/api/animaltag.api";

type FormsProps = {
  onClose?: () => void;
  updateAnimals;
};

export default function Sidebar({ onClose, updateAnimals }: FormsProps) {
  const [cities, setCities] = useState([]);
  const [species, setSpecies] = useState([]);
  const [tags, setTags] = useState([]);

  async function send(event) {
    event.preventDefault();

    const keys = [
      "genders",
      "cityIds",
      "speciesIds",
      "ownerKind",
      "isVerm",
      "isCast",
      "heightMin",
      "heightMax",
      "weightMin",
      "weightMax",
      "ageMin",
      "ageMax",
    ];
    const toArrayKeys = ["genders", "cityIds", "speciesIds"];

    let filters = { isAdopted: false };
    for (const key of keys) {
      const el = event.target[key];
      const value = el.type === "checkbox" ? el.checked : el.value;

      if (value && toArrayKeys.includes(key)) filters[key] = [value];
      else if (value || el.type === "checkbox") filters[key] = value;
    }

    filters.tagIds = [];
    for (const tag of tags) {
      if (tag.isMarked) filters.tagIds.push(tag.id);
    }

    console.log(filters);

    animalApi.searchWithFilter(filters).then((res) => updateAnimals(res));
  }

  function handleTagMark(event, pos) {
    if (event.target.checked) {
      tags[pos].isMarked = true;
    } else {
      tags[pos].isMarked = false;
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
              <li className="flex">
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

  function getAllCities() {
    cityApi.getAll().then((res) => setCities(res));
  }

  function getAllSpecies() {
    specieApi.getAll().then((res) => setSpecies(res));
  }

  function getAllTags() {
    tagApi.getAll().then((res) =>
      setTags(
        res.map((tag) => {
          tag.isMarked = false;
          return tag;
        })
      )
    );
  }

  useEffect(getAllCities, []);
  useEffect(getAllSpecies, []);
  useEffect(getAllTags, []);

  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div
      ref={ref}
      className="absolute left-0 top-0 border p-4 max-w-96 w-full h-screen overflow-auto flex flex-col gap-5 bg-white"
    >
      <form onSubmit={send}>
        <h2 className="title-filter">Filtros</h2>

        {onClose && (
          <button type="button" onClick={onClose}>
            <FontAwesomeIcon
              className="mt-[0.1rem] h-[1.5rem] text-gray-400 absolute top-5 right-5"
              icon={faXmark}
            />
          </button>
        )}
        <div>
          <Label>Cidade</Label>
          <select
            name="cityIds"
            className="border rounded-2xl p-2 w-full flex flex-col grid-rows-2 gap-5 bg-white text-sm"
          >
            <option></option>
            {cities.map((city) => (
              <option key={city.id} value={city.id}>
                {city.name} ({city.state})
              </option>
            ))}
          </select>
        </div>
        <div>
          <Label>Tipo de Dono</Label>
          <select
            name="ownerKind"
            className="border rounded-2xl p-2 w-full flex flex-col grid-rows-2 gap-5 bg-white text-sm"
          >
            <option></option>
            <option key="user" value="user">
              Pessoa Física
            </option>
            <option key="ong" value="ong">
              ONG
            </option>
          </select>
        </div>
        <div>
          <Label>Espécie</Label>
          <select
            name="speciesIds"
            className="border rounded-2xl p-2 w-full flex flex-col grid-rows-2 gap-5 bg-white text-sm"
          >
            <option></option>
            {species.map((specie) => (
              <option key={specie.id} value={specie.id}>
                {specie.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <Label>Sexo</Label>
          <select
            name="genders"
            className="border rounded-2xl p-2 w-full flex flex-col grid-rows-2 gap-5 bg-white text-sm"
          >
            <option></option>
            <option key="M" value="M">
              Macho
            </option>
            <option key="F" value="F">
              Fêmea
            </option>
          </select>
        </div>

        <div>
          <Label>Idade Mínima</Label>
          <Input name="ageMin" type="idade" placeholder="1 ano" />
        </div>

        <div>
          <Label>Idade Máxima</Label>
          <Input name="ageMax" type="idade" placeholder="5 anos" />
        </div>

        <div>
          <Label>Peso Mínimo</Label>
          <Input name="weightMin" type="peso" placeholder="10 kg" />
        </div>

        <div>
          <Label>Peso Máximo</Label>
          <Input name="weightMax" type="peso" placeholder="30 kg" />
        </div>

        <div>
          <Label>Tamanho Mínimo</Label>
          <Input name="heightMin" type="altura" placeholder="5 cm" />
        </div>

        <div>
          <Label>Tamanho Máximo</Label>
          <Input name="heightMax" type="altura" placeholder="80 cm" />
        </div>

        <div>{renderTags(tags)}</div>

        <div className="flex flex-row p-4 justify-start">
          <div className="basis-1/2 flex flex-row">
            <Label>Vermifugado</Label>
            <Input
              name="isVerm"
              type="checkbox"
              className="h-5 hover:cursor-pointer"
            />
          </div>
          <div className="basis-1/2 flex flex-row">
            <Label>Castrado</Label>
            <Input
              name="isCast"
              type="checkbox"
              className="h-5 hover:cursor-pointer"
            />
          </div>
        </div>

        <div className="text-center p-4">
          <button
            type="submit"
            className="mx-auto w-full max-w-60 bg-purple-300 hover:bg-purple-400 duration-75 hover:scale-[105%] px-5 py-3 rounded-xl my-auto"
          >
            FILTRAR
          </button>
        </div>
      </form>
    </div>
  );
}
