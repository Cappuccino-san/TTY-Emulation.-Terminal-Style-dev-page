import React from 'react';
import { THEMES } from '../styles/themes';
import type { ThemeId } from '../types/terminal';

interface CrtOverlayProps {
  theme: ThemeId;
  scanlinesEnabled: boolean;
  curvatureEnabled: boolean;
  flashActive?: boolean;
}

export const CrtOverlay: React.FC<CrtOverlayProps> = ({
  theme,
  scanlinesEnabled,
  curvatureEnabled,
  flashActive = false,
}) => {
  const currentTheme = THEMES[theme];

  return (
    <>
      {/* 1. Deep Spherical Vignette Layer */}
      {curvatureEnabled && (
        <div
          className="crt-vignette"
          aria-hidden="true"
        />
      )}

      {/* 2. CRT Scanline Raster Grid & Continuous 8-Second Rolling Light Beam */}
      {scanlinesEnabled && (
        <div
          className="crt-scanlines-active"
          style={{ opacity: currentTheme.scanlineIntensity }}
          aria-hidden="true"
        />
      )}

      {/* 3. Stepped Analog Power Fluctuation Flicker */}
      {scanlinesEnabled && (
        <div
          className="crt-stepped-flicker"
          aria-hidden="true"
        />
      )}

      {/* 4. Power-on / Boot Electron Flare Expansion */}
      <div
        id="crt-flash"
        className={flashActive ? 'on' : ''}
        style={{ backgroundColor: currentTheme.brightText }}
        aria-hidden="true"
      />
    </>
  );
};

