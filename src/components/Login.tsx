"use client";

import React, { useState } from "react"
import Image from "next/image";

export default function Login (props) {
  let [authMode, setAuthMode] = useState("signin")

  const changeAuthMode = () => {
    setAuthMode(authMode === "signin" ? "signup" : "signin")
  }

  const imageAlt = "Logo"
  const imageSrc = "/Logo.webp"

  if (authMode === "signin") {
    return (
      <div className="w-full h-full bg-[#C480D9] rounded-md content-center">
        <form className="Auth-form">
          <div className="Auth-form-content">
            <h3 className="bg-white">
              <Image
                alt={imageAlt}
                className="object-cover w-full h-full"
                src={imageSrc}
                width={2000}
                height={250}
              />
            </h3>
            <div className="form-group mt-8 ml-5">
              <label className="user text-lg font-bold text-white mt-10">Usuário:</label>
              <input
                type="user"
                className="form-control mt-3 w-11/12 rounded-sm"
              />
            </div>
            <div className="form-group mt-5 ml-5">
              <label className="password text-lg font-bold text-white">Senha:</label>
              <input
                type="password"
                className="form-control mt-3 w-11/12 rounded-sm"
              />
            </div>
            <div className="d-grid gap-2 mt-10 text-center">
              <button type="submit" className="btn btn-primary">
                Enviar
              </button>
            </div>
            <div className="text-center text-sm font-bold text-white mt-10">
              Não tem conta ainda?{" "}
              <span className="link-primary text-white" onClick={changeAuthMode}>
                Se cadastre aqui
              </span>
            </div>
            <p className="text-center text-sm font-bold text-white mt-2 mb-7">
              Esqueceu a <a href="#">senha?</a>
            </p>
          </div>
        </form>
      </div>
    )
  }

  return (
    <div className="w-full h-full bg-[#C480D9] rounded-md content-center">
      <form className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="bg-white">
            <Image
              alt={imageAlt}
              className="object-cover w-full h-full"
              src={imageSrc}
              width={2000}
              height={250}
            />
          </h3>
          <div className="form-group mt-8 ml-5">
            <label className="text-lg font-bold text-white mt-10">Nome Completo:</label>
            <input
              type="name"
              className="form-control mt-3 w-11/12 rounded-sm"
            />
          </div>
          <div className="form-group mt-5 ml-5">
            <label className="text-lg font-bold text-white mt-10">Telefone (opcional):</label>
            <input
              type="cellphone"
              className="form-control mt-3 w-11/12 rounded-sm"
            />
          </div>
          <div className="form-group mt-5 ml-5">
            <label className="text-lg font-bold text-white mt-10">Email:</label>
            <input
              type="email"
              className="form-control mt-3 w-11/12 rounded-sm"
            />
          </div>
          <div className="form-group mt-5 ml-5">
            <label className="text-lg font-bold text-white mt-10">Senha:</label>
            <input
              type="password"
              className="form-control mt-3 w-11/12 rounded-sm"
            />
            <input
              type="password"
              className="form-control mt-5 w-11/12 rounded-sm"
            />
          </div>
          <div className="d-grid gap-2 mt-10 text-center">
            <button type="submit" className="btn btn-primary">
              Enviar
            </button>
          </div>
          <div className="text-center text-sm font-bold text-white mt-10 mb-7">
            Já tem conta?{" "}
            <span className="link-primary text-white" onClick={changeAuthMode}>
              Faça login aqui
            </span>
          </div>
        </div>
      </form>
    </div>
  )
}