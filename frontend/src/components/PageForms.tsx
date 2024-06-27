import { FormsSel, FormsSelProps, FormsItem } from "@/components/FormsSel";
import { FormsInput, FormsInputProps } from "@/components/FormsInput";
import Checkbox from "@/components/Checkbox";

export default function PageForms() {
  //Identificação do responsável
  const ask_nome = (
    <FormsInput key={0} title="Nome do responsável"></FormsInput>
  );
  const ask_email = <FormsInput key={1} title="Email"></FormsInput>;
  const ask_celular = <FormsInput key={2} title="Celular"></FormsInput>;
  const ask_df = (
    <FormsSel
      key={3}
      title="DF"
      items={[
        { id: 0, label: "SP" },
        { id: 1, label: "SC" },
        { id: 2, label: "MG" },
      ]}
    ></FormsSel>
  );
  const ask_cidade = <FormsInput key={4} title="Cidade"></FormsInput>;
  const ask_all_responsavel = [
    ask_nome,
    ask_email,
    ask_celular,
    ask_df,
    ask_cidade,
  ];

  // Identificação do animal
  const ask_nome_animal = (
    <FormsInput key={5} title="Nome do animal"></FormsInput>
  );
  const ask_sexo = (
    <FormsSel
      key={5}
      title="Sexo"
      items={[
        { id: 0, label: "M" },
        { id: 1, label: "F" },
      ]}
    ></FormsSel>
  );
  const ask_idade = (
    <FormsInput key={6} title="Idade">
      <div className="max-w-[300px]">
        <p>
          Para preencher este campo adequadamente, forneça uma estimativa da
          quantidade de anos de vida do seu animal
        </p>
      </div>
    </FormsInput>
  );
  const ask_peso = <FormsInput key={6} title="Peso"></FormsInput>;
  const ask_porte = (
    <FormsSel
      key={7}
      title="Porte"
      items={[
        { id: 0, label: "Pequeno" },
        { id: 1, label: "Médio" },
        { id: 2, label: "Grande" },
        { id: 3, label: "Gigante" },
      ]}
    >
      <div className="max-w-[3<00px]">
        <h1 className="text-xl font-serif text-center">
          Confira essa tabela para cachorros
        </h1>
        <br />
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 py-2 px-4 bg-gray-200 text-left text-black">
                Porte
              </th>
              <th className="border border-gray-300 py-2 px-4 bg-gray-200 text-left text-black">
                Peso (kg)
              </th>
              <th className="border border-gray-300 py-2 px-4 bg-gray-200 text-left text-black">
                Altura (cm)
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 py-2 px-4">Pequeno</td>
              <td className="border border-gray-300 py-2 px-4">1 - 10</td>
              <td className="border border-gray-300 py-2 px-4">15 - 30</td>
            </tr>
            <tr>
              <td className="border border-gray-300 py-2 px-4">Médio</td>
              <td className="border border-gray-300 py-2 px-4">10 - 25</td>
              <td className="border border-gray-300 py-2 px-4">30 - 50</td>
            </tr>
            <tr>
              <td className="border border-gray-300 py-2 px-4">Grande</td>
              <td className="border border-gray-300 py-2 px-4">25 - 45</td>
              <td className="border border-gray-300 py-2 px-4">50 - 70</td>
            </tr>
            <tr>
              <td className="border border-gray-300 py-2 px-4">Gigante</td>
              <td className="border border-gray-300 py-2 px-4">45+</td>
              <td className="border border-gray-300 py-2 px-4">70+</td>
            </tr>
          </tbody>
        </table>
      </div>
    </FormsSel>
  );
  const ask_especie = (
    <FormsSel
      key={8}
      title="Espécie"
      items={[
        { id: 0, label: "Cachorro" },
        { id: 1, label: "Gato" },
        { id: 2, label: "Cobra" },
      ]}
    ></FormsSel>
  );
  const ask_raca = <FormsInput key={9} title="Raça"></FormsInput>;
  const ask_castrado = <Checkbox key={10} text="Castrado"></Checkbox>;
  const ask_vermifugado = <Checkbox key={11} text="Vermifugado"></Checkbox>;
  const ask_descricao = (
    <textarea key={12} className="textarea textarea-bordered w-full"></textarea>
  );
  const ask_all_animal = [
    ask_nome_animal,
    ask_especie,
    ask_raca,
    ask_sexo,
    ask_idade,
    ask_peso,
    ask_porte,
  ];

  //Identificação das tags:
  const tag_fofo = <Checkbox key={101} text="Fofo <3"></Checkbox>;
  const tag_energetico = <Checkbox key={102} text="Energético"></Checkbox>;
  const tag_brincalhao = <Checkbox key={103} text="Brincalhão"></Checkbox>;
  const tag_agressivo = <Checkbox key={104} text="Agressivo"></Checkbox>;
  const tag_agitado = <Checkbox key={105} text="Agitado"></Checkbox>;
  const tag_esperto = <Checkbox key={106} text="Esperto"></Checkbox>;
  const tags = [
    tag_fofo,
    tag_energetico,
    tag_brincalhao,
    tag_agressivo,
    tag_agitado,
    tag_esperto,
  ];

  // Formulário de pet
  return (
    <div className="w-full h-full bg-indigo-400 p-4">
      <h1 className="font-bold text-3xl text-center">FORMULÁRIO DO PET</h1>
      <hr className="my-5" />
      <div className="p-4">
        <h1 className="text-center text-xl font-bold">
          INFORMAÇÕES DO RESPONSÁVEL
        </h1>
        {ask_all_responsavel.map((ask, index) => (
          <div className="my-3">{ask}</div>
        ))}
      </div>
      <hr className="my-5" />
      <div className="p-4">
        <h1 className="text-center text-xl font-bold">INFORMAÇÕES DO PET</h1>
        {ask_all_animal.map((ask, index) => (
          <div className="my-3">{ask}</div>
        ))}
        <div className="my-3">
          <details className="dropdown">
            <summary className="m-1 btn border-2 p-2">Tags</summary>
            <ul className="p-2 shadow menu dropdown-content z-[1] bg-white rounded-box w-52">
              {tags.map((tag, index) => (
                <div>{tag}</div>
              ))}
            </ul>
          </details>
        </div>
        <div className="flex gap-3">
          {ask_castrado}
          {ask_vermifugado}
        </div>
        <div className="my-3">
          <h1>Descrição:</h1>
          {ask_descricao}
        </div>
        <div>
          <h1>Imagem do Animal:</h1>
          <input
            type="file"
            className="file-input file-input-bordered w-full max-w-xs"
          />
        </div>
      </div>
      <div className="text-center content-center">
        <button className="text-3xl font-bold rounded-md bg-white text-center p-5">
          Enviar
        </button>
      </div>
    </div>
  );
}
