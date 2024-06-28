import authApi from "@/api/auth.api";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useRef, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

type LoginProps = {
  onClose?: () => void;
};

export default function Login({ onClose }: LoginProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [differentPassword, setDifferentPassword] = useState(false);
  const [emailExist, setEmailExist] = useState(false);
  // const [error, setError] = useState<string | null>(null);

  async function sendLogin(event) {
    const { email, password } = event.target;

    console.log(`Logando com email ${email.value} e senha ${password.value}`);
    try {
      await authApi.login(email.value, password.value);
      window.location.reload();
    } catch (err) {
      const { data } = err.response;
      // setError(data);
      toast.error(data);
    }
  }

  async function sendRegister(event) {
    const { name, email, password, confirmPassword } = event.target;

    if (password.value !== confirmPassword.value) {
      setDifferentPassword(true);
      return;
    }

    setDifferentPassword(false);

    console.log(
      `Criando usuário ${name.value} com email ${email.value} e senha ${password.value}`
    );
    try {
      await authApi.register(name.value, email.value, password.value);
      window.location.reload();
    } catch (err) {
      const { data } = err.response;
      // setError(data);
      toast.error(data);
    }
  }

  async function send(event) {
    event.preventDefault();
    // setError(null);
    if (isLogin) await sendLogin(event);
    else await sendRegister(event);
  }

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
      className="mx-auto my-auto relative border rounded-t-2xl p-4 max-w-96 flex flex-col gap-5 bg-white"
      ref={ref}
    >
      <form onSubmit={send}>
        <h2 className="text-center text-3xl">
          {isLogin ? "Login" : "Cadastro"}
        </h2>

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
            <Input
              type="text"
              name="name"
              placeholder="João da Silva"
              className="w-full"
              required
            />
          </div>
        )}

        <div>
          <Label>Email</Label>
          <Input
            type="email"
            placeholder="joao@example.com"
            name="email"
            required
          />
        </div>

        <div>
          <Label>Senha</Label>
          <Input
            name="password"
            type={passwordVisible ? "text" : "password"}
            placeholder={passwordVisible ? "senha" : "*****"}
            required
          />
          <div className="mx-1 mt-2 flex flex-row justify-between">
            <button
              type="button"
              onClick={() => setPasswordVisible((prev) => !prev)}
              className="text-xs text-purple-500"
            >
              {passwordVisible ? "Esconder senha" : "Ver senha"}
            </button>
          </div>
        </div>

        {!isLogin && (
          <div>
            <Label>Confirmar Senha</Label>
            <Input
              name="confirmPassword"
              type={passwordVisible ? "text" : "password"}
              placeholder={passwordVisible ? "senha" : "*****"}
              required
            />
            <button
              type="button"
              onClick={() => setPasswordVisible((prev) => !prev)}
              className="ml-1 text-xs text-purple-500"
            >
              {passwordVisible ? "Esconder senha" : "Ver senha"}
            </button>
          </div>
        )}

        {!isLogin && differentPassword && (
          <div className="text-center text-red-400 text-xs">
            As senhas não coincidem.
          </div>
        )}

        {/* {error && (
          <div className="text-center text-red-400 text-xs">{error}</div>
        )} */}

        <div className="flex mt-3 mb-3">
          <button
            type="submit"
            className="mx-auto w-full max-w-60 bg-purple-300 hover:bg-purple-400 duration-75
          hover:scale-[105%] px-5 py-3 rounded-xl"
          >
            {isLogin ? "Entrar" : "Cadastrar"}
          </button>
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => {
              setIsLogin((prev) => !prev);
              // setError(null);
            }}
            className="ml-1 text-xs align-center text-purple-500"
          >
            {isLogin
              ? "Ainda não possui uma conta? Cadastre-se aqui!"
              : "Já possui uma conta? Entre aqui!"}
          </button>
        </div>
      </form>
    </div>
  );
}
