import React from 'react';

export default function SearchBar({ value, onChange, onClose, resultCount }) {
  return (
    <div className="bg-wa-panel-bg border-b border-wa-border px-4 py-2 flex items-center gap-3">
      <button
        onClick={onClose}
        className="p-2 -ml-2 hover:bg-gray-200 rounded-full text-wa-text-secondary"
        aria-label="Close search"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <div className="flex-1 relative">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search messages..."
          className="w-full bg-white rounded-lg px-4 py-2 text-sm text-wa-text placeholder-wa-text-secondary focus:outline-none focus:ring-2 focus:ring-wa-green/30"
          autoFocus
        />
        {value && (
          <button
            onClick={() => onChange('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-wa-text-secondary hover:text-wa-text"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {value && (
        <span className="text-sm text-wa-text-secondary whitespace-nowrap">
          {resultCount} found
        </span>
      )}
    </div>
  );
}
