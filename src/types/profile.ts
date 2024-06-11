import { OngCardProps } from "@/components/OngCard";
import { DogInfo } from "./dog";

export type ProfileLocation = {
    city: string;
    state: string;
    type_loc: 'casa' | 'apartamento' | 'chácara' | 'sítio' | 'outro';
    address: string;
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
    description: string;
}

export type ProfileInfo_edit = {
    name: string;
    cellphone: string;
    email: string;
    imageUrl: string;
    location: ProfileLocation;
}