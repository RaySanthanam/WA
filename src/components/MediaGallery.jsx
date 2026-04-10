import React, { useState } from 'react';

  export default function MediaGallery({ messages, onImageClick, onClose }) {
    const [activeTab, setActiveTab] = useState('media');

    const mediaMessages = messages.filter(m => m.type === 'image' || m.type === 'video');
    const docMessages = messages.filter(m => m.type === 'document' || m.type === 'audio');

    return (
      <div className="flex flex-col h-full bg-[#111b21]">
        {/* Header */}
        <header className="flex items-center gap-4 px-4 py-3 bg-[#202c33]">
          <button onClick={onClose} className="p-2 hover:bg-[#374045] rounded-full text-[#aebac1]">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <h2 className="text-[#e9edef] text-lg">Media, links and docs</h2>
        </header>

        {/* Tabs */}
        <div className="flex border-b border-[#222d34]">
          <button
            onClick={() => setActiveTab('media')}
            className={`flex-1 py-3 text-sm font-medium ${activeTab === 'media' ? 'text-[#00a884] border-b-2
   border-[#00a884]' : 'text-[#8696a0]'}`}
          >
            Media
          </button>
          <button
            onClick={() => setActiveTab('docs')}
            className={`flex-1 py-3 text-sm font-medium ${activeTab === 'docs' ? 'text-[#00a884] border-b-2
  border-[#00a884]' : 'text-[#8696a0]'}`}
          >
            Docs
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-2">
          {activeTab === 'media' ? (
            <div className="grid grid-cols-3 gap-1">
              {mediaMessages.map((msg) => (
                <div
                  key={msg.id}
                  className="aspect-square bg-[#202c33] cursor-pointer hover:opacity-80"
                  onClick={() => onImageClick(msg.media)}
                >
                  {msg.type === 'image' && (
                    <img src={`/data/media/${msg.media}`} alt="" className="w-full h-full object-cover" />
                  )}
                  {msg.type === 'video' && (
                    <div className="w-full h-full flex items-center justify-center">
                      <svg className="w-12 h-12 text-white/70" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  )}
                </div>
              ))}
              {mediaMessages.length === 0 && (
                <p className="col-span-3 text-center text-[#8696a0] py-8">No media</p>
              )}
            </div>
          ) : (
            <div className="space-y-2">
              {docMessages.map((msg) => (
                <div key={msg.id} className="flex items-center gap-3 p-3 bg-[#202c33] rounded-lg">
                  <svg className="w-10 h-10 text-[#00a884]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm4
  18H6V4h7v5h5v11z" />
                  </svg>
                  <div className="flex-1 min-w-0">
                    <p className="text-[#e9edef] text-sm truncate">{msg.media || 'Document'}</p>
                    <p className="text-[#8696a0] text-xs">{msg.date}</p>
                  </div>
                </div>
              ))}
              {docMessages.length === 0 && (
                <p className="text-center text-[#8696a0] py-8">No documents</p>
              )}
            </div>
          )}
        </div>
      </div>
    );                                                                                                      
  }
