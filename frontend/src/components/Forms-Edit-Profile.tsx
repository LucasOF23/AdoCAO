import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ProfileInfo } from "@/types/profile";
import { siglasEstados } from "@/lib/utils";

import { useState, useEffect } from "react";

import userApi from "@/api/user.api";

export default function Forms() {
  const [info_perfil, setInfoPerfil] = useState({contato: {}, location: {}});

  function setField(event, name) {
    info_perfil[name] = event.target.value;
    setInfoPerfil(info_perfil);
  }

  function setNestField(event, attr1, attr2) {
    info_perfil[attr1][attr2] = event.target.value;
    setInfoPerfil(info_perfil);
  }

  async function updateContact(event) {
    const keys = ['email', 'phoneNumber', 'instagramProfile', 'facebookProfile', 'other'];
    let data = {};
    for(const key of keys) {
      const value = event.target[`contact_${key}`].value;
      if(value) data[key] = value;
    }

    try {
      await userApi.updateContactInfo(data);
    } catch(err) {
      switch(err.response.status) {
      default:
        console.log('Erro desconhecido.');
      }
    }
  }
  
  async function updateUser(event) {
    event.preventDefault();
    const keys = ['name', 'email'];
    
    let data = {};
    for(const key of keys) {
      const value = event.target[key].value;
      if(value) data[key] = value;
    }

    try {
      await userApi.update(data);
      await updateContact(event);

      console.log('Dados alterados com sucesso!');
    } catch(err) {
      console.log(err);
      
      switch(err.response.status) {
      default:
        console.log('Erro desconhecido.');
      }
    }
  }

  useEffect(() => {
    userApi.getCurrent().then(res => setInfoPerfil(res));
  }, []);
  
  return (
    <div className="border p-4 w-96 flex flex-col gap-5 bg-white">
      <form onSubmit={updateUser}>
        <div>
          <div>
            <Label>Nome</Label>
            <Input name="name" type="nome" defaultValue={info_perfil.name} />
          </div>

          <div>
            <Label>Email</Label>
            <Input name="email" type="email" defaultValue={info_perfil.email} />
          </div>

          <div>
            <Label>Telefone</Label>
            <Input name="contact_phoneNumber" type="phone" defaultValue={info_perfil.contato.telefone} />
          </div>

          <div>
            <Label>Instagram</Label>
            <Input name="contact_instagramProfile" type="instagram" defaultValue={info_perfil.contato.insta} />
          </div>

          <div>
            <Label>Facebook</Label>
            <Input name="contact_facebookProfile" type="facebook" defaultValue={info_perfil.contato.face} />
          </div>

          <div>
            <Label>Email de Contato</Label>
            <Input name="contact_email" type="email" defaultValue={info_perfil.contato.email} />
          </div>
          
          <div>
            <Label>Outra forma de contato</Label>
            <Input name="contact_other" type="other_contact" defaultValue={info_perfil.contato.outro} />
          </div>
        </div>{" "}
        {/* Adicionada a tag de fechamento aqui */}
        <div className="text-center p-4">
          <button
            type="submit"
            className="mx-auto w-full max-w-60 bg-purple-300 hover:bg-purple-400 duration-75 hover:scale-[105%] px-5 py-3 rounded-xl my-auto"
          >
            Atualizar dados
          </button>
        </div>
      </form>
    </div>
  );
}
