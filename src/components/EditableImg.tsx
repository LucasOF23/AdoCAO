import React, { useState } from 'react';

interface EditableImgProps{
  url:string;
  onChange: (url:string) => void;
}

const EditableImg: React.FC<EditableImgProps> = ({ url,onChange }) => {
  // const [url, setUrl] = useState(url);
  
  //Evento chamado quando a imagem muda
  const handleImageChange = (event) => {
    
    console.log('I was triggered duasdasdring render')
    if (event.target.files && event.target.files[0]) { // se tem um arquivo selecionado
      // pega o arquivo, extrai a url e seta 
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        
        if (e.target?.result) {
            onChange(e.target.result as string); 
            // Se chegou até aqui, ele envia pra estrutura de trás pra lidar com a url
            // por questão de ter que atualizar com o backend
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className='relative w-full h-full md:min-w-[30%] rounded-[10%]'>
      <img
        alt={`Imagem do Perfil`}
        className="object-cover w-full h-full rounded-[10%]"
        src={url}
      />
      
      {/* Faz o fundo escurecer quando passa o mouse em cima */}
      <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-opacity duration-300 z-10 rounded-[10%]"> 
        
        {/* Detecta quando o usuário clica na imagem */}
        <input 
            type="file"
            accept="image/*"
            className="absolute top-2 right-2 bg-white p-1 rounded opacity-0 w-full h-full cursor-pointer"
            onChange={handleImageChange}
        />  
      </div>
    </div>
  );
}

export default EditableImg;
