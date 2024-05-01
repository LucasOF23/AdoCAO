import OngCard from "@/components/OngCard";
import { OngInfo } from "@/types/ong";

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
      <div>OngPosts</div>
      <div className="p-4 grid justify-items-center grid-autofit gap-4">
        {ongInfos.map((info) => (
          <OngCard key={info.id} info={info} />
        ))}
      </div>
    </>
  );
}
