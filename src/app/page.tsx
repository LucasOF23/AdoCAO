"use client";

import React, { useState } from "react"
import Login from "@/components/Login";

export default function (props) {

  return (
    <>
      <button className="btn" onClick={()=>document.getElementById('my_modal').showModal()}>Login</button>
      <dialog id="my_modal" className="modal">
        <div className="modal-box p-0 max-w-xs">
          <Login/>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  )

}