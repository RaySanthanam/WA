import React, { useState } from 'react';

export default function SettingsPanel({ onBack }) {
  const [activeSection, setActiveSection] = useState(null);

  const settingsItems = [
    {
      id: 'notifications',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z"/>
        </svg>
      ),
      title: 'Notifications',
      description: 'Message, group & call tones',
    },
    {
      id: 'privacy',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6zm9 14H6V10h12v10zm-6-3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"/>
        </svg>
      ),
      title: 'Privacy',
      description: 'Block contacts, disappearing messages',
    },
    {
      id: 'security',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/>
        </svg>
      ),
      title: 'Security',
      description: 'Security notifications, app lock',
    },
    {
      id: 'theme',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9c.83 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.01-.23-.26-.38-.61-.38-.99 0-.83.67-1.5 1.5-1.5H16c2.76 0 5-2.24 5-5 0-4.42-4.03-8-9-8zm-5.5 9c-.83 0-1.5-.67-1.5-1.5S5.67 9 6.5 9 8 9.67 8 10.5 7.33 12 6.5 12zm3-4C8.67 8 8 7.33 8 6.5S8.67 5 9.5 5s1.5.67 1.5 1.5S10.33 8 9.5 8zm5 0c-.83 0-1.5-.67-1.5-1.5S13.67 5 14.5 5s1.5.67 1.5 1.5S15.33 8 14.5 8zm3 4c-.83 0-1.5-.67-1.5-1.5S16.67 9 17.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
        </svg>
      ),
      title: 'Theme',
      description: 'Dark mode enabled',
    },
    {
      id: 'chat-wallpaper',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M4 4h7V2H4c-1.1 0-2 .9-2 2v7h2V4zm6 9l-4 5h12l-3-4-2.03 2.71L10 13zm7-4.5c0-.83-.67-1.5-1.5-1.5S14 7.67 14 8.5s.67 1.5 1.5 1.5S17 9.33 17 8.5zM20 2h-7v2h7v7h2V4c0-1.1-.9-2-2-2zm0 18h-7v2h7c1.1 0 2-.9 2-2v-7h-2v7zM4 13H2v7c0 1.1.9 2 2 2h7v-2H4v-7z"/>
        </svg>
      ),
      title: 'Chat wallpaper',
      description: 'Choose wallpaper for chats',
    },
    {
      id: 'request-info',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14h-2v-6h2v6zm0-8h-2V7h2v2z"/>
        </svg>
      ),
      title: 'Request account info',
      description: 'Request a report of your account',
    },
    {
      id: 'keyboard',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20 5H4c-1.1 0-1.99.9-1.99 2L2 17c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm-9 3h2v2h-2V8zm0 3h2v2h-2v-2zM8 8h2v2H8V8zm0 3h2v2H8v-2zm-1 2H5v-2h2v2zm0-3H5V8h2v2zm9 7H8v-2h8v2zm0-4h-2v-2h2v2zm0-3h-2V8h2v2zm3 3h-2v-2h2v2zm0-3h-2V8h2v2z"/>
        </svg>
      ),
      title: 'Keyboard shortcuts',
      description: 'View keyboard shortcuts',
    },
    {
      id: 'help',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"/>
        </svg>
      ),
      title: 'Help',
      description: 'Help center, contact us',
    },
  ];

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
        <h1 className="text-[#e9edef] text-xl font-medium">Settings</h1>
      </header>

      {/* Profile card */}
      <button className="flex items-center gap-4 px-6 py-4 hover:bg-[#202c33] transition-colors">
        <div className="w-20 h-20 rounded-full bg-[#6a7175] flex items-center justify-center flex-shrink-0">
          <svg className="w-12 h-12 text-[#cfd4d6]" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
          </svg>
        </div>
        <div className="flex-1 text-left">
          <h2 className="text-[#e9edef] text-lg">Your Name</h2>
          <p className="text-[#8696a0] text-sm">Hey there! I am using WhatsApp.</p>
        </div>
      </button>

      {/* Settings list */}
      <div className="flex-1 overflow-y-auto">
        {settingsItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveSection(item.id)}
            className="w-full flex items-center gap-6 px-6 py-4 hover:bg-[#202c33] transition-colors"
          >
            <div className="text-[#8696a0]">{item.icon}</div>
            <div className="flex-1 text-left border-b border-[#222d34] pb-4 -mb-4">
              <h3 className="text-[#e9edef] text-base">{item.title}</h3>
              <p className="text-[#8696a0] text-sm">{item.description}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
