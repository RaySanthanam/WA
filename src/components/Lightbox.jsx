import React, { useEffect, useState } from 'react';

export default function Lightbox({ imageSrc, onClose }) {
  const [zoom, setZoom] = useState(1);

  // Close on escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === '+' || e.key === '=') setZoom(z => Math.min(z + 0.25, 3));
      if (e.key === '-') setZoom(z => Math.max(z - 0.25, 0.5));
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-[#111b21]" style={{ animation: 'fadeIn 0.2s ease-out' }}>
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 bg-[#202c33]">
        <div className="flex items-center gap-4">
          <button
            onClick={onClose}
            className="p-2 text-[#aebac1] hover:text-[#e9edef] hover:bg-[#374045] rounded-full transition-colors"
            aria-label="Close"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="w-10 h-10 rounded-full bg-[#6a7175] flex items-center justify-center">
            <svg className="w-6 h-6 text-[#cfd4d6]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </div>
          <div>
            <p className="text-[#e9edef] text-sm">{imageSrc}</p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          {/* Zoom controls */}
          <button
            onClick={() => setZoom(z => Math.max(z - 0.25, 0.5))}
            className="p-2 text-[#aebac1] hover:text-[#e9edef] hover:bg-[#374045] rounded-full transition-colors"
            title="Zoom out"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7" />
            </svg>
          </button>
          <span className="text-[#8696a0] text-sm w-12 text-center">{Math.round(zoom * 100)}%</span>
          <button
            onClick={() => setZoom(z => Math.min(z + 0.25, 3))}
            className="p-2 text-[#aebac1] hover:text-[#e9edef] hover:bg-[#374045] rounded-full transition-colors"
            title="Zoom in"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
            </svg>
          </button>

          {/* Star */}
          <button className="p-2 text-[#aebac1] hover:text-[#e9edef] hover:bg-[#374045] rounded-full transition-colors" title="Star">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
          </button>

          {/* Forward */}
          <button className="p-2 text-[#aebac1] hover:text-[#e9edef] hover:bg-[#374045] rounded-full transition-colors" title="Forward">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 8V4l8 8-8 8v-4H4V8h8z"/>
            </svg>
          </button>

          {/* Download */}
          <a
            href={`/data/media/${imageSrc}`}
            download
            className="p-2 text-[#aebac1] hover:text-[#e9edef] hover:bg-[#374045] rounded-full transition-colors"
            title="Download"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </a>
        </div>
      </header>

      {/* Image container */}
      <div
        className="flex-1 flex items-center justify-center overflow-auto p-4"
        onClick={onClose}
      >
        <img
          src={`/data/media/${imageSrc}`}
          alt="Full size"
          className="max-w-full max-h-full object-contain transition-transform duration-200"
          style={{ transform: `scale(${zoom})` }}
          onClick={(e) => e.stopPropagation()}
        />
      </div>
    </div>
  );
}
