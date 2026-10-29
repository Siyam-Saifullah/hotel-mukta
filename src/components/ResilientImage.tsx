import React, { useState } from 'react';
import { Building2 } from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  accentColor?: string;
  fallbackSubtitle?: string;
}

export const ResilientImage: React.FC<ResilientImageProps> = ({
  src,
  alt,
  className = '',
  accentColor = '#382226',
  fallbackSubtitle = 'Hotel Mukta International · Rajshahi',
}) => {
  const [hasError, setHasError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  if (hasError) {
    return (
      <div
        className={`relative flex flex-col items-center justify-center overflow-hidden p-6 text-center ${className}`}
        style={{
          background: `radial-gradient(circle at 30% 20%, #521F2C 0%, ${accentColor} 55%, #1B1218 100%)`,
        }}
      >
        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full border border-[#C89572]/30 bg-[#1B1218]/60 text-[#C89572]">
          <Building2 className="h-5 w-5" />
        </div>
        <p className="font-display text-lg font-semibold text-[#F7F2EE]">{alt}</p>
        <p className="mt-1 text-xs text-[#C5B5AC]">{fallbackSubtitle}</p>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden bg-[#261920] ${className}`}>
      {!loaded && (
        <div
          className="absolute inset-0 animate-pulse"
          style={{
            background: `linear-gradient(135deg, #2E1F29 0%, ${accentColor} 50%, #1B1218 100%)`,
          }}
        />
      )}
      <img
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        loading="lazy"
        onLoad={() => setLoaded(true)}
        onError={() => setHasError(true)}
        className={`h-full w-full object-cover transition-opacity duration-300 ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  );
};
