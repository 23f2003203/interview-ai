import React from 'react';

const Logo = ({ size = 'medium', variant = 'full', className = '' }) => {
  const iconSizes = {
    small: { width: 32, height: 32 },
    medium: { width: 44, height: 44 },
    large: { width: 56, height: 56 },
  };

  const currentSize = iconSizes[size] || iconSizes.medium;

  return (
    <div className={`brand-logo-container ${variant} ${className}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem' }}>
      <svg 
        width={currentSize.width} 
        height={currentSize.height} 
        viewBox="0 0 100 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="logoBubbleGrad" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#00e5ff" />
            <stop offset="100%" stopColor="#0052d4" />
          </linearGradient>
          <linearGradient id="logoAGrad" x1="20" y1="10" x2="90" y2="90" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#00e5ff" />
            <stop offset="50%" stopColor="#0066ff" />
            <stop offset="100%" stopColor="#0a2540" />
          </linearGradient>
          <linearGradient id="logoBeamGrad" x1="30" y1="40" x2="80" y2="70" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#80f3ff" />
            <stop offset="100%" stopColor="#0066ff" />
          </linearGradient>
          <filter id="glowEffect" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Chat Bubble Background Shape */}
        <path 
          d="M 18 52 C 18 32 34 18 54 18 C 66 18 76 24 82 33 L 73 39 C 68 32 60 27 50 27 C 36 27 26 37 26 51 C 26 62 33 71 44 74 L 38 85 L 26 80 L 18 84 Z" 
          fill="url(#logoBubbleGrad)"
          opacity="0.9"
        />

        {/* Futuristic Stylized Tech 'A' */}
        <path 
          d="M 62 16 L 88 78 C 89 80 87 83 84 83 L 72 83 C 70 83 68 82 67 80 L 61 65 L 43 65 L 53 43 L 62 16 Z" 
          fill="url(#logoAGrad)" 
        />
        
        {/* 'A' Left Wing Curve */}
        <path 
          d="M 62 16 L 38 78 C 37 80 39 83 42 83 L 53 83 L 62 60 L 53 43 Z" 
          fill="url(#logoBeamGrad)"
          opacity="0.85"
        />

        {/* Inner Crossbar & Tech Nodes */}
        <path d="M 42 63 L 68 63" stroke="#00e5ff" strokeWidth="4" strokeLinecap="round" />
        <line x1="53" y1="43" x2="62" y2="63" stroke="#80f3ff" strokeWidth="3" />

        {/* Glowing Tech Dots */}
        <circle cx="62" cy="16" r="4.5" fill="#ffffff" filter="url(#glowEffect)" />
        <circle cx="43" cy="63" r="3.5" fill="#00e5ff" filter="url(#glowEffect)" />
        <circle cx="68" cy="63" r="3.5" fill="#00e5ff" filter="url(#glowEffect)" />
        <circle cx="53" cy="43" r="3" fill="#ffffff" />
      </svg>

      {variant !== 'icon' && (
        <div className="brand-text-block" style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
          <div className="brand-title-row" style={{ fontSize: size === 'large' ? '1.75rem' : size === 'small' ? '1.1rem' : '1.35rem', fontWeight: '800', letterSpacing: '-0.02em', lineHeight: '1', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <span style={{ color: '#ffffff' }}>INTERVIEW</span>
            <span style={{ color: '#00e5ff' }}>AI</span>
          </div>
          <span className="brand-tagline" style={{ fontSize: size === 'small' ? '0.5rem' : '0.575rem', fontWeight: '600', letterSpacing: '0.12em', color: variant === 'banner' ? 'rgba(255, 255, 255, 0.8)' : '#94a3b8', marginTop: '0.25rem', textTransform: 'uppercase' }}>
            THE INTELLIGENT HIRING PLATFORM
          </span>
        </div>
      )}
    </div>
  );
};

export default Logo;
