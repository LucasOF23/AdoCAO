import React,{ReactNode} from 'react';

interface HrefButtonProps {
  children?: ReactNode;
  href: string;
}

const HrefButton: React.FC<HrefButtonProps> = ({ href, children }) => {
  const handleRedirect = () => {
    window.location.href = href;
  };
  
  return (
    <button onClick={handleRedirect} className="cursor-pointer w-full h-full">
      {children}
    </button>
  );
};

export default HrefButton;
