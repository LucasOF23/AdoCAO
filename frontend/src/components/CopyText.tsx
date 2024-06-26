// src/components/CopyText.tsx

import React, { useState } from 'react';

interface CopyTextProps {
  text: string;
  copy: string;
}

export const CopyText: React.FC<CopyTextProps> = ({ text,copy }) => {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(copy);
    } catch (err) {}
  };
  
  return (
    <div className="text-center cursor-pointer">
      <p onClick={handleCopy}>
        {text}
      </p>
    </div>
  );
};

export default CopyText;
