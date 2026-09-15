"use client";

import React from "react";
import { Sprout, Wifi, WifiOff, Sparkles, Database, Activity } from "lucide-react";

export default function Header({
  activeTab,
  setActiveTab,
  isChatOpen,
  setIsChatOpen,
  socketConnected,
  unreadCount = 0,
}) {
  const journeyStages = [
    { id: "plan", label: "1. PLAN", desc: "Soil & ML Crop Choice" },
    { id: "grow", label: "2. GROW", desc: "Weather & Advisory" },
    { id: "store", label: "3. STORE", desc: "Warehouses & Cold Chain" },
    { id: "aggregate", label: "4. AGGREGATE", desc: "Farmer Group Pooling" },
    { id: "sell", label: "5. SELL", desc: "Mandi Prices & Buyers" },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab("plan")}>
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-green-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20">
              <Sprout className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-xl tracking-tight text-slate-900">Agri<span className="text-emerald-600">AI</span></span>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wide">
                  Enterprise
                </span>
              </div>
              <p className="text-[11px] text-slate-500 hidden sm:block">Intelligent Agriculture & Farmer Linkage Platform</p>
            </div>
          </div>

          {/* Service Health Indicators */}
          <div className="hidden md:flex items-center space-x-3 text-xs">
            <div className="flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="font-medium">Backend REST</span>
            </div>
            <div className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-full ${socketConnected ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-amber-50 text-amber-700 border border-amber-200"}`}>
              {socketConnected ? <Wifi className="h-3 w-3 text-emerald-600" /> : <WifiOff className="h-3 w-3 text-amber-600" />}
              <span className="font-medium">{socketConnected ? "Socket.IO Live" : "Reconnecting..."}</span>
            </div>
          </div>

          {/* AI Assistant Drawer Toggle */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setIsChatOpen(!isChatOpen)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all shadow-sm ${
                isChatOpen
                  ? "bg-slate-900 text-white shadow-slate-900/20"
                  : "bg-gradient-to-r from-emerald-600 to-green-600 text-white hover:from-emerald-700 hover:to-green-700 shadow-emerald-600/25"
              }`}
            >
              <Sparkles className="h-4 w-4" />
              <span>{isChatOpen ? "Close AI Copilot" : "Ask Agri AI Copilot"}</span>
              {unreadCount > 0 && (
                <span className="bg-white text-emerald-700 text-xs px-1.5 py-0.2 rounded-full font-bold">
                  {unreadCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* 5-Stage Journey Navigation Tabs */}
        <div className="flex space-x-1 overflow-x-auto py-2 border-t border-slate-100 text-sm scrollbar-none">
          {journeyStages.map((stage) => {
            const isActive = activeTab === stage.id;
            return (
              <button
                key={stage.id}
                onClick={() => setActiveTab(stage.id)}
                className={`flex-1 min-w-[140px] px-3 py-2 rounded-lg text-left transition-all ${
                  isActive
                    ? "bg-emerald-50 border border-emerald-300 text-emerald-900 shadow-sm"
                    : "hover:bg-slate-100 text-slate-600"
                }`}
              >
                <div className="font-semibold text-xs text-emerald-700 flex items-center justify-between">
                  <span>{stage.label}</span>
                  {isActive && <span className="h-1.5 w-1.5 rounded-full bg-emerald-600"></span>}
                </div>
                <div className="text-[11px] text-slate-500 truncate">{stage.desc}</div>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
}
