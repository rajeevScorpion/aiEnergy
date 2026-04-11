"use client";

import { useEffect, useState } from "react";
import { X, Zap } from "lucide-react";
import { formatEnergy } from "@/lib/config";

interface EnergyDashboardProps {
  onClose: () => void;
}

export function EnergyDashboard({ onClose }: EnergyDashboardProps) {
  const [data, setData] = useState<{ totalEnergy: number; todayEnergy: number } | null>(null);

  useEffect(() => {
    fetch("/api/dashboard")
      .then((r) => r.json())
      .then(setData);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60" onClick={onClose}>
      <div
        className="bg-white rounded-xl shadow-xl p-6 w-80 text-gray-900"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-500" />
            <h2 className="font-semibold text-base">Your Energy Usage</h2>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        {data == null ? (
          <p className="text-sm text-gray-500">Loading...</p>
        ) : (
          <div className="space-y-3">
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <p className="text-xs text-amber-700 mb-0.5">Today</p>
              <p className="text-xl font-semibold text-amber-900">{formatEnergy(data.todayEnergy, "numeric")}</p>
              <p className="text-xs text-amber-600 mt-0.5">{formatEnergy(data.todayEnergy, "equivalent")}</p>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <p className="text-xs text-gray-500 mb-0.5">All time</p>
              <p className="text-xl font-semibold text-gray-800">{formatEnergy(data.totalEnergy, "numeric")}</p>
              <p className="text-xs text-gray-500 mt-0.5">{formatEnergy(data.totalEnergy, "equivalent")}</p>
            </div>
            <p className="text-xs text-gray-400 text-center">
              Energy is estimated based on token usage
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
