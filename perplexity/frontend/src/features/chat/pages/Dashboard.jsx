import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import useChat from "../hooks/useChat";
import Sidebar from "../components/Sidebar";

const Dashboard = () => {
  const {
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
  } = useChat();

  console.log("ok: ", chats);

  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!input.trim()) return;

    handleSendMessage({
      message: input,
    });

    console.log("Message:", input);

    setInput("");
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#0b0b0f] text-white">
      {/* =====================================================
          SIDEBAR
      ====================================================== */}

        <Sidebar handleSelectChat={handleSelectChat} chats={chats} handleNewChat={handleNewChat} user={user} />

      {/* =====================================================
          MAIN CONTENT
      ====================================================== */}

      <main className="relative flex min-w-0 flex-1 flex-col">
        {/* Top Bar */}
        <header className="flex h-[68px] shrink-0 items-center justify-between border-b border-white/[0.06] px-4 md:px-7">
          <div className="flex items-center gap-3">
            {/* Mobile menu */}
            <button className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-400 hover:bg-white/[0.06] md:hidden">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            <span className="text-sm font-medium text-gray-300">
              Learning JavaScript
            </span>

            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="text-gray-600"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>

            <span className="hidden text-sm text-gray-600 sm:block">Chat</span>
          </div>

          <div className="flex items-center gap-2">
            <button className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition hover:bg-white/[0.06] hover:text-white">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path d="M12 3v18M3 12h18" />
                <path d="m19 5-14 14" />
              </svg>
            </button>

            <button className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition hover:bg-white/[0.06] hover:text-white">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 7-3 9h18c0-2-3-2-3-9" />
                <path d="M10 21h4" />
              </svg>
            </button>
          </div>
        </header>

        {/* =====================================================
            CHAT AREA
        ====================================================== */}

        <div className="chat-area flex-1 overflow-y-auto">
          <div className="mx-auto w-full max-w-3xl px-5 py-10 md:px-8 md:py-14">
            <div className="space-y-10">
              {messages.map((message) => (
                <div
                  key={message._id}
                  className={
                    message.role === "user"
                      ? "flex justify-end"
                      : "flex items-start gap-4"
                  }
                >
                  {/* AI Avatar */}
                  {message.role === "ai" && (
                    <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-black">
                      <span className="text-sm">✦</span>
                    </div>
                  )}

                  {/* Message */}
                  {message.role === "user" ? (
                    <div className="max-w-[80%] rounded-2xl bg-white/[0.08] px-5 py-3.5 text-[15px] leading-7 text-gray-100">
                      {message.content}
                    </div>
                  ) : (
                    <div className="max-w-[90%] text-[15px] leading-7 text-gray-300">
                      <div className="space-y-2">
                        <ReactMarkdown>{message.content}</ReactMarkdown>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* =====================================================
            MESSAGE COMPOSER
        ====================================================== */}

        <div className="w-full px-4 pb-5 md:px-6 md:pb-7">
          <div className="mx-auto max-w-3xl">
            <form
              onSubmit={handleSubmit}
              className="relative overflow-hidden rounded-2xl border border-white/[0.1] bg-[#151519] shadow-2xl shadow-black/20 transition focus-within:border-white/[0.18]"
            >
              {/* Input */}
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(e);
                  }
                }}
                rows={3}
                placeholder="Ask anything..."
                className="w-full resize-none bg-transparent px-5 pt-4 pb-14 text-[15px] leading-6 text-white outline-none placeholder:text-gray-600"
              />

              {/* Bottom controls */}
              <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between">
                <div className="flex items-center gap-1">
                  {/* Attachment */}
                  <button
                    type="button"
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition hover:bg-white/[0.07] hover:text-gray-200"
                  >
                    <svg
                      width="19"
                      height="19"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.7"
                    >
                      <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
                    </svg>
                  </button>

                  {/* Search */}
                  <button
                    type="button"
                    className="flex h-9 items-center gap-2 rounded-lg px-3 text-xs text-gray-500 transition hover:bg-white/[0.07] hover:text-gray-200"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.7"
                    >
                      <circle cx="11" cy="11" r="7" />
                      <path d="m20 20-4-4" />
                    </svg>
                    Search
                  </button>
                </div>

                {/* Send */}
                <button
                  type="submit"
                  disabled={!input.trim() || loading}
                  className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-black transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:bg-white/[0.08] disabled:text-gray-600"
                >
                  <svg
                    width="17"
                    height="17"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="m12 19 7-7-7-7" />
                    <path d="M5 12h14" />
                  </svg>
                </button>
              </div>
            </form>

            <p className="mt-2 text-center text-[11px] text-gray-700">
              AI can make mistakes. Check important information.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;