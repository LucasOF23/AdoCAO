"use client";
import React, { useState } from "react";
export type CheckboxProps = {
  key: number;
  text: string;
};

export default function Checkbox({ key, text }: CheckboxProps) {
  // Definindo o estado inicial do checkbox como desmarcado (unchecked)
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    // Altera o estado do checkbox quando clicado
    setIsChecked(!isChecked);
  };

  return (
    <>
      <div className="form-control">
        <label className="label cursor-pointer">
          <span className="label-text">{text}</span>
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
            className="checkbox w-3 h-3"
          />
        </label>
      </div>
    </>
  );
}
