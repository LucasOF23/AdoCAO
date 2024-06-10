import { FormsSel, FormsSelProps, FormsItem } from "@/components/FormsSel";
import { FormsInput, FormsInputProps } from "@/components/FormsInput";
import Checkbox from "@/components/Checkbox";

export default function ModalCreateONG() {
  //Identificação do responsável
  const ask_nome = (
    <FormsInput key={0} title="Nome da ONG"></FormsInput>
  );
  const ask_contato = <FormsInput key={2} title="Contato"></FormsInput>;
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
  const ask_cnpj = <FormsInput key={5} title="CNPJ"></FormsInput>;
  const ask_endereco = <FormsInput key={6} title="Endereço"></FormsInput>;
  
    //informações do primeiro gerente
  const ask_idgerente = (<FormsInput key={7} title="ID do gerente">
    <p>
          Para preencher este campo, você deve entrar em contato com um usuário
          da plataforma e ele deve enviar seu ID de usuário. Ele pode fazer isso
        ao acessar a página de perfil dele e clicar em cima do seu ID para copiá-lo. 
    </p>
  </FormsInput>);
    
  const ask_descricao = (
    <textarea key={8} className="textarea textarea-bordered w-full"></textarea>
  );
    

  
  // Formulário de ong
  return (
    <div className="w-full h-full bg-indigo-400 p-4">
      <h1 className="font-bold text-3xl text-center">FORMULÁRIO PARA CRIAÇÃO DE ONG</h1>
      <hr className="my-5" />
      <div className="p-4">
        <h1 className="text-center text-xl font-bold">
          INFORMAÇÕES DE ONG
        </h1>
        <div className='flex flex-col items-start justify-start'>
            {ask_nome}
            {ask_df}
            {ask_cidade}
            {ask_endereco}
            {ask_cnpj}
            {ask_contato}
        </div>
      </div>
      <hr className="my-5" />
      <div className="p-4">
        <h1 className="text-center text-xl font-bold">RESPONSÁVEL</h1>
              {ask_idgerente}
              
        <div className="my-3">
          <h1>Descrição:</h1>
          {ask_descricao}
        </div>
        <div>
          <h1>Imagem da ONG:</h1>
          <input
            type="file"
            className="file-input file-input-bordered w-full max-w-xs"
          />
        </div>
      </div>
      <div className="text-center content-center">
        <button className="text-3xl font-bold rounded-md bg-white text-center p-5">
          Criar ONG
        </button>
      </div>
    </div>
  );
}
