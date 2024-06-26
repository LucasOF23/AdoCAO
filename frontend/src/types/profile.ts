import { DogInfo } from "./dog";

export type ProfileLocation = {
    city: string;
    state: string;
}

export type ProfileContato = {
    email: string;
    insta: string;
    face: string;
    telefone: string;
    outro: string;
}

export type ProfileInfo = {
    id: number;
    user_type: "user" | "ONG";
    name: string;
    location: ProfileLocation;
    adress: string;
    cnpj: string;
    animals: DogInfo[];
    membersEmail: string[];
    managerEmail: string;
    Description: string;
    contato: ProfileContato;
}