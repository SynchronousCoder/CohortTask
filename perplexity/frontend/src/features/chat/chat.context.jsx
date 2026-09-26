import { createContext, useState } from "react";

export const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  //sidebar chats
  const [chats, setChats] = useState([]);

  // Currently opened chat
  const [chatId, setChatId] = useState(null);

  // Current chat ke messages
  const [messages, setMessages] = useState([]);

  const [user, setUser] = useState(null)

  return (
    <ChatContext.Provider
      value={{
        loading,
        setLoading,
        chats,
        setChats,
        chatId,
        setChatId,
        messages,
        setMessages,
        user,
        setUser
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export default ChatProvider;
