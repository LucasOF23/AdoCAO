export type DogGender = "male" | "female";

export type DogOwnerKind = "user" | "ONG";

export type DogOwner = {
    kind: DogOwnerKind,
    name: string
}

export type DogLocation = {
    city: string,
    state: string
}

export type DogInfo = {
    id: number,
    name: string,
    imageUrl: string,
    owner: DogOwner,
    location: DogLocation,
    gender: DogGender,
    ageInYears: number,
    weightInKg: number,
    heightInCm: number,
    species: string,
    breed: string,
    isNeutered: boolean,
    isDewormed: boolean,
    tags: string[]
}