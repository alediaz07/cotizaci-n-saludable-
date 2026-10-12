import React, { useState, useEffect, useRef } from 'react';
import { Upload } from 'lucide-react';
import { saveMediaImage, getMediaImage, optimizeImage } from '../utils/imageStore';

interface NodivaLogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
  enableUploadOnClick?: boolean;
}

export const NodivaLogo: React.FC<NodivaLogoProps> = ({
  className = '',
  size = 48,
  showText = false,
  enableUploadOnClick = true,
}) => {
  const [logoSrc, setLogoSrc] = useState<string>('/logo.png');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let isMounted = true;
    getMediaImage('nodiva_custom_logo').then((saved) => {
      if (isMounted && saved) {
        setLogoSrc(saved);
      }
    });

    const handleUpdate = () => {
      getMediaImage('nodiva_custom_logo').then((saved) => {
        if (isMounted && saved) {
          setLogoSrc(saved);
        }
      });
    };

    window.addEventListener('nodiva_logo_updated', handleUpdate);
    return () => {
      isMounted = false;
      window.removeEventListener('nodiva_logo_updated', handleUpdate);
    };
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (event) => {
        const rawResult = event.target?.result as string;
        if (rawResult) {
          setLogoSrc(rawResult);
          try {
            const optimized = await optimizeImage(rawResult, 800, 0.95);
            setLogoSrc(optimized);
            await saveMediaImage('nodiva_custom_logo', optimized);
          } catch {
            await saveMediaImage('nodiva_custom_logo', rawResult);
          }
          window.dispatchEvent(new Event('nodiva_logo_updated'));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      <div className="relative group shrink-0">
        <img
          src={logoSrc}
          alt="Logo Oficial PK NODIVA PRODUCTS S.A."
          width={size}
          height={size}
          className="shrink-0 select-none drop-shadow-sm transition-transform duration-300 group-hover:scale-105 rounded-full object-contain cursor-pointer"
          style={{ width: `${size}px`, height: `${size}px` }}
          onClick={() => {
            if (enableUploadOnClick) {
              fileInputRef.current?.click();
            }
          }}
          title="Haga clic aquí para seleccionar directamente su archivo original de logo (.png)"
          onError={(e) => {
            const target = e.currentTarget;
            if (target.src.indexOf('nodiva-logo.svg') === -1) {
              target.src = '/nodiva-logo.svg';
            }
          }}
        />

        {/* Small subtle upload badge on hover */}
        {enableUploadOnClick && (
          <div
            onClick={() => fileInputRef.current?.click()}
            className="absolute inset-0 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer pointer-events-none"
            title="Cargar archivo original"
          >
            <Upload className="w-4 h-4 text-white" />
          </div>
        )}

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/png,image/jpeg,image/webp,image/svg+xml"
          onChange={handleFileChange}
          className="hidden"
          aria-label="Cargar archivo original de logo"
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
