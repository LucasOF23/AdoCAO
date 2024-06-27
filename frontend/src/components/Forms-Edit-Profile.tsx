import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ProfileInfo } from "@/types/profile";

interface EditFormsProps {
  info_perfil: ProfileInfo;
}

export default function Forms({ info_perfil }: EditFormsProps) {
  return (
    <div className="border p-4 w-96 flex flex-col gap-5 bg-white">
      <div>
        <div>
          <Label>Nome</Label>
          <Input type="nome" value={info_perfil.name} />
        </div>

        <div>
          <Label>Cidade/Estado</Label>
          <select className="border rounded-2xl p-2 w-full flex flex-col grid-rows-2 gap-5 bg-white text-sm">
            <option></option>
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
          <Input type="endereco" value={info_perfil.adress} />
        </div>

        <div>
          <Label>CNPJ</Label>
          <Input
            type="cnpj"
            placeholder="XX.XXX.XXX/XXXX-XX"
            value={info_perfil.cnpj}
          />
        </div>

        <div>
          <Label>Email</Label>
          <Input type="email" value={info_perfil.contato.email} />
        </div>

        <div>
          <Label>Telefone</Label>
          <Input type="phone" value={info_perfil.contato.telefone} />
        </div>

        <div>
          <Label>Instagram</Label>
          <Input type="instagram" value={info_perfil.contato.insta} />
        </div>

        <div>
          <Label>Facebook</Label>
          <Input type="facebook" value={info_perfil.contato.face} />
        </div>

        <div>
          <Label>Outra forma de contato</Label>
          <Input type="other_contact" value={info_perfil.contato.outro} />
        </div>
      </div>{" "}
      {/* Adicionada a tag de fechamento aqui */}
      <div className="text-center p-4">
        <a
          href="/home"
          className="mx-auto w-full max-w-60 bg-purple-300 hover:bg-purple-400 duration-75 hover:scale-[105%] px-5 py-3 rounded-xl my-auto"
        >
          Atualizar dados
        </a>
      </div>
    </div>
  );
}
