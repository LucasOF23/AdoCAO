export type OngLocation = {
  city: string;
  state: string;
};

export type OngInfo = {
  id: number;
  name: string;
  contact: string;
  location: OngLocation;
  imageUrl: string;
};
