"use client";

import Image from "next/image";

import { useState } from "react";

import { CopyText } from "@/components/CopyText";
import Navbar from "@/components/Navbar2";
import HrefButton from "@/components/HrefButton";
import { ProfileInfo } from "@/types/profile";
import { unescape } from "querystring";
import Lowerbar from "@/components/Lowerbar";
import EditableLabel from "@/components/EditableLabel";
import EditableImg from "@/components/EditableImg";

export default function EditPerfil() {
    const profileInfo: ProfileInfo = 
        {
          id: 14563,
          user_type: "user",
          name: "Zeca",
          location: { city: "São Carlos", state: "SP" , type_loc: 'casa'},
          imageUrl: "https://images.dog.ceo/breeds/lhasa/n02098413_7389.jpg",
          cellphone: "1998521964763",
          email: "zeca@estadual.com.br",
          animals: [{
            id: 9,
            name: "J. Robert Oppenheimer",
            imageUrl: "https://images.dog.ceo/breeds/boxer/n02108089_2791.jpg",
            owner: {
              kind: "user",
              name: "Zeca",
            },
            location: {
              city: "São Carlos",
              state: "SP",
            },
            gender: "male",
            ageInYears: 1,
            weightInKg: 4,
            heightInCm: 20,
            species: "Cachorro",
            breed: "Boxer",
            isNeutered: true,
            isDewormed: true,
            tags: ["Energético", "Amável", "Explosivo"],
          }]
        }
    ;
    
  
    const [nameText, setNameText] = useState(profileInfo.name);
    const [cellphoneText, setCellphoneText] = useState(profileInfo.cellphone);
    const [stateText, setStateText] = useState(profileInfo.location.state);
    const [cityText, setCityText] = useState(profileInfo.location.city);
    const [type_locText, setTypelocText] = useState(profileInfo.location.type_loc);
    const [urlImg, setUrlImg] = useState(profileInfo.imageUrl);
  
    const pedir_confirmacao_senha = () =>{
      //Fazer a confirmação de senha
    }
  
    const handle_nome = (newNome:string) => {
      // pedir_confirmacao_senha();
      setNameText(newNome);
    };
    
    const handle_cellphone = (newCellPhone:string) => {
      // pedir_confirmacao_senha();
      setCellphoneText(newCellPhone);
    };
    const handle_state = (newState:string) => {
      // pedir_confirmacao_senha();
      setStateText(newState);
    };
    const handle_city = (newCity:string) => {
      // pedir_confirmacao_senha();
      setCityText(newCity);
    };
    const handle_typeloc = (newTypeloc:string) => {
      // pedir_confirmacao_senha();
      setTypelocText(newTypeloc);
    };
    const handle_img = (newImg:string) => {
      // pedir_confirmacao_senha();
      console.log('I was triggered during render AAAAAAAAAA: ',newImg)
      setUrlImg(newImg);
    };
    
    
    return (
    <>
      <Navbar />
      <div className="pl-[5vw] pt-[2vw] screen-max-width flex md:flex-row flex-col">
          <div className='min-w-full min-h-full md:min-w-[30%] h-[400px] w-[400px]'>
            <EditableImg url={urlImg} onChange={handle_img}/>  
          </div>
          
        <div className="w-full">
            <div>
              <h1 className="text-5xl font-bold text-center pt-5">Meu Perfil</h1>
              {/* <CopyText text={`ID pessoal: ${profileInfo.id.toString()}`} copy={profileInfo.id.toString()} /> */}
            </div>
            
            <hr />
            <div className="pt-4 pl-[5%] flex flex-col md:flex-row justify-between items-stretch">
                <div className='basis-1/2'>
                    <h2 className="text-2xl font-bold">Dados Pessoais:</h2>
                    <div className='pl-[5%]'>
                        <ul>
                            <li><div className="flex flex-row">Nome:  <EditableLabel text={nameText} onChange={handle_nome} minchar={2} maxchar={60} /></div></li>
                            <li>Email: {profileInfo.email}</li>
                            <li><div className="flex flex-row ">Celular:  <EditableLabel text={cellphoneText} onChange={handle_cellphone} minchar={10} maxchar={11} /></div></li>
                            <li><div className="flex flex-row ">Estado:  <EditableLabel text={stateText} onChange={handle_state} minchar={2} maxchar={2} /></div></li>
                            <li><div className="flex flex-row ">Cidade:  <EditableLabel text={cityText} onChange={handle_city} minchar={2} maxchar={60} /></div></li>
                            <li><div className="flex flex-row ">Tipo de moradia:  <EditableLabel text={type_locText} onChange={handle_typeloc} minchar={2} maxchar={20} /></div></li>
                        </ul>
                    </div>
                </div>
                <div className='basis-1/2'>
                    <h2 className="text-2xl font-bold">Animais para Doação:</h2>
                    <div className="pl-5">
                        {profileInfo.animals.map((info) => (
                        <h3>Nome: {info.name}</h3>
                        ))}
                    </div>
                </div>
            </div>   
        </div>
      </div>
      <hr />
      <div className="p-4 mx-auto screen-max-width grid justify-items-center grid-autofit gap-4">
        {/* <div className="py-7 px-10 bg-purple-600 rounded-md"><HrefButton href='/edit_perfil'>Editar Perfil</HrefButton></div>
        <div className="py-7 px-10 bg-purple-600 rounded-md"><HrefButton href='/trocar_senha'>Trocar Senha</HrefButton></div>
        <div className="py-7 px-10 bg-rose-600 rounded-md"><HrefButton href='/confirmar_apagar'>Apagar Perfil</HrefButton></div> */}
      </div>
      <Lowerbar />
    </>
  );
}