export type FormsItem = {
  id: number;
  label: string;
};

export type FormsSelProps = {
  items: FormsItem[];
  key: number;
  title: string;
  // question_button: QuestionButton;
};

export function FormsSel({ items, key, title }: FormsSelProps) {
  return (
    <>
      <h3>{title}</h3>
      <select className="select select-bordered select-xs w-full max-w-xs">
        {items.map((item) => (
          <option>{item.label}</option>
        ))}
      </select>
    </>
  );
}
