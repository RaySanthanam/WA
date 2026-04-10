import React from 'react';

export default function MessageBubble({ message, onImageClick, showSender, onClick, isHighlighted }) {
  const isOutgoing = message.isOutgoing;

  const renderContent = () => {
    switch (message.type) {
      case 'image':
        return (
          <div className="relative -m-1 mb-0">
            <img
              src={`/data/media/${message.media}`}
              alt="Shared image"
              className="max-w-full rounded-lg cursor-pointer hover:opacity-95 transition-opacity"
              style={{ maxHeight: '330px', minWidth: '150px' }}
              onClick={() => onImageClick(message.media)}
              onError={(e) => {
                e.target.onerror = null;
                e.target.parentElement.innerHTML = `
                  <div class="flex items-center gap-2 text-[#8696a0] p-3">
                    <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span class="text-sm">Image not available</span>
                  </div>
                `;
              }}
            />
            {message.content && !message.content.match(/^[\w\-. ]+\.(jpg|jpeg|png|gif|webp)$/i) && (
              <p className="mt-2 mx-1 text-sm text-[#e9edef]">{message.content.replace(message.media, '').trim()}</p>
            )}
          </div>
        );

      case 'video':
        return (
          <div className="relative -m-1 mb-0">
            <video
              src={`/data/media/${message.media}`}
              controls
              className="max-w-full rounded-lg"
              style={{ maxHeight: '330px' }}
            >
              Your browser does not support video playback.
            </video>
          </div>
        );

      case 'audio':
        return (
          <div className="flex items-center gap-3 min-w-[280px] py-1">
            <div className="w-12 h-12 rounded-full bg-[#00a884] flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm-1-9c0-.55.45-1 1-1s1 .45 1 1v6c0 .55-.45 1-1 1s-1-.45-1-1V5z" />
                <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" />
              </svg>
            </div>
            <audio src={`/data/media/${message.media}`} controls className="flex-1 h-10" />
          </div>
        );

      case 'media-omitted':
        return (
          <div className="flex items-center gap-2 text-[#8696a0] italic py-1">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-sm">Media omitted</span>
          </div>
        );

      case 'deleted':
        return (
          <div className="flex items-center gap-2 text-[#8696a0] italic py-1">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
            </svg>
            <span className="text-sm">This message was deleted</span>
          </div>
        );

      case 'call':
        return (
          <div className="flex items-center gap-2 text-[#8696a0] py-1">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span className="text-sm">{message.content}</span>
          </div>
        );

      default:
        return <p className="text-[14.2px] leading-[19px] whitespace-pre-wrap break-words">{message.content}</p>;
    }
  };

  return (
    <div
      className={`flex ${isOutgoing ? 'justify-end' : 'justify-start'} px-[5%] md:px-[7%] ${onClick ? 'cursor-pointer' : ''}`}
      data-message-id={message.id}
      onClick={onClick}
    >
      <div
        className={`
          relative max-w-[65%] rounded-lg shadow-sm transition-all duration-300
          ${message.type === 'image' || message.type === 'video' ? 'p-1' : 'px-[9px] pt-[6px] pb-[8px]'}
          ${isOutgoing
            ? 'bg-[#005c4b] text-[#e9edef]'
            : 'bg-[#202c33] text-[#e9edef]'
          }
          ${isHighlighted ? 'ring-2 ring-[#00a884] ring-offset-2 ring-offset-[#0b141a]' : ''}
        `}
        style={{
          borderRadius: isOutgoing ? '7.5px 0 7.5px 7.5px' : '0 7.5px 7.5px 7.5px'
        }}
      >
        {/* Bubble tail */}
        <div
          className={`absolute top-0 w-2 h-[13px] ${isOutgoing ? '-right-2' : '-left-2'}`}
          style={{
            background: isOutgoing ? '#005c4b' : '#202c33',
            clipPath: isOutgoing
              ? 'polygon(0 0, 0% 100%, 100% 0)'
              : 'polygon(100% 0, 0 0, 100% 100%)'
          }}
        />

        {/* Sender name for group chats */}
        {showSender && !isOutgoing && (
          <p className="text-xs font-medium text-[#00a884] mb-1">{message.sender}</p>
        )}

        {/* Message content */}
        <div>{renderContent()}</div>

        {/* Timestamp and status */}
        <div className={`flex items-center justify-end gap-1 ${message.type === 'image' || message.type === 'video' ? 'absolute bottom-2 right-2 bg-black/30 rounded px-1.5 py-0.5' : 'mt-1'}`}>
          <span className={`text-[11px] ${message.type === 'image' || message.type === 'video' ? 'text-white/90' : 'text-[#8696a0]'}`}>
            {message.time}
          </span>
          {isOutgoing && (
            <svg className={`w-[16px] h-[11px] ${message.type === 'image' || message.type === 'video' ? 'text-white/90' : 'text-[#53bdeb]'}`} viewBox="0 0 16 11" fill="currentColor">
              <path d="M11.071.653a.457.457 0 0 0-.304-.102.493.493 0 0 0-.381.178l-6.19 7.636-2.405-2.272a.463.463 0 0 0-.336-.136.475.475 0 0 0-.349.158.457.457 0 0 0-.105.34.504.504 0 0 0 .169.315l2.734 2.582a.46.46 0 0 0 .312.117.458.458 0 0 0 .357-.182l6.543-8.082a.479.479 0 0 0 .09-.346.467.467 0 0 0-.135-.306z"/>
              <path d="M15.071.653a.457.457 0 0 0-.304-.102.493.493 0 0 0-.381.178l-6.19 7.636-1.165-1.1a.457.457 0 0 0-.31-.106.487.487 0 0 0-.343.168l-.243.287a.479.479 0 0 0-.09.346.467.467 0 0 0 .135.306l1.956 1.85a.46.46 0 0 0 .312.117.458.458 0 0 0 .357-.182l6.543-8.082a.479.479 0 0 0 .09-.346.467.467 0 0 0-.135-.306z" fillOpacity="0.4"/>
            </svg>
          )}
        </div>
      </div>
    </div>
  );
}
