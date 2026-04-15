"use client";

import { useState } from "react";
import { Sidebar } from "@/components/sidebar";
import { EnergyDashboard } from "@/components/energy-dashboard";
import { Zap } from "lucide-react";
import { config } from "@/lib/config";

export default function ChatLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-white">
      {/* Mobile backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/50 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed inset-y-0 left-0 z-30 w-64 transform transition-transform duration-200 ease-in-out
          md:relative md:translate-x-0 md:flex md:flex-shrink-0
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <Sidebar onClose={() => setSidebarOpen(false)} />
      </div>

      {/* Main */}
      <main className="flex-1 overflow-hidden flex flex-col relative">
        {/* Mobile top fade + floating pill */}
        <div className="md:hidden fixed top-0 left-0 right-0 z-10 pointer-events-none">
          {/* Gradient fade — content gently fades into the top */}
          <div className="h-14 bg-gradient-to-b from-white via-white/80 to-transparent" />
          {/* Pill — sits on top of the gradient, left-aligned */}
          <div className="absolute top-2.5 left-3 pointer-events-auto flex items-center gap-1.5 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-full shadow-sm px-3 py-1.5">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-0.5 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Open menu"
            >
              <svg className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <span className="font-semibold text-xs text-gray-800">AI Energy Chat</span>
            {config.showEnergyDashboard && (
              <button
                onClick={() => setShowDashboard(true)}
                className="p-1 rounded-full hover:bg-amber-50 transition-colors"
                aria-label="Energy usage"
              >
                <Zap className="w-3.5 h-3.5 text-amber-500" />
              </button>
            )}
          </div>
        </div>

        <div className="flex-1 overflow-hidden">
          {children}
        </div>
      </main>

      {showDashboard && <EnergyDashboard onClose={() => setShowDashboard(false)} />}
    </div>
  );
}
