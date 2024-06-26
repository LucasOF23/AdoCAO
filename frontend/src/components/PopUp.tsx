import React, { MouseEvent, useEffect, useRef, ReactNode } from "react";
// export type FormsItem = {
//   id: number;
//   label: string;
// };

export type PopupProps = {
  children: ReactNode;
  on_close: () => void;
};

export function Popup({ children, on_close }: PopupProps) {
  // const PopupRef = useRef();
  const closePopup = () => {
    // if (PopupRef.current === e.target) {
    console.log("batata");
    on_close();
    // }
  };

  return (
    <div
      className={
        "fixed bg-black bg-opacity-30 backdrop-blur-[1px] flex items-center justify-center inset-0"
      }
      onClick={closePopup}
    >
      <div className="flex flex-col gap-0 text-white">
        <button
          onClick={closePopup}
          className="btn btn-circle btn-xs btn-ghost btn-outline
      min-w-0 min-h-0 h-6 w-6"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="bg-indigo-600 rounded-xl px-2 py-2 flex flex-col gap-5 items-center mx-4">
          {/* <h1 className="text=3x1 font-extrabold">Tamanho dos animais</h1> */}
          {/* <h1>{title}</h1>
          <p>{text}</p> */}
          {children}
        </div>
      </div>
    </div>
  );
}
