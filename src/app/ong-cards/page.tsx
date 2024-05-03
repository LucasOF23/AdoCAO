import OngCard from "@/components/OngCard";
import { OngInfo } from "@/types/ong";

export default function AdoptionPosts() {
  const ongInfos: OngInfo[] = [
    {
      id: 1,
      name: "S.O.S. Doguinhos",
      contact: "(12) 3 4567-8910",
      location: { city: "São Carlos", state: "SP" },
      imageUrl:
        "https://images.dog.ceo/breeds/poodle-standard/n02113799_1316.jpg",
    },
    {
      id: 2,
      name: "Dogões S.A.",
      contact: "(12) 3 4567-8910",
      location: { city: "São Carlos", state: "SP" },
      imageUrl: "https://images.dog.ceo/breeds/shiba/shiba-17.jpg",
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
