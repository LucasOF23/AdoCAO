import { FormsSel, FormsSelProps, FormsItem } from "@/components/FormsSel";
import { FormsInput, FormsInputProps } from "@/components/FormsInput";
import Checkbox from "@/components/Checkbox";

export default function PageForms() {
  const ask_nome = <FormsInput key={0} title="Nome"></FormsInput>;
  const ask_responsavel = (
    <FormsSel
      key={1}
      title="Responsável"
      items={[
        { id: 0, label: "tutor" },
        { id: 1, label: "dono" },
        { id: 2, label: "herdeiro" },
      ]}
    ></FormsSel>
  );
  const ask_df = (
    <FormsSel
      key={2}
      title="DF"
      items={[
        { id: 0, label: "SP" },
        { id: 1, label: "SC" },
        { id: 2, label: "MG" },
      ]}
    ></FormsSel>
  );
  const ask_cidade = <FormsInput key={3} title="Cidade"></FormsInput>;
  const ask_sexo = (
    <FormsSel
      key={4}
      title="Sexo"
      items={[
        { id: 0, label: "M" },
        { id: 1, label: "F" },
      ]}
    ></FormsSel>
  );
  const ask_nasc = (
    <FormsInput key={5} title="Idade">
      <p>
        Informe a estimativa de anos do seu animal. Coloque 0 caso ele somente
        meses de vida
      </p>
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
        { id: 3, label: "Grandão" },
      ]}
    >
      <p>Dê uma zoiada na tabela de relação de doguinhos e cachorros</p>
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
  const ask_tags = <FormsInput key={12} title="Tags"></FormsInput>;
  const ask_detalhes = <FormsInput key={13} title="Mais detalhes"></FormsInput>;

  return (
    <div className="flex border-solid border-2 border-indigo-600 pl-5 gap-1">
      <div className="flex-auto flex flex-col flex-nowrap">
        {/*Diferença entre topo e baixo */}
        <div className="flex-auto flex flex-row flex-nowrap">
          {/* Cima - divide entre rows e imagem*/}

          <div className="grow flex flex-col flex-wrap pt-3">
            {/* Itens  */}
            <div className="flex flex-row flex-wrap">
              {ask_especie}
              {ask_raca}
            </div>
            <div className="flex flex-row flex-wrap">{ask_nome}</div>

            <div className="flex flex-row flex-wrap">
              {ask_sexo}
              {ask_nasc}
              {ask_responsavel}
            </div>
            <div className="flex flex-row flex-wrap">
              {ask_df}
              {ask_cidade}
            </div>
          </div>
          <div className="flex-none bg-indigo-600 w-[200px] h-[300px]">
            {/* Div de imagem */}Imagem
          </div>
        </div>
        <div className="flex-auto flex flex-col flex-nowrap">
          {/* Baixo - divide em rows*/}
          <div className="flex flex-row">
            {ask_peso}
            {ask_porte}
          </div>
          <div className="flex flex-row">
            {ask_castrado}
            {ask_vermifugado}
          </div>
          <div className="flex flex-row">{ask_tags}</div>
          <div className="flex flex-row">{ask_detalhes}</div>
        </div>
      </div>
      <></>
    </div>
  );
}
