import React from 'react';

export default function ChatListItem({ chat, isActive, onClick }) {
  const lastMessage = chat.lastMessage;

  const formatTime = (date) => {
    if (!date) return '';
    const now = new Date();
    const msgDate = new Date(date);

    if (msgDate.toDateString() === now.toDateString()) {
      return msgDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
    }

    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    if (msgDate.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    }

    // Within last week
    const daysAgo = Math.floor((now - msgDate) / (1000 * 60 * 60 * 24));
    if (daysAgo < 7) {
      return msgDate.toLocaleDateString('en-US', { weekday: 'short' });
    }

    return msgDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const getLastMessagePreview = () => {
    if (!lastMessage) return '';

    switch (lastMessage.type) {
      case 'image':
        return '📷 Photo';
      case 'video':
        return '🎥 Video';
      case 'audio':
        return '🎵 Audio';
      case 'document':
        return '📄 Document';
      case 'deleted':
        return '🚫 This message was deleted';
      default:
        return lastMessage.content.length > 50
          ? lastMessage.content.substring(0, 50) + '...'
          : lastMessage.content;
    }
  };

  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-3 py-3 hover:bg-[#202c33] transition-colors ${
        isActive ? 'bg-[#2a3942]' : ''
      }`}
    >
      {/* Avatar */}
      <div className="w-12 h-12 rounded-full bg-[#6a7175] flex items-center justify-center overflow-hidden flex-shrink-0">
        {chat.avatar ? (
          <img src={chat.avatar} alt={chat.name} className="w-full h-full object-cover" />
        ) : (
          <svg className="w-7 h-7 text-[#cfd4d6]" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
          </svg>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 border-t border-[#222d34] -mt-3 pt-3">
        <div className="flex items-center justify-between mb-0.5">
          <span className="text-[#e9edef] text-base truncate">{chat.name}</span>
          <span className={`text-xs flex-shrink-0 ml-2 ${chat.unread > 0 ? 'text-[#00a884]' : 'text-[#8696a0]'}`}>
            {formatTime(lastMessage?.timestamp)}
          </span>
        </div>
        <div className="flex items-center gap-1">
          {/* Double check for sent messages */}
          {lastMessage?.isOutgoing && (
            <svg className="w-4 h-4 text-[#53bdeb] flex-shrink-0" viewBox="0 0 16 15" fill="currentColor">
              <path d="M15.01 3.316l-.478-.372a.365.365 0 00-.51.063L8.666 9.88a.32.32 0 01-.484.032l-.358-.325a.32.32 0 00-.484.032l-.378.48a.418.418 0 00.036.54l1.32 1.267a.32.32 0 00.484-.034l6.272-8.048a.366.366 0 00-.064-.51zm-4.1 0l-.478-.372a.365.365 0 00-.51.063L4.566 9.88a.32.32 0 01-.484.032L1.89 7.77a.366.366 0 00-.516.005l-.423.433a.364.364 0 00.006.514l3.255 3.185a.32.32 0 00.484-.033l6.272-8.048a.365.365 0 00-.063-.51z" />
            </svg>
          )}
          <span className="text-[#8696a0] text-sm truncate">{getLastMessagePreview()}</span>
          {chat.unread > 0 && (
            <span className="ml-auto bg-[#00a884] text-[#111b21] text-xs font-medium px-1.5 py-0.5 rounded-full flex-shrink-0">
              {chat.unread}
            </span>
          )}
        </div>
      </div>
    </button>
  );
}
