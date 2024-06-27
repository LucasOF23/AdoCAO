import React, { useState } from "react";

function EditableLabel({ text, onChange, minchar, maxchar }) {
  // Recebe o texto atual e o handler de quando termina de editar

  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(text);

  const handleDoubleClick = () => {
    setIsEditing(true);
  }; // detecta se o span foi clicado
  const handleChange = (e) => {
    const newValue = e.target.value;
    setValue(newValue);
  }; // permite adicionar o texto na caixa bonitinho

  const handleBlur = () => {
    // detecta se aconteceu algum clique na tela (para a edição)
    setIsEditing(false);
    onChange(value);
  };

  const handleKeyPress = (e) => {
    // detecta se apertou o Enter, aí ele sai também
    if (e.key === "Enter") {
      setIsEditing(false);
      if (value.length < minchar || value.length > maxchar) {
        onChange("???");
        setValue("???");
      } else {
        onChange(value);
      }
    }
  };

  return (
    <div>
      {isEditing ? (
        <input
          style={{ width: `${value.length}ch` }} //Permite ajustar o tamanho da caixa dinamicamente
          type="text"
          value={value}
          onKeyDown={handleKeyPress}
          onChange={handleChange}
          onBlur={handleBlur}
          autoFocus
        />
      ) : (
        <span onDoubleClick={handleDoubleClick} className="ml-1">
          {text}
        </span>
      )}
    </div>
  );
}

export default EditableLabel;
