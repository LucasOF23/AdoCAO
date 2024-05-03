import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

type LoginProps = {
  onClose?: () => void;
};

export default function Login({ onClose }: LoginProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <div className="mx-auto my-auto relative border rounded-t-2xl p-4 max-w-96 flex flex-col gap-5 bg-white">
      <h2 className="text-center text-3xl">{isLogin ? "Login" : "Cadastro"}</h2>

      {onClose && (
        <button onClick={onClose}>
          <FontAwesomeIcon
            className="mt-[0.1rem] h-[1.5rem] text-gray-400 absolute top-5 right-5"
            icon={faXmark}
          />
        </button>
      )}

      {!isLogin && (
        <div>
          <Label>Nome Completo:</Label>
          <Input type="text" placeholder="João da Silva" className="w-full" />
        </div>
      )}

      <div>
        <Label>Email</Label>
        <Input type="email" placeholder="joao@example.com" />
      </div>

      {!isLogin && (
        <div>
          <Label>Contato:</Label>
          <Input type="text" placeholder="@joaodasilva" />
        </div>
      )}

      <div>
        <Label>Senha</Label>
        <Input
          type={passwordVisible ? "text" : "password"}
          placeholder={passwordVisible ? "senha" : "*****"}
        />
        <button
          onClick={() => setPasswordVisible((prev) => !prev)}
          className="ml-1 text-xs text-purple-500"
        >
          {passwordVisible ? "Esconder senha" : "Ver senha"}
        </button>
      </div>

      {!isLogin && (
        <div>
          <Label>Confirma Senha</Label>
          <Input
            type={passwordVisible ? "text" : "password"}
            placeholder={passwordVisible ? "senha" : "*****"}
          />
          <button
            onClick={() => setPasswordVisible((prev) => !prev)}
            className="ml-1 text-xs text-purple-500"
          >
            {passwordVisible ? "Esconder senha" : "Ver senha"}
          </button>
        </div>
      )}

      <a href="/home" className="mx-auto w-full max-w-60 bg-purple-300 hover:bg-purple-400 duration-75 hover:scale-[105%] px-5 py-3 rounded-xl my-auto">
        Enviar
      </a>

      <button
        onClick={() => setIsLogin((prev) => !prev)}
        className="ml-1 text-xs text-purple-500"
      >
        {isLogin
          ? "Ainda não possui uma conta? Cadastre-se aqui!"
          : "Já possui uma conta? Entre aqui!"}
      </button>
    </div>
  );
}
