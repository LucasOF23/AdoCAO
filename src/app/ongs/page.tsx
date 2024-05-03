"use client";

import OngCard from "@/components/OngCard";
import { OngInfo } from "@/types/ong";

import Navbar2 from "@/components/Navbar2";

export default function AdoptionPosts() {
    const ongInfos: [OngInfo] = [
      {
        id: 1,
        name: "S.O.S. Doguinhos",
        location: { city: "São Carlos", state: "São Paulo" },
        imageUrl: "",
      },
      {
        id: 2,
        name: "S.O.S. Doguinhos",
        location: { city: "São Carlos", state: "São Paulo" },
        imageUrl: "",
      },
    ];

  return (
    <>
      <Navbar2 />
      <div className="p-4 mx-auto screen-max-width grid justify-items-center grid-autofit gap-4">
        {ongInfos.map((info) => (
          <OngCard key={info.id} info={info} />
        ))}
      </div>
    </>
  );
}