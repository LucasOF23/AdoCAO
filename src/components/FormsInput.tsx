import { InfoB, InfoBProps } from "./infoB";

export type FormsInputProps = {
  key: number;
  title: string;
  //   informative_button: InfoBProps;
};

export function FormsInput({ key, title }: FormsInputProps) {
  return (
    <>
      <h3>{title}</h3>
      <input
        type="text"
        placeholder="Digite aqui"
        className="input input-bordered w-full max-w-xs input-xs"
      />
    </>
  );
}
