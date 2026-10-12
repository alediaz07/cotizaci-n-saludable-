import React from 'react';

interface NodivaLogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
}

export const NodivaLogo: React.FC<NodivaLogoProps> = ({
  className = '',
  size = 48,
  showText = false,
}) => {
  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      <div className="shrink-0">
        <img
          src="/logo.png"
          alt="Logo Oficial PK NODIVA PRODUCTS S.A."
          width={size}
          height={size}
          className="shrink-0 select-none rounded-full object-contain"
          style={{ width: `${size}px`, height: `${size}px` }}
          onError={(e) => {
            const target = e.currentTarget;
            if (target.src.indexOf('nodiva-logo.svg') === -1) {
              target.src = '/nodiva-logo.svg';
            }
          }}
        />
      </div>

      {showText && (
        <div className="flex flex-col leading-tight">
          <span className="font-heading font-extrabold tracking-tight text-base sm:text-lg text-[#111111]">
            NODIVA <span className="text-[#C8102E]">PRODUCTS S.A.</span>
          </span>
          <span className="text-[11px] font-medium tracking-wider text-[#727780] uppercase">
            Catering Corporativo
          </span>
        </div>
      )}
    </div>
  );
};
