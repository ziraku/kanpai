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
    <main className="home-gradient floating-bubbles">
      <div className="flex flex-col min-h-screen relative">
        {/* Header - Compact */}
        <div className="pt-safe-top px-4 sm:px-6 py-3 sm:py-4">
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl font-black text-white drop-shadow-lg mb-1 tracking-tight">
              Cheers!
            </h1>
            <p className="text-white/80 text-xs sm:text-sm font-medium tracking-wide">
              今日も素敵な一杯を
            </p>
          </div>
        </div>

        {/* Main Content - Cheers Button First */}
        <div className="flex-1 flex flex-col justify-center px-4 sm:px-6">
          {/* Main Cheers Button - Prominent */}
          <div className="flex justify-center mb-6 sm:mb-8">
            <ToastCheers
              onCheers={handleCheers}
              className="w-72 sm:w-80 h-20 sm:h-24 text-xl sm:text-2xl"
            />
          </div>

          {/* Stats Section - Compact */}
          <div className="space-y-3 sm:space-y-4">
            {/* Count Display - Smaller */}
            <div className="text-center">
              <div className="glass-card rounded-2xl p-3 sm:p-4">
                <div className="text-white/80 text-xs sm:text-sm mb-1 font-medium">
                  今日の杯数
                </div>
                <div className="text-2xl sm:text-3xl font-black text-white tracking-tighter">
                  {todayCount}
                </div>
                <div className="text-white/60 text-xs uppercase tracking-widest">
                  DRINKS
                </div>
              </div>
            </div>

            {/* Mood Display - Compact */}
            {currentMood !== "none" && (
              <div className="text-center">
                <div className="glass-card rounded-xl p-2 sm:p-3">
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-xl sm:text-2xl">
                      {MOOD_LABELS[currentMood].emoji}
                    </span>
                    <div className="text-left">
                      <div className="text-white/80 text-xs font-medium">
                        現在の気分
                      </div>
                      <div className="text-white text-xs sm:text-sm font-bold">
                        {MOOD_LABELS[currentMood].label}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom spacing for safe area */}
        <div className="safe-area-bottom h-4"></div>

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
