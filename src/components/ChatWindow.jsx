import React, { useRef, useEffect } from 'react';
import MessageBubble from './MessageBubble';
import DateSeparator from './DateSeparator';
import { groupMessagesByDate } from '../utils/parseWhatsApp';

export default function ChatWindow({ messages, onImageClick, searchQuery }) {
  const chatRef = useRef(null);
  const messageGroups = groupMessagesByDate(messages);

  // Scroll to bottom on initial load
  useEffect(() => {
    if (chatRef.current && !searchQuery) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, []);

  // Highlight search matches
  const highlightMatch = (text, query) => {
    if (!query) return text;
    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    return text.replace(regex, '<mark class="bg-yellow-200 rounded px-0.5">$1</mark>');
  };

  if (messages.length === 0) {
    return (
      <div className="flex-1 wa-chat-pattern flex items-center justify-center">
        <div className="text-center text-wa-text-secondary">
          <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          {searchQuery ? (
            <p>No messages found for "{searchQuery}"</p>
          ) : (
            <p>No messages to display</p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      ref={chatRef}
      className="flex-1 wa-chat-pattern overflow-y-auto chat-scroll py-4"
    >
      {messageGroups.map((group, groupIndex) => (
        <div key={groupIndex}>
          <DateSeparator date={group.date} />
          <div className="space-y-1">
            {group.messages.map((message, msgIndex) => (
              <MessageBubble
                key={message.id}
                message={message}
                onImageClick={onImageClick}
                showSender={msgIndex === 0 || group.messages[msgIndex - 1].sender !== message.sender}
              />
            ))}
          </div>
        </div>
      ))}

      {/* Scroll anchor */}
      <div className="h-4" />
    </div>
  );
}
