import { OngCardProps } from "@/components/OngCard";
import { DogInfo } from "./dog";

export type ProfileLocation = {
    city: string;
    state: string;
}

export type ProfileInfo = {
    id: number;
    user_type: "user" | "ONG";
    name: string;
    cellphone: string;
    email: string;
    imageUrl: string;
    location: ProfileLocation;
    animals: [DogInfo];
}