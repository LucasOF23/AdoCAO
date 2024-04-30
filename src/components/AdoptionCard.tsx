import Image from "next/image";
import { DogInfo, DogOwnerKind } from "@/types/dog";
import React from "react";

export type AdoptionCardProps = {
  info: DogInfo;
};

function getOwnerPrefix(kind: DogOwnerKind) {
  switch (kind) {
    case "ONG":
      return "da ONG";
    case "user":
      return "do usuário";
  }
}

export default function AdoptionCard({ info }: AdoptionCardProps) {
  const imageAlt = `Imagem do cachorro "${info.name}"`;
  const ownerPrefix = getOwnerPrefix(info.owner.kind);

  return (
    <a
      href="#"
      className="border rounded-t-2xl overflow-hidden w-full max-w-96 hover:shadow-md hover:scale-[101%] transition delay-50"
    >
      <div className="w-full h-72">
        <Image
          alt={imageAlt}
          className="object-cover w-full h-full"
          src={info.imageUrl}
          width={2000}
          height={2000}
        />
      </div>

      <div className="px-3 pb-3 pt-1">
        <h3 className="text-lg font-bold">{info.name}</h3>
        <p>
          {ownerPrefix} <span className="font-bold">{info.owner.name}</span>
        </p>
        <p>
          em{" "}
          <span className="font-bold">
            {info.location.city} ({info.location.state})
          </span>
        </p>
      </div>
    </a>
  );
}
