import { useState } from "react";
import ReactMarkdown from "react-markdown";

const Sidebar = ({ handleSelectChat, chats, handleNewChat, user }) => {
  const [activeChatId, setActiveChatId] = useState(null);
  const [search, setSearch] = useState("");

  const filteredChats = chats.filter((chat) =>
    chat.title.toLowerCase().includes(search.toLowerCase()),
  );

  return (
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
        <button
          onClick={() => {
            setActiveChatId(null);
            handleNewChat();
          }}
          className="flex w-full items-center gap-3 rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-3 text-sm font-medium text-gray-200 transition hover:bg-white/[0.08]"
        >
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

          <input
            className="w-40"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            type="text"
            placeholder="Search Chat"
          />
          <span className="ml-auto text-xs text-gray-600">⌘ /</span>
        </div>
      </div>

      {/* Chat History */}
      <div className="flex-1 overflow-y-auto px-3">
        <p className="mb-2 px-2 text-[11px] font-medium uppercase tracking-wider text-gray-600">
          Recent
        </p>

        <div className="space-y-1">
          {filteredChats.length === 0 ? (
            <p className="px-2 py-2 text-[13px] text-gray-600">
              No chats found
            </p>
          ) : (
            filteredChats.map((chat) => {
              const isActive = activeChatId === chat._id;

              return (
                <button
                  key={chat._id}
                  onClick={() => {
                    setActiveChatId(chat._id);
                    handleSelectChat(chat._id);
                    console.log("wa", user)
                  }}
                  className={`group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition ${
                    isActive
                      ? "bg-white/[0.07] text-white"
                      : "text-gray-500 hover:bg-white/[0.045] hover:text-gray-200"
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

                  <span className="truncate text-[13px]">
                    <ReactMarkdown>{chat.title}</ReactMarkdown>
                  </span>
                </button>
              );
            })
          )}
        </div>
      </div>

      {/* Bottom User */}
      <div className="border-t border-white/[0.07] p-3">
        <button className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 transition hover:bg-white/[0.05]">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-xs font-semibold">
            AT
          </div>

          <div className="min-w-0 text-left">
            <p className="truncate text-sm font-medium">{user.username}</p>
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
  );
};

export default Sidebar;