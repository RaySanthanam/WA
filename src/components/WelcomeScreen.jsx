import React from 'react';

export default function WelcomeScreen() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-[#222e35] border-b-[6px] border-[#00a884]">
      <div className="text-center max-w-md px-8">
        {/* WhatsApp Web illustration */}
        <div className="mb-8">
          <svg className="w-[320px] h-[188px] mx-auto text-[#364147]" viewBox="0 0 320 188" fill="currentColor">
            <circle cx="160" cy="94" r="70" fill="none" stroke="currentColor" strokeWidth="3" opacity="0.3"/>
            <path d="M160 44c-27.6 0-50 22.4-50 50s22.4 50 50 50 50-22.4 50-50-22.4-50-50-50zm0 90c-22.1 0-40-17.9-40-40s17.9-40 40-40 40 17.9 40 40-17.9 40-40 40z" opacity="0.5"/>
            <path d="M145 80h30v8h-30zm0 20h30v8h-30z" opacity="0.4"/>
          </svg>
        </div>

        <h1 className="text-[#e9edef] text-3xl font-light mb-4">
          WhatsApp Memories
        </h1>
        <p className="text-[#8696a0] text-sm leading-relaxed mb-8">
          Your personal chat archive. Select a conversation from the left to view your messages and memories.
        </p>

        {/* Encryption notice */}
        <div className="flex items-center justify-center gap-2 text-[#8696a0] text-sm">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6zm9 14H6V10h12v10zm-6-3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"/>
          </svg>
          <span>Your personal messages are stored locally</span>
        </div>
      </div>
    </div>
  );
}
