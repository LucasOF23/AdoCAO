import React, { ReactNode } from "react";
import { InfoB } from "./infoB";
export type FormsItem = {
  id: number;
  label: string;
};

export type FormsSelProps = {
  children?: ReactNode | ReactNode[];
  items: FormsItem[];
  key: number;
  title: string;
};

export function FormsSel({ children, items, key, title }: FormsSelProps) {
  const childrenArray = React.Children.toArray(children);

  return (
    <div className="inline-block min-w-min">
      <div className="flex justify-left items-center">
        <p className="text-xl font-serif px-1">{title}</p>

        {Array.isArray(childrenArray) &&
          childrenArray.map((child, index) => (
            <div key={index}>
              <InfoB>{child}</InfoB>
            </div>
          ))}
      </div>
      <select className="select select-bordered w-full max-w-xs select-sm">
        {items.map((item) => (
          <option>{item.label}</option>
        ))}
      </select>
    </div>
  );
}
