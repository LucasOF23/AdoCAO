import Image from "next/image";
import React from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { ProfileInfo } from "@/types/profile";

import { useState, useEffect } from "react";

import cityApi from "@/api/city.api";
import ongApi from "@/api/ong.api";
import { siglasEstados } from "@/lib/utils";
import { getToken } from "@/api/general.api"; 

export type DetailedPostProps = {
  info: ProfileInfo;
  onClose?: () => void;
};

export default function EditONG({ info, onClose }: DetailedPostProps) {

  const [emailNotExist, setEmailNotExist] = useState(false);

  const [differentEmail, setDifferentEmail] = useState(false);

  const [cities, setCities] = useState([]);
  const [estado, setEstado] = useState('');

  function getCities() {                
    if(estado)
      cityApi.getByState(estado).then(res => setCities(res));
  }
  
  useEffect(getCities, [estado]);

  function editOng(event) {
    event.preventDefault();

    // TODO: Terminar depois, talvez tenha um melhor jeito?
  }

  async function assignWorker(event) {
    event.preventDefault();

    const email = event.target.email.value;
    const ongId = info.id;

    // const isManager = event.target.isManager.checked;
    const isManager = false;
    if(isManager && (!info.isManager && !getToken().isSuperAdmin)) {
      console.log('Você não pode adicionar outro manager');
      return;
    }

    try {
      await ongApi.assignWorker(ongId, email, isManager);
      console.log('Adicionado com sucesso!');
    } catch(err) {
      console.log(err);
      const status = err.response.status;
      switch(status) {
      case 400: console.log('Email não encontrado');
        break
      default:
        console.log('Erro inesperado.');
      }
    }
  }

  async function unassignWorker(event) {
    event.preventDefault();

    const email = event.target.email.value;
    const ongId = info.id;

    const confirmEmail = event.target.confirmEmail.value;
    if(email !== confirmEmail) {
      console.log('Emails diferentes!!!');
      return;
    }

    try {
      await ongApi.unassignWorker(ongId, email);
      console.log('Removido com sucesso!');
    } catch(err) {      
      switch(err.response.status) {
      case 400:
        console.log('Email não encontrado.');
        break;
      case 403:
        console.log('Você não tem permissão (o outro usuário é um gerente)');
        break;
      default:
        console.log('Erro inesperado.');
      }
    }
  }

  return (
    <div className="forms-shape2">
      <div>
        <div className="px-5">
          <div>
            {onClose && (
              <button type="button" onClick={onClose}>
                <FontAwesomeIcon
                  className="mt-[0.1rem] h-[1.5rem] text-gray-400"
                  icon={faXmark}
                />
              </button>
            )}
          </div>

          <Label className="text-2xl w-full text-center">Formulário de Adição de Colaborador</Label>
          <form onSubmit={assignWorker}>
            <div className="flex flex-col">
              <div>
                <Label>Email</Label>
                <Input name="email" type="contato" placeholder="email"/>
              </div>
            </div>

            {emailNotExist && (
              <Label className="text-red-400 text-xs">Email não existe!!!</Label>
            )}

            <div className="text-center p-4">
              <button type="submit" className="mx-auto w-full max-w-60 bg-purple-300 hover:bg-purple-400 duration-75 hover:scale-[105%] px-5 py-3 rounded-xl my-auto">
                Enviar
              </button>
            </div>
          </form>
        </div>

        <hr className="py-10" />

        <div className="px-5">

          <Label className="text-2xl text-center mb-10">Formulário de Remoção de Colaborador</Label>
          <form onSubmit={unassignWorker}>
            <div className="flex flex-col">
              <div>
                <Label>Email</Label>
                <Input name="email" type="contato" placeholder="email"/>
              </div>

              <div>
                <Label>Confirmação do Email</Label>
                <Input name="confirmEmail" type="contato" placeholder="email"/>
              </div>
            </div>
            
            {differentEmail && (
              <Label className="text-red-400 text-xs">Emails diferentes</Label>
            )}

            <div className="text-center p-4">
              <button type="submit" className="mx-auto w-full max-w-60 bg-purple-300 hover:bg-purple-400 duration-75 hover:scale-[105%] px-5 py-3 rounded-xl my-auto">
                Enviar
              </button>
            </div>
          </form>            
        </div>

        <hr className="py-10" />

      </div>
      <div className="px-5">

        <Label className="text-2xl text-center pb-10">Formulário de Edição da ONG</Label>
        <form onSubmit={editOng}>
          <div>
            <Label>Nome da ONG - {info.name}</Label>
            <Input name="name" type="nome" placeholder={info.name}/>
          </div>
            
          <div>
            <Label>Estado - {info.location.state}</Label>
            <select onChange={event => setEstado(event.target.value)} className="border rounded-2xl p-2 w-full flex flex-col grid-rows-2 gap-5 bg-white text-sm">
              <option></option>
              {siglasEstados.map(sigla => (
                <option key={sigla} value={sigla}>{sigla}</option>
              ))}
            </select>
          </div>

          <div>
            <Label>Cidade - {info.location.name}</Label>
            <select name="cityId" className="border rounded-2xl p-2 w-full flex flex-col grid-rows-2 gap-5 bg-white text-sm">
              <option></option>
              {cities.map((city) => (
                <option key={city.id} value={city.id}>{city.name} ({city.state})</option>
              ))}
            </select>
          </div>

          <div>
            <Label>Endereço - {info.address}</Label>
            <Input name="address" type="email" placeholder="Rua ..." />
          </div>

          <div>
            <Label>CNPJ - {info.cnpj}</Label>
            <Input name="cnpj" type="cnpj" placeholder="XX.XXX.XXX/XXXX-XX" />
          </div>

          <div>
            <Label>Email de Contato - {info.contato.email}</Label>
            <Input name="contact_email" type="contato" placeholder="email" />
          </div>

          <div>
            <Label>Telefone - {info.contato.telefone}</Label>
            <Input name="contact_phoneNumber" type="contato" placeholder="(XX) XXXXX-XXXX" />
          </div>

          <div>
            <Label>Facebook - {info.contato.face}</Label>
            <Input name="contac_facebookProfile" type="contato" placeholder="facebook" />
          </div>

          <div>
            <Label>Instagram - {info.contato.insta}</Label>
            <Input name="contact_instagramProfile" type="contato" placeholder="instagram" />
          </div>

          <div>
            <Label>Outro Contato - {info.contato.outro}</Label>
            <Input name="contact_other" type="contato" placeholder="" />
          </div>

          <div className="text-center p-4">
            <button type="submit" className="mx-auto w-full max-w-60 bg-purple-300 hover:bg-purple-400 duration-75 hover:scale-[105%] px-5 py-3 rounded-xl my-auto">
              Enviar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
