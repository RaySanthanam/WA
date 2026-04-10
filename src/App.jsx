import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import ChatView from './components/ChatView';
import SettingsPanel from './components/SettingsPanel';
import ProfilePanel from './components/ProfilePanel';
import Lightbox from './components/Lightbox';
import WelcomeScreen from './components/WelcomeScreen';
import { parseWhatsAppChat } from './utils/parseWhatsApp';

// Configuration - Update these values for your chat
const CONFIG = {
  yourName: 'You',
  yourAvatar: null, // Optional: path to your avatar image
};

export default function App() {
  const [chats, setChats] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lightboxImage, setLightboxImage] = useState(null);
  const [sidebarView, setSidebarView] = useState('chats'); // 'chats' | 'settings' | 'profile'
  const [showMobileChat, setShowMobileChat] = useState(false);

  // Load and parse chat data
  useEffect(() => {
    async function loadChats() {
      try {
        // Load chat list from index file
        const indexResponse = await fetch('/data/chats.json');

        if (indexResponse.ok) {
          // Multiple chats mode
          const chatIndex = await indexResponse.json();
          const loadedChats = [];

          for (const chatInfo of chatIndex.chats) {
            try {
              const response = await fetch(`/data/${chatInfo.file}`);
              if (response.ok) {
                const text = await response.text();
                const messages = parseWhatsAppChat(text, CONFIG.yourName);
                if (messages.length > 0) {
                  const otherPerson = messages.find(m => !m.isOutgoing);
                  loadedChats.push({
                    id: chatInfo.id || chatInfo.file,
                    name: chatInfo.name || (otherPerson ? otherPerson.sender : 'Unknown'),
                    avatar: chatInfo.avatar || null,
                    messages,
                    lastMessage: messages[messages.length - 1],
                    unread: 0,
                  });
                }
              }
            } catch (e) {
              console.warn(`Failed to load chat: ${chatInfo.file}`);
            }
          }

          setChats(loadedChats);
          if (loadedChats.length > 0) {
            setActiveChat(loadedChats[0]);
          }
        } else {
          // Fallback: single chat mode
          const response = await fetch('/data/_chat.txt');
          if (!response.ok) {
            throw new Error('No chat data found');
          }
          const text = await response.text();
          const messages = parseWhatsAppChat(text, CONFIG.yourName);

          if (messages.length === 0) {
            throw new Error('No messages found in chat file');
          }

          const otherPerson = messages.find(m => !m.isOutgoing);
          const chat = {
            id: 'main',
            name: otherPerson ? otherPerson.sender : 'Chat',
            avatar: null,
            messages,
            lastMessage: messages[messages.length - 1],
            unread: 0,
          };

          setChats([chat]);
          setActiveChat(chat);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadChats();
  }, []);

  const handleChatSelect = (chat) => {
    setActiveChat(chat);
    setShowMobileChat(true);
  };

  const handleBackToList = () => {
    setShowMobileChat(false);
  };

  // Loading state
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#111b21]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full animate-spin mx-auto mb-4" />
          <p className="text-white/80">Loading WhatsApp...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#111b21] p-4">
        <div className="bg-white rounded-lg p-6 max-w-md text-center shadow-xl">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Setup Required</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <div className="bg-gray-50 rounded-lg p-4 text-left text-sm text-gray-700">
            <p className="font-medium mb-2">Add your chat data:</p>
            <ol className="list-decimal list-inside space-y-1">
              <li>Add <code className="bg-gray-200 px-1 rounded">_chat.txt</code> to <code className="bg-gray-200 px-1 rounded">public/data/</code></li>
              <li>Add media to <code className="bg-gray-200 px-1 rounded">public/data/media/</code></li>
              <li>Update <code className="bg-gray-200 px-1 rounded">CONFIG.yourName</code> in App.jsx</li>
            </ol>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-[#111b21] overflow-hidden">
      {/* Top colored bar */}
      <div className="h-[127px] bg-[#00a884] absolute top-0 left-0 right-0" />

      {/* Main container */}
      <div className="relative flex-1 flex justify-center pt-[19px] pb-[19px] px-[19px] min-h-0">
        <div className="flex w-full max-w-[1600px] h-full bg-[#111b21] shadow-2xl overflow-hidden">

          {/* Sidebar */}
          <div className={`
            w-full md:w-[400px] lg:w-[440px] flex-shrink-0 flex flex-col border-r border-[#222d34] overflow-hidden
            ${showMobileChat ? 'hidden md:flex' : 'flex'}
          `}>
            {sidebarView === 'chats' && (
              <Sidebar
                chats={chats}
                activeChat={activeChat}
                onChatSelect={handleChatSelect}
                onSettingsClick={() => setSidebarView('settings')}
                onProfileClick={() => setSidebarView('profile')}
                yourName={CONFIG.yourName}
                yourAvatar={CONFIG.yourAvatar}
              />
            )}
            {sidebarView === 'settings' && (
              <SettingsPanel
                onBack={() => setSidebarView('chats')}
                yourAvatar={CONFIG.yourAvatar}
                yourName={CONFIG.yourName}
              />
            )}
            {sidebarView === 'profile' && (
              <ProfilePanel
                onBack={() => setSidebarView('chats')}
                yourName={CONFIG.yourName}
                yourAvatar={CONFIG.yourAvatar}
              />
            )}
          </div>

          {/* Chat View */}
          <div className={`
            flex-1 flex flex-col min-h-0 min-w-0 overflow-hidden
            ${!showMobileChat ? 'hidden md:flex' : 'flex'}
          `}>
            {activeChat ? (
              <ChatView
                chat={activeChat}
                onImageClick={setLightboxImage}
                onBack={handleBackToList}
              />
            ) : (
              <WelcomeScreen />
            )}
          </div>
        </div>
      </div>

      {/* Image lightbox */}
      {lightboxImage && (
        <Lightbox
          imageSrc={lightboxImage}
          onClose={() => setLightboxImage(null)}
        />
      )}
    </div>
  );
}
