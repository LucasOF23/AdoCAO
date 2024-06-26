export type DogGender = "male" | "female";

export type DogOwnerKind = "user" | "ONG";

export type DogOwner = {
  kind: DogOwnerKind,
  id: number,
  name: string
}

export type DogLocation = {
  id: number,
  name: string,
  state: string
}

export type DogSpecies = {
  id: number,
  name: string
}

export type DogTag = {
  id: number,
  name: string 
}

export type DogInfo = {
  id: number,
  name: string,
  description: string,
  imageUrl: string,
  owner: DogOwner,
  location: DogLocation,
  gender: DogGender,
  ageInYears: number,
  weightInKg: number,
  heightInCm: number,
  species: DogSpecies,
  isNeutered: boolean,
  isDewormed: boolean,
  tags: DogTag[]
}
