import React, { useState } from 'react';
import ChatListItem from './ChatListItem';

export default function Sidebar({ chats, activeChat, onChatSelect, onSettingsClick, onProfileClick, yourName, yourAvatar }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showArchived, setShowArchived] = useState(false);
  const [filter, setFilter] = useState('all'); // 'all' | 'unread' | 'groups'

  const filteredChats = chats.filter(chat => {
    if (searchQuery) {
      return chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        chat.messages.some(m => m.content.toLowerCase().includes(searchQuery.toLowerCase()));
    }
    return true;
  });

  return (
    <div className="flex flex-col h-full bg-[#111b21]">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-2.5 bg-[#202c33]">
        {/* Profile picture */}
        <button
          onClick={onProfileClick}
          className="w-10 h-10 rounded-full bg-[#6a7175] flex items-center justify-center overflow-hidden hover:opacity-80 transition-opacity"
        >
          {yourAvatar ? (
            <img src={yourAvatar} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            <svg className="w-6 h-6 text-[#cfd4d6]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          )}
        </button>

        {/* Action buttons */}
        <div className="flex items-center gap-1">
          {/* Communities */}
          <button className="p-2 hover:bg-[#374045] rounded-full text-[#aebac1] transition-colors" title="Communities">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
            </svg>
          </button>

          {/* Status */}
          <button className="p-2 hover:bg-[#374045] rounded-full text-[#aebac1] transition-colors" title="Status">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5.5-2.5l7.51-3.49L17.5 6.5 9.99 9.99 6.5 17.5zm5.5-6.6c.61 0 1.1.49 1.1 1.1s-.49 1.1-1.1 1.1-1.1-.49-1.1-1.1.49-1.1 1.1-1.1z"/>
            </svg>
          </button>

          {/* Channels */}
          <button className="p-2 hover:bg-[#374045] rounded-full text-[#aebac1] transition-colors" title="Channels">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.17L4 17.17V4h16v12z"/>
            </svg>
          </button>

          {/* New chat */}
          <button className="p-2 hover:bg-[#374045] rounded-full text-[#aebac1] transition-colors" title="New chat">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.17L4 17.17V4h16v12zM11 5h2v4h4v2h-4v4h-2v-4H7V9h4V5z"/>
            </svg>
          </button>

          {/* Menu */}
          <div className="relative group">
            <button className="p-2 hover:bg-[#374045] rounded-full text-[#aebac1] transition-colors" title="Menu">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
              </svg>
            </button>

            {/* Dropdown menu */}
            <div className="absolute right-0 top-full mt-1 w-56 bg-[#233138] rounded-md shadow-lg py-2 z-50 hidden group-hover:block">
              <button className="w-full px-6 py-2.5 text-left text-[#d1d7db] hover:bg-[#182229] text-sm">
                New group
              </button>
              <button className="w-full px-6 py-2.5 text-left text-[#d1d7db] hover:bg-[#182229] text-sm">
                New community
              </button>
              <button className="w-full px-6 py-2.5 text-left text-[#d1d7db] hover:bg-[#182229] text-sm">
                Starred messages
              </button>
              <button className="w-full px-6 py-2.5 text-left text-[#d1d7db] hover:bg-[#182229] text-sm">
                Select chats
              </button>
              <button
                onClick={onSettingsClick}
                className="w-full px-6 py-2.5 text-left text-[#d1d7db] hover:bg-[#182229] text-sm"
              >
                Settings
              </button>
              <button className="w-full px-6 py-2.5 text-left text-[#d1d7db] hover:bg-[#182229] text-sm">
                Log out
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Search bar */}
      <div className="px-3 py-2 bg-[#111b21]">
        <div className="flex items-center gap-3 bg-[#202c33] rounded-lg px-3 py-1.5">
          <svg className="w-5 h-5 text-[#8696a0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search or start new chat"
            className="flex-1 bg-transparent text-[#d1d7db] text-sm placeholder-[#8696a0] focus:outline-none"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="text-[#8696a0] hover:text-[#d1d7db]">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2 px-3 py-2 overflow-x-auto">
        <button
          onClick={() => setFilter('all')}
          className={`px-3 py-1.5 rounded-full text-sm whitespace-nowrap transition-colors ${
            filter === 'all'
              ? 'bg-[#00a884] text-[#111b21]'
              : 'bg-[#202c33] text-[#d1d7db] hover:bg-[#2a3942]'
          }`}
        >
          All
        </button>
        <button
          onClick={() => setFilter('unread')}
          className={`px-3 py-1.5 rounded-full text-sm whitespace-nowrap transition-colors ${
            filter === 'unread'
              ? 'bg-[#00a884] text-[#111b21]'
              : 'bg-[#202c33] text-[#d1d7db] hover:bg-[#2a3942]'
          }`}
        >
          Unread
        </button>
        <button
          onClick={() => setFilter('groups')}
          className={`px-3 py-1.5 rounded-full text-sm whitespace-nowrap transition-colors ${
            filter === 'groups'
              ? 'bg-[#00a884] text-[#111b21]'
              : 'bg-[#202c33] text-[#d1d7db] hover:bg-[#2a3942]'
          }`}
        >
          Groups
        </button>
      </div>

      {/* Archived chats */}
      <button
        onClick={() => setShowArchived(!showArchived)}
        className="flex items-center gap-4 px-4 py-3 hover:bg-[#202c33] transition-colors"
      >
        <div className="w-12 h-12 rounded-full bg-[#00a884] flex items-center justify-center">
          <svg className="w-5 h-5 text-[#111b21]" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.54 5.23l-1.39-1.68C18.88 3.21 18.47 3 18 3H6c-.47 0-.88.21-1.16.55L3.46 5.23C3.17 5.57 3 6.02 3 6.5V19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6.5c0-.48-.17-.93-.46-1.27zM12 17.5L6.5 12H10v-2h4v2h3.5L12 17.5zM5.12 5l.81-1h12l.94 1H5.12z"/>
          </svg>
        </div>
        <span className="text-[#d1d7db] text-base">Archived</span>
      </button>

      {/* Chat list */}
      <div className="flex-1 overflow-y-auto">
        {filteredChats.map((chat) => (
          <ChatListItem
            key={chat.id}
            chat={chat}
            isActive={activeChat?.id === chat.id}
            onClick={() => onChatSelect(chat)}
          />
        ))}

        {filteredChats.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-[#8696a0] p-8">
            <svg className="w-16 h-16 mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <p>No chats found</p>
          </div>
        )}
      </div>

      {/* Encryption notice */}
      <div className="flex items-center justify-center gap-1 py-3 text-xs text-[#8696a0]">
        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6zm9 14H6V10h12v10zm-6-3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"/>
        </svg>
        <span>Your personal messages are end-to-end encrypted</span>
      </div>
    </div>
  );
}
