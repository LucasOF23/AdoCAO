import React, { MouseEvent, useEffect, useRef } from "react";
// export type FormsItem = {
//   id: number;
//   label: string;
// };

export type ModalProps = {
  on_close: () => void;
};

export function Modal({ on_close }: ModalProps) {
  const modalRef = useRef();
  const closeModal = () => {
    // if (modalRef.current === e.target) {
    console.log("batata");
    on_close();
    // }
  };

  return (
    <div
      className={
        "fixed bg-black bg-opacity-10 backdrop-blur-[1px] flex items-center justify-center inset-0"
      }
    >
      <div className="flex flex-col gap-0 text-white">
        <button
          //   onClick={closeModal}
          className="btn btn-circle btn-xs btn-ghost btn-outline
      min-w-0 min-h-0 h-3 w-3"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 16 24 24"
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
          <h1 className="text=3x1 font-extrabold">Tamanho dos animais</h1>
        </div>
      </div>
    </div>
  );
}
