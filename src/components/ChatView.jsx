import React, { useState, useRef, useEffect } from 'react';
import MessageBubble from './MessageBubble';
import DateSeparator from './DateSeparator';
import MediaGallery from './MediaGallery';
import { groupMessagesByDate, searchMessages } from '../utils/parseWhatsApp';

export default function ChatView({ chat, onImageClick, onBack }) {
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showContactInfo, setShowContactInfo] = useState(false);
  const [showMedia, setShowMedia] = useState(false);
  const [highlightedMessageId, setHighlightedMessageId] = useState(null);
  const chatRef = useRef(null);

  const filteredMessages = searchQuery
    ? searchMessages(chat.messages, searchQuery)
    : chat.messages;

  const messageGroups = groupMessagesByDate(filteredMessages);

  // Scroll to bottom on chat change
  useEffect(() => {
    if (chatRef.current && !searchQuery) {
      setTimeout(() => {
        chatRef.current.scrollTop = chatRef.current.scrollHeight;
      }, 100);
    }
  }, [chat.id]);

  // Scroll to highlighted message
  useEffect(() => {
    if (highlightedMessageId !== null) {
      const element = document.querySelector(`[data-message-id="${highlightedMessageId}"]`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        // Remove highlight after animation
        setTimeout(() => setHighlightedMessageId(null), 2000);
      }
    }
  }, [highlightedMessageId]);

  // Handle clicking on a search result
  const handleMessageClick = (messageId) => {
    setSearchQuery('');
    setShowSearch(false);
    // Small delay to let the full chat render before scrolling
    setTimeout(() => setHighlightedMessageId(messageId), 100);
  };

  return (
    <div className="flex flex-col h-full min-h-0 bg-[#0b141a] overflow-hidden relative">
      {/* Header */}
      <header className="flex items-center gap-3 px-4 py-2 bg-[#202c33]">
        {/* Back button (mobile) */}
        <button
          onClick={onBack}
          className="md:hidden p-2 -ml-2 hover:bg-[#374045] rounded-full text-[#aebac1]"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Avatar */}
        <button
          onClick={() => setShowContactInfo(!showContactInfo)}
          className="w-10 h-10 rounded-full bg-[#6a7175] flex items-center justify-center overflow-hidden flex-shrink-0 hover:opacity-80 transition-opacity"
        >
          {chat.avatar ? (
            <img src={chat.avatar} alt={chat.name} className="w-full h-full object-cover" />
          ) : (
            <svg className="w-6 h-6 text-[#cfd4d6]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          )}
        </button>

        {/* Contact info */}
        <button
          onClick={() => setShowContactInfo(!showContactInfo)}
          className="flex-1 min-w-0 text-left hover:bg-[#202c33] -my-2 py-2 rounded"
        >
          <h2 className="text-[#e9edef] text-base font-normal truncate">{chat.name}</h2>
          <p className="text-[#8696a0] text-xs">click here for contact info</p>
        </button>

        {/* Action buttons */}
        <div className="flex items-center gap-1">
          {/* Video call */}
          <button className="p-2 hover:bg-[#374045] rounded-full text-[#aebac1] transition-colors" title="Video call">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"/>
            </svg>
          </button>

          {/* Voice call */}
          <button className="p-2 hover:bg-[#374045] rounded-full text-[#aebac1] transition-colors" title="Voice call">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/>
            </svg>
          </button>

          {/* Media gallery */}
          <button
            onClick={() => setShowMedia(true)}
            className="p-2 hover:bg-[#374045] rounded-full text-[#aebac1] transition-colors"
            title="Media"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
            </svg>
          </button>

          {/* Search */}
          <button
            onClick={() => setShowSearch(!showSearch)}
            className={`p-2 rounded-full transition-colors ${showSearch ? 'bg-[#374045] text-[#00a884]' : 'hover:bg-[#374045] text-[#aebac1]'}`}
            title="Search"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>

          {/* Menu */}
          <div className="relative group">
            <button className="p-2 hover:bg-[#374045] rounded-full text-[#aebac1] transition-colors" title="Menu">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
              </svg>
            </button>

            <div className="absolute right-0 top-full mt-1 w-56 bg-[#233138] rounded-md shadow-lg py-2 z-50 hidden group-hover:block">
              <button className="w-full px-6 py-2.5 text-left text-[#d1d7db] hover:bg-[#182229] text-sm">
                Contact info
              </button>
              <button className="w-full px-6 py-2.5 text-left text-[#d1d7db] hover:bg-[#182229] text-sm">
                Select messages
              </button>
              <button className="w-full px-6 py-2.5 text-left text-[#d1d7db] hover:bg-[#182229] text-sm">
                Close chat
              </button>
              <button className="w-full px-6 py-2.5 text-left text-[#d1d7db] hover:bg-[#182229] text-sm">
                Mute notifications
              </button>
              <button className="w-full px-6 py-2.5 text-left text-[#d1d7db] hover:bg-[#182229] text-sm">
                Disappearing messages
              </button>
              <button className="w-full px-6 py-2.5 text-left text-[#d1d7db] hover:bg-[#182229] text-sm">
                Clear chat
              </button>
              <button className="w-full px-6 py-2.5 text-left text-[#d1d7db] hover:bg-[#182229] text-sm">
                Delete chat
              </button>
              <button className="w-full px-6 py-2.5 text-left text-[#d1d7db] hover:bg-[#182229] text-sm">
                Report
              </button>
              <button className="w-full px-6 py-2.5 text-left text-[#d1d7db] hover:bg-[#182229] text-sm">
                Block
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Search bar */}
      {showSearch && (
        <div className="flex items-center gap-3 px-4 py-2 bg-[#202c33] border-t border-[#222d34]">
          <button
            onClick={() => {
              setShowSearch(false);
              setSearchQuery('');
            }}
            className="p-1 hover:bg-[#374045] rounded-full text-[#aebac1]"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search..."
            className="flex-1 bg-[#2a3942] text-[#d1d7db] text-sm placeholder-[#8696a0] px-4 py-2 rounded-lg focus:outline-none"
            autoFocus
          />
          {searchQuery && (
            <span className="text-[#8696a0] text-sm">{filteredMessages.length} found</span>
          )}
        </div>
      )}

      {/* Chat messages */}
      <div
        ref={chatRef}
        className="flex-1 min-h-0 overflow-y-auto py-4"
        style={{
          backgroundColor: '#0b141a',
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 303 172'%3E%3Cpath fill='%2309141a' opacity='0.8' d='M19 2a3 3 0 00-3 3v4a3 3 0 003 3h6a3 3 0 003-3V5a3 3 0 00-3-3h-6zm158 1l-4 7h8l-4-7zm-92 6a4 4 0 100 8 4 4 0 000-8zm105 4a4 4 0 100 8 4 4 0 000-8zM35 23a14 14 0 100 14h-6a8 8 0 110-14h6zm248-4a4 4 0 100 8 4 4 0 000-8zm-63 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3v-6a3 3 0 00-3-3h-10zm91 4l-4 7h8l-4-7zm-165 0a4 4 0 100 8 4 4 0 000-8zM41 41a4 4 0 100 8 4 4 0 000-8zm134 1l-4 7h8l-4-7zm113 2a3 3 0 00-3 3v4a3 3 0 003 3h6a3 3 0 003-3v-4a3 3 0 00-3-3h-6zM62 54a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3v-6a3 3 0 00-3-3H62zm77 1l-4 7h8l-4-7zm88 1a4 4 0 100 8 4 4 0 000-8zm62 1a4 4 0 100 8 4 4 0 000-8zM11 62a4 4 0 100 8 4 4 0 000-8zm175 0a4 4 0 100 8 4 4 0 000-8zm-75 2a3 3 0 00-3 3v4a3 3 0 003 3h6a3 3 0 003-3v-4a3 3 0 00-3-3h-6zm135 2a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3v-6a3 3 0 00-3-3h-10zm-95 7l-4 7h8l-4-7zM47 77a4 4 0 100 8 4 4 0 000-8zm209 3a4 4 0 100 8 4 4 0 000-8zM92 84a3 3 0 00-3 3v4a3 3 0 003 3h6a3 3 0 003-3v-4a3 3 0 00-3-3h-6zm-77 2a4 4 0 100 8 4 4 0 000-8zm60 2a4 4 0 100 8 4 4 0 000-8zm175 0a4 4 0 100 8 4 4 0 000-8zm-109 0a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3v-6a3 3 0 00-3-3h-10zm-95 7l-4 7h8l-4-7zm246 0l-4 7h8l-4-7zM75 102a4 4 0 100 8 4 4 0 000-8zm191 3a4 4 0 100 8 4 4 0 000-8zm-53 2a3 3 0 00-3 3v4a3 3 0 003 3h6a3 3 0 003-3v-4a3 3 0 00-3-3h-6zm-199 5l-4 7h8l-4-7zm89 0l-4 7h8l-4-7zm153 3a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3v-6a3 3 0 00-3-3h-10zm-239 3a4 4 0 100 8 4 4 0 000-8zm265 2a4 4 0 100 8 4 4 0 000-8zm-161 0a4 4 0 100 8 4 4 0 000-8zm-75 3a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3v-6a3 3 0 00-3-3H46zm98 0a3 3 0 00-3 3v4a3 3 0 003 3h6a3 3 0 003-3v-4a3 3 0 00-3-3h-6zm117 5l-4 7h8l-4-7zm-148 3a4 4 0 100 8 4 4 0 000-8zm196 2a4 4 0 100 8 4 4 0 000-8zm-113 1a4 4 0 100 8 4 4 0 000-8zm-142 2l-4 7h8l-4-7zm251 1a3 3 0 00-3 3v4a3 3 0 003 3h6a3 3 0 003-3v-4a3 3 0 00-3-3h-6zm-210 7a4 4 0 100 8 4 4 0 000-8z'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
        }}
      >
        {messageGroups.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center text-[#8696a0]">
              <p>No messages {searchQuery ? `matching "${searchQuery}"` : ''}</p>
            </div>
          </div>
        ) : (
          messageGroups.map((group, groupIndex) => (
            <div key={groupIndex}>
              <DateSeparator date={group.date} />
              <div className="space-y-0.5">
                {group.messages.map((message) => (
                  <MessageBubble
                    key={message.id}
                    message={message}
                    onImageClick={onImageClick}
                    showSender={false}
                    onClick={searchQuery ? () => handleMessageClick(message.id) : undefined}
                    isHighlighted={highlightedMessageId === message.id}
                  />
                ))}
              </div>
            </div>
          ))
        )}
        <div className="h-2" />
      </div>

      {/* Input area (disabled - read-only archive) */}
      <div className="flex items-center gap-2 px-4 py-3 bg-[#202c33]">
        <button className="p-2 text-[#8696a0]" title="Emoji">
          <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
            <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/>
          </svg>
        </button>
        <button className="p-2 text-[#8696a0]" title="Attach">
          <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
            <path d="M16.5 6v11.5c0 2.21-1.79 4-4 4s-4-1.79-4-4V5c0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5v10.5c0 .55-.45 1-1 1s-1-.45-1-1V6H10v9.5c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5V5c0-2.21-1.79-4-4-4S7 2.79 7 5v12.5c0 3.04 2.46 5.5 5.5 5.5s5.5-2.46 5.5-5.5V6h-1.5z"/>
          </svg>
        </button>
        <div className="flex-1 bg-[#2a3942] rounded-lg px-4 py-2.5 text-[#8696a0] text-sm">
          This is a read-only chat archive
        </div>
        <button className="p-2 text-[#8696a0]" title="Voice message">
          <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm-1-9c0-.55.45-1 1-1s1 .45 1 1v6c0 .55-.45 1-1 1s-1-.45-1-1V5z"/>
            <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
          </svg>
        </button>
      </div>

      {/* Media Gallery Overlay */}
      {showMedia && (
        <div className="absolute inset-0 z-40">
          <MediaGallery
            messages={chat.messages}
            onImageClick={onImageClick}
            onClose={() => setShowMedia(false)}
          />
        </div>
      )}
    </div>
  );
}
