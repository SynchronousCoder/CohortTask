import { useContext, useEffect } from "react";

import { ChatContext } from "../chat.context";

import {
  sendMessage,
  getMessages,
  getChats,
  deleteChat,
} from "../services/chat.api";

import { getMe } from "../../auth/service/auth.api";

const useChat = () => {
  const {
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
  } = useContext(ChatContext);

  /**
   * SEND MESSAGE
   */
  async function handleSendMessage({ message }) {
    try {
      setLoading(true);

      // Show user's message immediately
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          role: "user",
          content: message,
        },
      ]);

      // chatId comes directly from Context
      const data = await sendMessage({
        message,
        chatId,
      });

      const { chat, aiMessage } = data;

      // If this is a NEW chat
      if (!chatId) {
        setChatId(chat._id);

        setChats((prevChats) => [chat, ...prevChats]);
      }

      // Add AI response
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          role: "ai",
          content: aiMessage.content,
        },
      ]);
    } catch (error) {
      console.error("Send message error:", error);
    } finally {
      setLoading(false);
    }
  }

  /**
   * GET MESSAGES OF A PARTICULAR CHAT
   */
  async function handleGetMessages(chatId) {
    try {
      setLoading(true);

      const data = await getMessages(chatId);

      setMessages(data.messages);
    } catch (error) {
      console.error("Get messages error:", error);
    } finally {
      setLoading(false);
    }
  }

  /**
   * GET ALL CHATS
   */
  async function handleGetChats() {
    try {
      setLoading(true);

      const data = await getChats();

      setChats(data.chat);
    } catch (error) {
      console.error("Get chats error:", error);
    } finally {
      setLoading(false);
    }
  }

  /**
   * SELECT A CHAT
   */
  async function handleSelectChat(chatId) {
    setChatId(chatId);

    await handleGetMessages(chatId);
  }

  /**
   * 
   */
  async function handleGetMe() {
    try {
      setLoading(true)
      const data = await getMe()
      setUser(data.user)
      console.log("user data : ", data.user)
    } catch (error) {
      throw error
    }finally{
      setLoading(false)
    }
  }

  /**
   * HANDLE NEW CHAT
   */
  async function handleNewChat() {
    setChatId(null);
    setMessages([]);
  }


  /**
   * LOAD ALL CHATS WHEN DASHBOARD OPENS
   */
  useEffect(() => {
    handleGetChats();
    handleGetMe();
  }, []);


  return {
    handleSendMessage,
    handleGetMessages,
    handleGetChats,
    handleSelectChat,
    handleNewChat,

    loading,
    chatId,
    messages,
    chats,
    user
  };
};

export default useChat;
