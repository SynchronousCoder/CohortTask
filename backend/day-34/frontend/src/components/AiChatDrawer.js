"use client";

import React, { useState, useEffect, useRef } from "react";
import { Send, Bot, User, Sparkles, RefreshCw, X, ArrowRight, ShieldCheck } from "lucide-react";
import { getSocket } from "../lib/socket";

export default function AiChatDrawer({ isOpen, onClose, farmerLocation = "Karnal, Haryana" }) {
  const [messages, setMessages] = useState([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Namaste Farmer! 🙏 I am your **AgriAI Assistant**.\n\nI can help you across your entire farming lifecycle:\n* 🌤️ **Weather & Forecast** (Open-Meteo live advisory)\n* 🌱 **ML Crop Recommendations & Yield Range** (based on N-P-K, pH & rainfall)\n* 🏭 **Storage Facilities** (cold storages & warehouses)\n* 🤝 **Produce Aggregation** (pool with farmer groups to meet bulk buyer minimums)\n* 💰 **APMC Mandi Prices & Direct Buyer Linkage**\n\nHow can I support your farm today?",
      timestamp: new Date().toISOString(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [agentStatus, setAgentStatus] = useState({ stage: "idle", label: "Ready" });
  const messagesEndRef = useRef(null);

  const quickPrompts = [
    "What is the current weather and 7-day rain forecast in Karnal?",
    "Recommend the best crop for soil with N:110, P:55, K:40, pH:6.8 and 80mm rain.",
    "What is the current modal mandi price of Wheat and Paddy in Karnal?",
    "Where can I find cold storage in Karnal for 15 tonnes of potatoes?",
    "I have 5 tonnes of wheat. Can I join an aggregation pool to reach bulk buyer minimums?",
  ];

  useEffect(() => {
    const socket = getSocket();

    const onStatus = (status) => {
      setAgentStatus(status);
    };

    const onReply = (reply) => {
      setMessages((prev) => [...prev, reply]);
      setAgentStatus({ stage: "idle", label: "Ready" });
    };

    const onError = (err) => {
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          role: "assistant",
          content: `⚠️ **Notice**: ${err.message || "Could not complete the request. Please try again."}`,
          timestamp: new Date().toISOString(),
        },
      ]);
      setAgentStatus({ stage: "idle", label: "Ready" });
    };

    socket.on("agent:status", onStatus);
    socket.on("agent:reply", onReply);
    socket.on("agent:error", onError);

    return () => {
      socket.off("agent:status", onStatus);
      socket.off("agent:reply", onReply);
      socket.off("agent:error", onError);
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, agentStatus]);

  const handleSendMessage = (textToSend) => {
    const query = (textToSend || inputValue).trim();
    if (!query) return;

    const userMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: query,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");

    const socket = getSocket();
    setAgentStatus({ stage: "thinking", label: "Contacting Gemini Agent..." });

    socket.emit("chat:message", {
      message: query,
      location: farmerLocation,
      context: { source: "web-dashboard" },
    });
  };

  const handleClearChat = () => {
    const socket = getSocket();
    socket.emit("chat:clear");
    setMessages([
      {
        id: "cleared-welcome",
        role: "assistant",
        content: "Conversation cleared. How can I assist you with your farming plans today?",
        timestamp: new Date().toISOString(),
      },
    ]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[480px] lg:w-[520px] bg-white shadow-2xl border-l border-slate-200 flex flex-col transition-all duration-300">
      {/* Header */}
      <div className="px-5 py-4 border-b border-slate-200 bg-slate-900 text-white flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="h-9 w-9 rounded-xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-400">
            <Bot className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="font-semibold text-sm">AgriAI Conversational Copilot</h3>
              <span className="bg-emerald-500/20 text-emerald-300 text-[10px] px-2 py-0.5 rounded-full border border-emerald-500/30 font-medium">
                Gemini 3.5 + Tools
              </span>
            </div>
            <p className="text-[11px] text-slate-400">Context: {farmerLocation}</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handleClearChat}
            title="Clear conversation"
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <RefreshCw className="h-4 w-4" />
          </button>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Messages List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/70">
        {messages.map((msg) => {
          const isUser = msg.role === "user";
          return (
            <div
              key={msg.id}
              className={`flex items-start space-x-2.5 ${isUser ? "flex-row-reverse space-x-reverse" : "flex-row"}`}
            >
              <div
                className={`h-7 w-7 rounded-lg flex items-center justify-center text-xs flex-shrink-0 mt-1 shadow-sm ${
                  isUser ? "bg-emerald-600 text-white" : "bg-slate-900 text-emerald-400"
                }`}
              >
                {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
              </div>

              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 text-xs leading-relaxed shadow-sm whitespace-pre-wrap ${
                  isUser
                    ? "bg-emerald-600 text-white rounded-tr-none font-medium"
                    : "bg-white border border-slate-200 text-slate-800 rounded-tl-none prose-sm"
                }`}
              >
                {msg.content}
              </div>
            </div>
          );
        })}

        {/* Live Status Indicator */}
        {agentStatus.stage !== "idle" && (
          <div className="flex items-center space-x-2.5 text-xs text-slate-500 bg-white border border-slate-200 rounded-xl px-4 py-2.5 shadow-sm animate-pulse">
            <Sparkles className="h-4 w-4 text-emerald-600 animate-spin" />
            <span className="font-medium text-slate-700">{agentStatus.label}</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Prompt Chips */}
      <div className="px-4 py-2 bg-white border-t border-slate-100 overflow-x-auto flex space-x-2 scrollbar-none">
        {quickPrompts.map((prompt, i) => (
          <button
            key={i}
            onClick={() => handleSendMessage(prompt)}
            disabled={agentStatus.stage !== "idle"}
            className="flex-shrink-0 text-[11px] bg-slate-100 hover:bg-emerald-50 hover:text-emerald-800 text-slate-600 px-3 py-1.5 rounded-full border border-slate-200 transition text-left"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Input Form */}
      <div className="p-3 bg-white border-t border-slate-200">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center space-x-2"
        >
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask about weather, crops, yield, storage, mandi rates..."
            disabled={agentStatus.stage !== "idle"}
            className="flex-1 bg-slate-100 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition"
          />
          <button
            type="submit"
            disabled={!inputValue.trim() || agentStatus.stage !== "idle"}
            className="h-10 w-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center hover:bg-emerald-700 disabled:opacity-40 disabled:cursor-not-allowed transition shadow-sm shadow-emerald-600/20 flex-shrink-0"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
        <div className="flex items-center justify-between mt-2 text-[10px] text-slate-400 px-1">
          <span>Powered by Open-Meteo, NASA POWER, APMC & Precision ML</span>
          <span className="flex items-center text-emerald-600">
            <ShieldCheck className="h-3 w-3 mr-0.5" /> Factual Data Guaranteed
          </span>
        </div>
      </div>
    </div>
  );
}
