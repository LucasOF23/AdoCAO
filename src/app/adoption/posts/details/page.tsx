import DetailedPost from "@/components/DetailedPost";
import { DogInfo } from "@/types/dog";

export default function AdoptionPosts() {
  const bolinhaInfo: DogInfo = {
    id: 1,
    name: "Bolinha",
    imageUrl:
      "https://images.dog.ceo/breeds/poodle-standard/n02113799_1316.jpg",
    owner: { kind: "user", name: "José Silva" },
    location: { city: "São Paulo", state: "SP" },
    gender: "male",
    ageInYears: 2,
    weightInKg: 10,
    heightInCm: 30,
    species: "Cachorro",
    breed: "Vira-lata",
    isNeutered: true,
    isDewormed: true,
    tags: [
      "brincalhão",
      "amigável",
      "energético",
      "linda",
      "bonita",
      "maravilérrima",
    ],
  };

  return (
    <>
      <div>AdoptionPosts</div>
      <div className="flex justify-center">
        <DetailedPost key={bolinhaInfo.id} info={bolinhaInfo} />
      </div>
    </>
  );
}
