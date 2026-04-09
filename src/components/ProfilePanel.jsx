import React, { useState } from 'react';

export default function ProfilePanel({ onBack, yourName }) {
  const [name, setName] = useState(yourName || 'Your Name');
  const [about, setAbout] = useState('Hey there! I am using WhatsApp.');
  const [editingName, setEditingName] = useState(false);
  const [editingAbout, setEditingAbout] = useState(false);

  return (
    <div className="flex flex-col h-full bg-[#111b21]">
      {/* Header */}
      <header className="flex items-center gap-6 px-6 py-4 bg-[#202c33]">
        <button
          onClick={onBack}
          className="p-1 hover:bg-[#374045] rounded-full text-[#aebac1] transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-[#e9edef] text-xl font-medium">Profile</h1>
      </header>

      <div className="flex-1 overflow-y-auto">
        {/* Profile picture */}
        <div className="flex justify-center py-8">
          <div className="relative group">
            <div className="w-[200px] h-[200px] rounded-full bg-[#6a7175] flex items-center justify-center overflow-hidden">
              <svg className="w-32 h-32 text-[#cfd4d6]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            </div>
            <button className="absolute inset-0 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white">
              <svg className="w-8 h-8 mb-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
              </svg>
              <span className="text-xs">CHANGE PROFILE PHOTO</span>
            </button>
          </div>
        </div>

        {/* Name section */}
        <div className="px-8 py-4">
          <label className="text-[#00a884] text-sm font-medium">Your name</label>
          {editingName ? (
            <div className="flex items-center gap-2 mt-4">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="flex-1 bg-transparent text-[#e9edef] text-lg border-b-2 border-[#00a884] focus:outline-none pb-2"
                autoFocus
              />
              <button
                onClick={() => setEditingName(false)}
                className="p-2 text-[#00a884] hover:bg-[#202c33] rounded-full"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-between mt-4">
              <span className="text-[#e9edef] text-lg">{name}</span>
              <button
                onClick={() => setEditingName(true)}
                className="p-2 text-[#8696a0] hover:text-[#e9edef] hover:bg-[#202c33] rounded-full"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                </svg>
              </button>
            </div>
          )}
          <p className="text-[#8696a0] text-sm mt-4">
            This is not your username or PIN. This name will be visible to your WhatsApp contacts.
          </p>
        </div>

        <div className="h-px bg-[#222d34] mx-8" />

        {/* About section */}
        <div className="px-8 py-4">
          <label className="text-[#00a884] text-sm font-medium">About</label>
          {editingAbout ? (
            <div className="flex items-center gap-2 mt-4">
              <input
                type="text"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                className="flex-1 bg-transparent text-[#e9edef] text-lg border-b-2 border-[#00a884] focus:outline-none pb-2"
                autoFocus
              />
              <button
                onClick={() => setEditingAbout(false)}
                className="p-2 text-[#00a884] hover:bg-[#202c33] rounded-full"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-between mt-4">
              <span className="text-[#e9edef] text-lg">{about}</span>
              <button
                onClick={() => setEditingAbout(true)}
                className="p-2 text-[#8696a0] hover:text-[#e9edef] hover:bg-[#202c33] rounded-full"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
