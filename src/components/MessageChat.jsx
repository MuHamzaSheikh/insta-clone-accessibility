import { useState, useRef, useEffect } from 'react';
import { useMessages } from '../context/MessagesContext';
import { useA11y } from '../context/AccessibilityContext';

function BackIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6" aria-hidden="true">
      <path d="M15 18l-6-6 6-6" />
    </svg>
  );
}

function CallIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6" aria-hidden="true">
      <path d="M17.92 7.02A5.98 5.98 0 0019 6.51a6 6 0 1-8.49 8.49m5.64-5.64a2 2 0 10-2.83 2.83m2.83-2.83l1.41 1.41M9 11a3 3 0 11-6 0 3 3 0 016 0zm8 0a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

function VideoCallIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6" aria-hidden="true">
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14l4 4v12z" />
    </svg>
  );
}

function InfoIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4M12 8h.01" />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
      <path d="M16.6915026,12.4744748 L3.50612381,13.2599618 C3.19218622,13.2599618 3.03521743,13.4170592 3.03521743,13.5741566 L1.15159189,20.0151496 C0.8376543,20.8006365 0.99,21.89 1.77946707,22.52 C2.41,22.99 3.50612381,23.1 4.13399899,22.8429026 L21.714504,14.0454487 C22.6563168,13.5741566 23.1272231,12.6315722 22.9702544,11.6889879 L4.13399899,1.16346707 C3.34915502,0.9 2.40734225,1.00636533 1.77946707,1.4776575 C0.994623095,2.10604706 0.837654326,3.0486314 1.15159189,3.99221575 L3.03521743,10.4331088 C3.03521743,10.5902061 3.19218622,10.7473035 3.50612381,10.7473035 L16.6915026,11.5327903 C16.6915026,11.5327903 17.1624089,11.5327903 17.1624089,12.0040825 C17.1624089,12.4753747 16.6915026,12.4744748 16.6915026,12.4744748 Z" />
    </svg>
  );
}

export default function MessageChat({ conversationId }) {
  const { conversations, selectedConversation, setSelectedConversation, sendMessage } = useMessages();
  const { highContrast, announce } = useA11y();
  const [messageText, setMessageText] = useState('');
  const messagesEndRef = useRef(null);

  const conversation = conversations.find(c => c.id === conversationId);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversation?.messages]);

  const handleSendMessage = () => {
    if (messageText.trim()) {
      sendMessage(conversationId, messageText);
      announce(`Message sent to ${conversation.user}`);
      setMessageText('');
    }
  };

  const handleBackClick = () => {
    setSelectedConversation(null);
    announce('Back to messages list');
  };

  if (!conversation) {
    return <div>Conversation not found</div>;
  }

  return (
    <div className={`flex flex-col h-screen ${highContrast ? 'bg-black' : 'bg-white'}`}>
      {/* Header */}
      <header className={`sticky top-0 z-10 border-b ${highContrast ? 'border-white bg-black' : 'border-zinc-200 bg-white'} px-4 py-3`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={handleBackClick}
              className={`rounded-lg p-1 ${highContrast ? 'text-white hover:bg-zinc-800' : 'text-black hover:bg-zinc-100'}`}
              aria-label="Back to messages"
            >
              <BackIcon />
            </button>
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 p-[2px]">
                <img
                  src={conversation.avatar}
                  alt={conversation.user}
                  className="h-10 w-10 rounded-full border-2 border-white dark:border-black object-cover"
                />
              </div>
              <div>
                <h2 className={`font-semibold ${highContrast ? 'text-white' : 'text-black'}`}>
                  {conversation.user}
                </h2>
                <p className={`text-xs ${highContrast ? 'text-zinc-400' : 'text-zinc-500'}`}>
                  Online
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              className={`rounded-lg p-1 ${highContrast ? 'text-white hover:bg-zinc-800' : 'text-black hover:bg-zinc-100'}`}
              aria-label="Voice call"
            >
              <CallIcon />
            </button>
            <button
              className={`rounded-lg p-1 ${highContrast ? 'text-white hover:bg-zinc-800' : 'text-black hover:bg-zinc-100'}`}
              aria-label="Video call"
            >
              <VideoCallIcon />
            </button>
            <button
              className={`rounded-lg p-1 ${highContrast ? 'text-white hover:bg-zinc-800' : 'text-black hover:bg-zinc-100'}`}
              aria-label="Conversation info"
            >
              <InfoIcon />
            </button>
          </div>
        </div>
      </header>

      {/* Messages */}
      <div className={`flex-1 overflow-y-auto px-4 py-4 space-y-4 ${highContrast ? 'bg-black' : 'bg-white'}`}>
        {conversation.messages.map(message => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'You' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs rounded-2xl px-4 py-2 ${
                message.sender === 'You'
                  ? 'bg-pink-500 text-white'
                  : highContrast
                    ? 'bg-zinc-800 text-white'
                    : 'bg-zinc-100 text-black'
              }`}
            >
              <p className="text-sm break-words">{message.text}</p>
              <p className={`text-xs mt-1 ${
                message.sender === 'You'
                  ? 'text-pink-100'
                  : highContrast
                    ? 'text-zinc-400'
                    : 'text-zinc-500'
              }`}>
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className={`border-t ${highContrast ? 'border-white bg-black' : 'border-zinc-200 bg-white'} px-4 py-3`}>
        <div className="flex items-center gap-3">
          <input
            type="text"
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Aa"
            className={`flex-1 rounded-full px-4 py-2 outline-none text-sm ${
              highContrast
                ? 'bg-zinc-800 text-white placeholder-zinc-400'
                : 'bg-zinc-100 text-black placeholder-zinc-500'
            }`}
            aria-label="Message input"
          />
          <button
            onClick={handleSendMessage}
            disabled={!messageText.trim()}
            className={`rounded-full p-2 transition ${
              messageText.trim()
                ? 'text-pink-500 hover:bg-pink-50 dark:hover:bg-zinc-800'
                : highContrast
                  ? 'text-zinc-600 cursor-not-allowed'
                  : 'text-zinc-300 cursor-not-allowed'
            }`}
            aria-label="Send message"
          >
            <SendIcon />
          </button>
        </div>
      </div>
    </div>
  );
}
