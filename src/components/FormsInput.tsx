import React, { ReactNode } from "react";
import { InfoB } from "./infoB";

export type FormsInputProps = {
  children?: ReactNode | ReactNode[];
  key: number;
  title: string;
};

export function FormsInput({ children, key, title }: FormsInputProps) {
  const childrenArray = React.Children.toArray(children);
  return (
    <div className="w-full">
      <div className="flex justify-left items-center">
        <p className="text-xl font-serif px-1">{title}</p>
        
        {Array.isArray(childrenArray) &&
          childrenArray.map((child, index) => (
            <div key={index}>
              <InfoB>{child}</InfoB>
            </div>
          ))}
      </div>
      <input
        type="text"
        placeholder="Digite aqui"
        className="input input-bordered w-full select-sm select-error"
      />
    </div>
  );
}
