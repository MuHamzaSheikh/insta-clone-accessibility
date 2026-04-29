/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from 'react';

const MessagesContext = createContext();

export const MessagesProvider = ({ children }) => {
  const [conversations, setConversations] = useState([
    {
      id: 1,
      user: 'Sarah_Travels',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
      lastMessage: 'That photo was amazing!',
      timestamp: new Date(Date.now() - 3600000),
      unread: false,
      messages: [
        { id: 1, sender: 'Sarah_Travels', text: 'Hey! Love your feed', timestamp: new Date(Date.now() - 7200000) },
        { id: 2, sender: 'You', text: 'Thanks so much!', timestamp: new Date(Date.now() - 7000000) },
        { id: 3, sender: 'Sarah_Travels', text: 'That photo was amazing!', timestamp: new Date(Date.now() - 3600000) },
      ],
    },
    {
      id: 2,
      user: 'Chef_Marcus',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
      lastMessage: 'Can you share the recipe?',
      timestamp: new Date(Date.now() - 1800000),
      unread: true,
      messages: [
        { id: 1, sender: 'Chef_Marcus', text: 'Your last post was incredible', timestamp: new Date(Date.now() - 2000000) },
        { id: 2, sender: 'Chef_Marcus', text: 'Can you share the recipe?', timestamp: new Date(Date.now() - 1800000) },
      ],
    },
    {
      id: 3,
      user: 'Urban_Photographer',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
      lastMessage: 'Collaboration opportunity!',
      timestamp: new Date(Date.now() - 86400000),
      unread: false,
      messages: [
        { id: 1, sender: 'Urban_Photographer', text: 'Hey there!', timestamp: new Date(Date.now() - 86400000) },
        { id: 2, sender: 'Urban_Photographer', text: 'Collaboration opportunity!', timestamp: new Date(Date.now() - 86400000) },
      ],
    },
  ]);

  const [selectedConversation, setSelectedConversation] = useState(null);

  const sendMessage = (conversationId, messageText) => {
    const now = new Date();
    setConversations(prevConversations =>
      prevConversations.map(conv => {
        if (conv.id === conversationId) {
          return {
            ...conv,
            messages: [...conv.messages, { id: conv.messages.length + 1, sender: 'You', text: messageText, timestamp: now }],
            lastMessage: messageText,
            timestamp: now,
          };
        }
        return conv;
      })
    );
  };

  const startNewConversation = (user, avatar) => {
    const newConversation = {
      id: conversations.length + 1,
      user,
      avatar,
      lastMessage: '',
      timestamp: new Date(),
      unread: false,
      messages: [],
    };
    setConversations([newConversation, ...conversations]);
    setSelectedConversation(newConversation.id);
    return newConversation.id;
  };

  const markAsRead = (conversationId) => {
    setConversations(prevConversations =>
      prevConversations.map(conv => {
        if (conv.id === conversationId) {
          return { ...conv, unread: false };
        }
        return conv;
      })
    );
  };

  return (
    <MessagesContext.Provider value={{
      conversations,
      selectedConversation,
      setSelectedConversation,
      sendMessage,
      startNewConversation,
      markAsRead,
    }}>
      {children}
    </MessagesContext.Provider>
  );
};

export const useMessages = () => useContext(MessagesContext);
