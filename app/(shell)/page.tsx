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
            
            {/* Hero Cheers Button */}
            <div className="mb-16">
              <ToastCheers
                onCheers={handleCheers}
                className="w-80 h-24 text-xl font-extrabold shadow-2xl transform hover:scale-105 transition-transform duration-200"
              />
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
