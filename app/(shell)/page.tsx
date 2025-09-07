"use client";

import { useEffect, useState } from "react";
import { useDrinkStore } from "@/src/stores/drinkStore";
import { MOOD_LABELS } from "@/src/types";
import { ToastCheers } from "@/src/components/ToastCheers";
import { MoodSheet } from "@/src/components/MoodSheet";
import { trackCheers, trackMood } from "@/src/lib/analytics";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  const {
    todayCount,
    currentMood,
    startPersonalSession,
    incrementDrink,
    setMood,
  } = useDrinkStore();

  const [isMoodSheetOpen, setIsMoodSheetOpen] = useState(false);

  useEffect(() => {
    startPersonalSession();
  }, [startPersonalSession]);

  const handleCheers = () => {
    incrementDrink();
    trackCheers({ location: "home", count: todayCount + 1 });

    // Show mood selection sheet
    setIsMoodSheetOpen(true);
  };

  const handleMoodSelect = (
    selectedMood: Exclude<typeof currentMood, "none">
  ) => {
    setMood(selectedMood);
    trackMood({ mood: selectedMood, location: "home" });
  };

  const handleMoodSkip = () => {
    // Keep current mood, just close the sheet
    console.log("Mood selection skipped");
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-amber-400 via-orange-400 to-yellow-400 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-8 w-4 h-4 bg-white rounded-full animate-bounce"></div>
        <div className="absolute top-32 right-12 w-3 h-3 bg-white rounded-full animate-bounce delay-100"></div>
        <div className="absolute top-48 left-16 w-2 h-2 bg-white rounded-full animate-bounce delay-200"></div>
        <div className="absolute bottom-32 right-8 w-5 h-5 bg-white rounded-full animate-bounce delay-300"></div>
      </div>

      <div className="min-h-screen flex flex-col px-4 py-8">
        {/* Main Cheers Button - Taking center stage */}
        <div className="flex-1 flex flex-col justify-center items-center">
          <div className="text-center mb-12">
            <h1 className="text-6xl font-extrabold text-white mb-4 drop-shadow-2xl tracking-tight">
              🍻
            </h1>
            <h2 className="text-2xl font-bold text-white/95 mb-8 drop-shadow-lg">
              今日も乾杯！
            </h2>
            
            {/* Hero Cheers Button - Color Options */}
            <div className="mb-16 space-y-4">
              {/* パープル系（現在） */}
              <ToastCheers
                onCheers={handleCheers}
                label="🍻 KANPAI!"
                className="w-80 h-20 text-xl font-extrabold shadow-2xl"
              />
              
              {/* レッド系 */}
              <div className="relative">
                <button
                  onClick={handleCheers}
                  className="relative w-80 h-20 text-white font-black rounded-3xl text-xl tracking-wide bg-gradient-to-br from-red-500 via-rose-600 to-pink-600 shadow-2xl shadow-red-500/50 border-2 border-white/30 hover:scale-105 transition-transform duration-200"
                  style={{
                    background: "linear-gradient(135deg, #EF4444 0%, #E11D48 30%, #DB2777 70%, #BE185D 100%)",
                    boxShadow: "0 25px 50px rgba(239, 68, 68, 0.5), 0 0 0 2px rgba(255, 255, 255, 0.2), inset 0 2px 0 rgba(255, 255, 255, 0.4)"
                  }}
                >
                  <span className="font-black text-white" style={{textShadow: "0 3px 6px rgba(0, 0, 0, 0.6)"}}>🍻 KANPAI!</span>
                </button>
              </div>

              {/* ブルー系 */}
              <div className="relative">
                <button
                  onClick={handleCheers}
                  className="relative w-80 h-20 text-white font-black rounded-3xl text-xl tracking-wide bg-gradient-to-br from-blue-500 via-sky-600 to-cyan-600 shadow-2xl shadow-blue-500/50 border-2 border-white/30 hover:scale-105 transition-transform duration-200"
                  style={{
                    background: "linear-gradient(135deg, #3B82F6 0%, #0EA5E9 30%, #06B6D4 70%, #0891B2 100%)",
                    boxShadow: "0 25px 50px rgba(59, 130, 246, 0.5), 0 0 0 2px rgba(255, 255, 255, 0.2), inset 0 2px 0 rgba(255, 255, 255, 0.4)"
                  }}
                >
                  <span className="font-black text-white" style={{textShadow: "0 3px 6px rgba(0, 0, 0, 0.6)"}}>🍻 KANPAI!</span>
                </button>
              </div>

              {/* ダーク系 */}
              <div className="relative">
                <button
                  onClick={handleCheers}
                  className="relative w-80 h-20 text-white font-black rounded-3xl text-xl tracking-wide bg-gradient-to-br from-gray-800 via-slate-900 to-black shadow-2xl shadow-gray-800/50 border-2 border-white/40 hover:scale-105 transition-transform duration-200"
                  style={{
                    background: "linear-gradient(135deg, #1F2937 0%, #0F172A 30%, #000000 70%, #111827 100%)",
                    boxShadow: "0 25px 50px rgba(31, 41, 55, 0.6), 0 0 0 2px rgba(255, 255, 255, 0.3), inset 0 2px 0 rgba(255, 255, 255, 0.5)"
                  }}
                >
                  <span className="font-black text-white" style={{textShadow: "0 3px 6px rgba(0, 0, 0, 0.8)"}}>🍻 KANPAI!</span>
                </button>
              </div>

              {/* ホワイト系 */}
              <div className="relative">
                <button
                  onClick={handleCheers}
                  className="relative w-80 h-20 text-gray-800 font-black rounded-3xl text-xl tracking-wide bg-gradient-to-br from-white via-gray-50 to-gray-100 shadow-2xl shadow-gray-400/30 border-2 border-gray-200 hover:scale-105 transition-transform duration-200"
                  style={{
                    background: "linear-gradient(135deg, #FFFFFF 0%, #F9FAFB 30%, #F3F4F6 70%, #E5E7EB 100%)",
                    boxShadow: "0 25px 50px rgba(107, 114, 128, 0.3), 0 0 0 2px rgba(156, 163, 175, 0.3), inset 0 2px 0 rgba(255, 255, 255, 0.8)"
                  }}
                >
                  <span className="font-black text-gray-800" style={{textShadow: "0 2px 4px rgba(0, 0, 0, 0.2)"}}>🍻 KANPAI!</span>
                </button>
              </div>

              {/* ライム系 */}
              <div className="relative">
                <button
                  onClick={handleCheers}
                  className="relative w-80 h-20 text-white font-black rounded-3xl text-xl tracking-wide bg-gradient-to-br from-lime-500 via-green-500 to-emerald-600 shadow-2xl shadow-lime-500/50 border-2 border-white/30 hover:scale-105 transition-transform duration-200"
                  style={{
                    background: "linear-gradient(135deg, #84CC16 0%, #22C55E 30%, #10B981 70%, #059669 100%)",
                    boxShadow: "0 25px 50px rgba(132, 204, 22, 0.5), 0 0 0 2px rgba(255, 255, 255, 0.2), inset 0 2px 0 rgba(255, 255, 255, 0.4)"
                  }}
                >
                  <span className="font-black text-white" style={{textShadow: "0 3px 6px rgba(0, 0, 0, 0.6)"}}>🍻 KANPAI!</span>
                </button>
              </div>
            </div>
          </div>

          {/* Compact Stats Row */}
          <div className="w-full max-w-sm space-y-6">
            {/* Today's Count - Prominent display */}
            <div className="bg-white/15 backdrop-blur-xl rounded-3xl p-6 border border-white/30 shadow-xl">
              <div className="text-center">
                <div className="text-white/90 text-sm font-semibold mb-3 tracking-wide uppercase">
                  今日の杯数
                </div>
                <div className="text-5xl font-black text-white mb-2 drop-shadow-xl">
                  {todayCount}
                </div>
                <div className="text-white/80 text-xs tracking-wider">
                  DRINKS TODAY
                </div>
              </div>
            </div>

            {/* Current Mood - Always visible */}
            <div className="bg-white/15 backdrop-blur-xl rounded-3xl p-6 border border-white/30 shadow-xl">
              <div className="text-center">
                <div className="text-white/90 text-sm font-semibold mb-4 tracking-wide uppercase">
                  現在の酔い加減
                </div>
                {currentMood !== "none" ? (
                  <div className="flex items-center justify-center gap-3">
                    <span className="text-4xl drop-shadow-lg">
                      {MOOD_LABELS[currentMood].emoji}
                    </span>
                    <div className="text-white text-xl font-bold drop-shadow-md">
                      {MOOD_LABELS[currentMood].label}
                    </div>
                  </div>
                ) : (
                  <div className="text-white/70 text-lg font-medium">
                    まだ記録なし
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom safe area */}
        <div className="h-8"></div>

        {/* Mood Selection Sheet */}
        <MoodSheet
          isOpen={isMoodSheetOpen}
          onOpenChange={setIsMoodSheetOpen}
          onSelect={handleMoodSelect}
          onSkip={handleMoodSkip}
        />
      </div>
    </main>
  );
}
