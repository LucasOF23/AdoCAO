"use client";
import { useState } from "react";
import { PopUp, PopUpProps } from "./PopUp";
import { Modal, ModalProps } from "./Modal";

export type InfoBProps = {
  popup: string; //PopUpProps;
};

export function InfoB({ popup }: InfoBProps) {
  const [showPopUp, setShowPopUp] = useState(false);

  return (
    <div className="w-3 h-3">
      <button
        className="btn btn-circle btn-xs btn-ghost btn-outline
      min-w-0 min-h-0 h-3 w-3"
        onClick={() => {
          console.log("CLiqUEI");
          setShowPopUp(true);
        }}
      >
        <p className="font-mono text-[10px]">i</p>

        {showPopUp && <Modal on_close={() => setShowPopUp(false)} />}
      </button>
    </div>
  );
}
