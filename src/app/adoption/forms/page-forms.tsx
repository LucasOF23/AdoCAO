import { FormsSel, FormsItem } from "../../../components/FormsSel";
import { FormsInput, FormsInputProps } from "../../../components/FormsInput";

export default function PageForms() {
  const items: FormsItem[] = [
    {
      id: 1,
      label: "Pequeno",
    },
    {
      id: 10,
      label: "Médio",
    },
    {
      id: 10,
      label: "Grande",
    },
  ];
  return (
    <>
      <FormsSel items={items} key={220} title="Porte" />
      <FormsInput key={1} title="bom dia" />
    </>
  );
}
