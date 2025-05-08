
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
    <div className={`${sizeClasses[size]} flex items-center justify-center bg-parknSecure-blue rounded-md`}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-2/3 h-2/3"
      >
        <rect width="18" height="18" x="3" y="3" rx="2" />
        <path d="M7 7h.01" />
        <path d="M10 7h7" />
        <path d="M7 12h.01" />
        <path d="M10 12h7" />
        <path d="M7 17h.01" />
        <path d="M10 17h3" />
        <circle cx="19" cy="17" r="2" />
      </svg>
    </div>
  );
};

export default CompanyLogo;
