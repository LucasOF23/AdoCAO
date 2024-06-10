import React,{ReactNode} from 'react';

interface HrefDivProps {
  children?: ReactNode;
  href: string;
}

const HrefDiv: React.FC<HrefDivProps> = ({ href, children }) => {
  const handleRedirect = () => {
    window.location.href = href;
  };
  
  return (
    <div onClick={handleRedirect} className="cursor-pointer w-full h-full">
      {children}
    </div>
  );
};

export default HrefDiv;
