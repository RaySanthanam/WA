import React from 'react';

export default function ChatHeader({ contactName, messageCount, onSearchToggle, showSearch }) {
  return (
    <header className="bg-wa-header text-white px-4 py-2 flex items-center gap-3 shadow-md">
      {/* Back arrow for mobile */}
      <button className="md:hidden p-2 -ml-2 hover:bg-white/10 rounded-full">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Avatar */}
      <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden flex-shrink-0">
        <svg className="w-6 h-6 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
        </svg>
      </div>

      {/* Contact info */}
      <div className="flex-1 min-w-0">
        <h1 className="text-base font-medium truncate">{contactName}</h1>
        <p className="text-xs text-white/70">{messageCount.toLocaleString()} messages</p>
      </div>

      {/* Search toggle */}
      <button
        onClick={onSearchToggle}
        className={`p-2 rounded-full transition-colors ${showSearch ? 'bg-white/20' : 'hover:bg-white/10'}`}
        aria-label="Search messages"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </button>

      {/* Menu */}
      <button className="p-2 hover:bg-white/10 rounded-full" aria-label="Menu">
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
        </svg>
      </button>
    </header>
  );
}
