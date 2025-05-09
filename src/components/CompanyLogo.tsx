
import React from 'react';

interface CompanyLogoProps {
  size?: 'sm' | 'md' | 'lg';
}

const CompanyLogo: React.FC<CompanyLogoProps> = ({ size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  };

  return (
    <div className={`${sizeClasses[size]} flex items-center justify-center rounded-md`}>
      <img 
        src="/lovable-uploads/389a3047-4652-469b-a33d-6a5fc3d49b24.png" 
        alt="ParkNSecure Logo" 
        className="w-full h-full object-contain" 
      />
    </div>
  );
};

export default CompanyLogo;
