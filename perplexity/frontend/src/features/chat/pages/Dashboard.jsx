import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import useChat from "../hooks/useChat";

const Dashboard = () => {
  const {
    handleSendMessage,
    handleGetMessages,
    handleGetChats,
    handleSelectChat,
    loading,
    chatId,
    messages,
    chats,
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

      <aside className="hidden w-[270px] shrink-0 flex-col border-r border-white/[0.07] bg-[#101014] md:flex">
        {/* Logo */}
        <div className="flex h-[68px] items-center justify-between px-5">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-black">
              <span className="text-lg font-bold">✦</span>
            </div>

            <span className="text-[17px] font-semibold tracking-tight">
              Perplexity
            </span>
          </div>

          <button className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 transition hover:bg-white/[0.06] hover:text-white">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>
        </div>

        {/* New Chat */}
        <div className="px-3 pb-4">
          <button className="flex w-full items-center gap-3 rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-3 text-sm font-medium text-gray-200 transition hover:bg-white/[0.08]">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path d="M12 5v14M5 12h14" />
            </svg>
            New chat
            <span className="ml-auto text-xs text-gray-600">⌘ K</span>
          </button>
        </div>

        {/* Search */}
        <div className="px-3 pb-5">
          <div className="flex items-center gap-3 rounded-xl bg-white/[0.035] px-3 py-2.5 text-gray-500">
            <svg
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-4-4" />
            </svg>

            <span className="text-sm">Search chats</span>

            <span className="ml-auto text-xs text-gray-600">⌘ /</span>
          </div>
        </div>

        {/* Chat History */}
        <div className="flex-1 overflow-y-auto px-3">
          <p className="mb-2 px-2 text-[11px] font-medium uppercase tracking-wider text-gray-600">
            Recent
          </p>

          <div className="space-y-1">
            {chats.map((chat, index) => (
              <button
                onClick={() => {
                  handleSelectChat(chat._id);
                }}
                key={chat._id}
                className={`group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition ${
                  index === 0
                    ? "bg-white/[0.07] text-white"
                    : "text-gray-400 hover:bg-white/[0.045] hover:text-gray-200"
                }`}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  className="shrink-0"
                >
                  <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z" />
                </svg>

                <span className="truncate text-[13px]">{chat.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Bottom User */}
        <div className="border-t border-white/[0.07] p-3">
          <button className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 transition hover:bg-white/[0.05]">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-xs font-semibold">
              AT
            </div>

            <div className="min-w-0 text-left">
              <p className="truncate text-sm font-medium">Aryan</p>

              <p className="text-xs text-gray-500">Free plan</p>
            </div>

            <svg
              className="ml-auto text-gray-500"
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <circle cx="12" cy="12" r="1" />
              <circle cx="19" cy="12" r="1" />
              <circle cx="5" cy="12" r="1" />
            </svg>
          </button>
        </div>
      </aside>

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
