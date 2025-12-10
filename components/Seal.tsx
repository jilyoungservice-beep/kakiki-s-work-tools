import React from 'react';

interface SealProps {
  companyName: string;
  subtitle?: string; // e.g., "合同专用章"
  color?: string;
  size?: number;
}

export const Seal: React.FC<SealProps> = ({ 
  companyName, 
  subtitle = "合同专用章", 
  color = "#dc2626", // Red-600
  size = 160 
}) => {
  // SVG Path logic for circular text
  // M startX startY A radius radius 0 largeArcFlag sweepFlag endX endY
  const pathId = `seal-curve-${Math.random().toString(36).substr(2, 9)}`;

  // Adjust text length logic: if name is very long, we might need smaller font
  const fontSize = companyName.length > 12 ? 18 : 22;

  return (
    <div className="relative inline-block select-none" style={{ width: size, height: size }}>
      <svg
        viewBox="0 0 200 200"
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Defined path for text to follow - slightly smaller than border */}
          {/* Path is an arc from approx 8 o'clock to 4 o'clock */}
          <path
            id={pathId}
            d="M 30,100 A 70,70 0 1,1 170,100"
            fill="none"
          />
        </defs>

        {/* Outer Circle */}
        <circle
          cx="100"
          cy="100"
          r="95"
          stroke={color}
          strokeWidth="4"
          fill="none"
        />
        
        {/* Inner Thin Circle (optional, stylistic for Chinese seals often just one thick or double line) */}
        {/* Many Chinese seals have just one thick border, but some have a thin inner line. Keeping it simple. */}
        <circle
          cx="100"
          cy="100"
          r="90"
          stroke={color}
          strokeWidth="1"
          fill="none"
        />

        {/* Center Star */}
        <polygon
          points="100,60 112,89 143,89 118,109 128,139 100,119 72,139 82,109 57,89 88,89"
          fill={color}
        />

        {/* Company Name (Curved) */}
        <text fill={color} fontSize={fontSize} fontWeight="bold" textAnchor="middle" letterSpacing="1" fontFamily="SimSun, serif">
          <textPath href={`#${pathId}`} startOffset="50%">
            {companyName}
          </textPath>
        </text>

        {/* Subtitle (Bottom Horizontal) */}
        <text
          x="100"
          y="160"
          fill={color}
          fontSize="20"
          fontWeight="bold"
          textAnchor="middle"
          fontFamily="SimSun, serif"
          letterSpacing="2"
        >
          {subtitle}
        </text>
      </svg>
      
      {/* Texture overlay to make it look like ink (optional aesthetic) */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-40 mix-blend-screen"
        style={{
          backgroundImage: `url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIi8+CjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiNjY2MiLz4KPC9zdmc+')`,
        }}
      />
    </div>
  );
};