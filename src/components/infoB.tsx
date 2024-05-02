"use client";
import { useState, ReactNode } from "react";
import { Popup, PopupProps } from "./PopUp";

export type InfoBProps = {
  children: ReactNode;
};

export function InfoB({ children }: InfoBProps) {
  const [showPopUp, setShowPopUp] = useState(false);

  return (
    <div className="w-4 h-4 flex justify-center align-items">
      <button
        className="btn btn-circle btn-xs btn-ghost btn-outline
      min-w-0 min-h-0 h-5 w-5"
        onClick={() => {
          setShowPopUp(true);
        }}
      >
        <p className="font-mono text-[15px]">i</p>
      </button>
      {showPopUp && (
        <Popup on_close={() => setShowPopUp(false)}>{children}</Popup>
      )}
    </div>
  );
}
