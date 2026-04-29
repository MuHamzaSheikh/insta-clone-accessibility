import { useState } from 'react';
import { useMessages } from '../context/MessagesContext';
import { useA11y } from '../context/AccessibilityContext';
import MessageChat from './MessageChat';

function SearchIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5" aria-hidden="true">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  );
}

export default function MessagesPage() {
  const { conversations, selectedConversation, setSelectedConversation, markAsRead } = useMessages();
  const { highContrast, announce } = useA11y();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredConversations = conversations.filter(conv =>
    conv.user.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleConversationSelect = (id) => {
    setSelectedConversation(id);
    markAsRead(id);
    announce(`Selected conversation with ${conversations.find(c => c.id === id)?.user}`);
  };

  if (selectedConversation) {
    return <MessageChat conversationId={selectedConversation} />;
  }

  return (
    <div className={`flex flex-col h-screen ${highContrast ? 'bg-black' : 'bg-white'}`}>
      {/* Header */}
      <header className={`sticky top-0 z-10 border-b ${highContrast ? 'border-white bg-black' : 'border-zinc-200 bg-white'} px-4 py-4`}>
        <div className="flex items-center justify-between mb-4">
          <h1 className={`text-2xl font-bold ${highContrast ? 'text-white' : 'text-black'}`}>
            Messages
          </h1>
        </div>

        {/* Search */}
        <div className={`flex items-center rounded-full px-3 py-2 ${highContrast ? 'bg-zinc-800' : 'bg-zinc-100'}`}>
          <SearchIcon />
          <input
            type="text"
            placeholder="Search conversations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`ml-2 flex-1 bg-transparent outline-none text-sm ${highContrast ? 'text-white placeholder-zinc-400' : 'text-black placeholder-zinc-500'}`}
            aria-label="Search messages"
          />
        </div>
      </header>

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto">
        {filteredConversations.length === 0 ? (
          <div className={`flex items-center justify-center h-full ${highContrast ? 'text-zinc-400' : 'text-zinc-500'}`}>
            <p>No conversations found</p>
          </div>
        ) : (
          filteredConversations.map(conversation => (
            <button
              key={conversation.id}
              onClick={() => handleConversationSelect(conversation.id)}
              className={`w-full px-4 py-3 flex items-center gap-3 border-b transition ${
                highContrast
                  ? 'border-zinc-800 hover:bg-zinc-900'
                  : 'border-zinc-100 hover:bg-zinc-50'
              }`}
              aria-label={`Message from ${conversation.user}${conversation.unread ? ', unread' : ''}`}
            >
              {/* Avatar */}
              <div className="flex-shrink-0">
                <div className="rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 p-[2px]">
                  <img
                    src={conversation.avatar}
                    alt={conversation.user}
                    className="h-12 w-12 rounded-full border-2 border-white dark:border-black object-cover"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h3 className={`font-semibold ${highContrast ? 'text-white' : 'text-black'}`}>
                    {conversation.user}
                  </h3>
                  <span className={`text-xs ${highContrast ? 'text-zinc-400' : 'text-zinc-500'}`}>
                    {conversation.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <p className={`text-sm truncate ${
                  conversation.unread
                    ? highContrast ? 'text-white font-semibold' : 'text-black font-semibold'
                    : highContrast ? 'text-zinc-400' : 'text-zinc-500'
                }`}>
                  {conversation.lastMessage || 'No messages yet'}
                </p>
              </div>

              {/* Unread indicator */}
              {conversation.unread && (
                <div className="w-3 h-3 rounded-full bg-pink-500 flex-shrink-0" aria-label="unread" />
              )}
            </button>
          ))
        )}
      </div>
    </div>
  );
}
