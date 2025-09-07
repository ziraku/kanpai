"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface ToastCheersProps {
  onCheers: () => void;
  label?: string;
  className?: string;
  disabled?: boolean;
}

export function ToastCheers({
  onCheers,
  label = "🍻 Kanpai!",
  className,
  disabled = false,
}: ToastCheersProps) {
  const [isPressed, setIsPressed] = useState(false);

  const handlePress = () => {
    if (disabled) return;

    setIsPressed(true);
    onCheers();

    // Reset animation state
    setTimeout(() => setIsPressed(false), 300);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handlePress();
    }
  };

  return (
    <div className="relative">
      <button
        onClick={handlePress}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        role="button"
        aria-label="乾杯"
        className={cn(
          "relative w-80 h-24 text-white font-black rounded-3xl text-2xl tracking-wide",
          "bg-gradient-to-br from-lime-500 via-green-500 to-emerald-600",
          "shadow-2xl shadow-lime-500/50",
          "focus:outline-none focus:ring-4 focus:ring-lime-400/50",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          "touch-manipulation",
          "active:scale-95",
          "transition-all duration-300 ease-out",
          "hover:shadow-lime-400/70 hover:scale-105",
          "border-2 border-white/30",
          isPressed && "animate-scale-bump",
          className
        )}
        style={{
          background: `
            linear-gradient(135deg, 
              #84CC16 0%, 
              #22C55E 30%,
              #10B981 70%, 
              #059669 100%
            )
          `,
          boxShadow: `
            0 25px 50px rgba(132, 204, 22, 0.5),
            0 0 0 2px rgba(255, 255, 255, 0.2),
            inset 0 2px 0 rgba(255, 255, 255, 0.4),
            inset 0 -2px 0 rgba(0, 0, 0, 0.15)
          `,
        }}
      >
        <div className="relative z-10 text-center">
          <div
            className="font-black text-white mb-1"
            style={{
              textShadow: "0 3px 6px rgba(0, 0, 0, 0.6), 0 1px 3px rgba(0, 0, 0, 0.8)",
              filter: "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))",
            }}
          >
            🍻 KANPAI!
          </div>
          <div
            className="font-black text-white text-3xl"
            style={{
              textShadow: "0 3px 6px rgba(0, 0, 0, 0.6)",
              filter: "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))",
            }}
          >
            +
          </div>
        </div>

        {/* Inner glow effect */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-transparent via-white/15 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500"></div>

        {/* Animated gradient overlay */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-lime-300/20 via-green-300/20 to-emerald-300/20 opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
      </button>

      {/* Floating particles */}
      {isPressed && (
        <>
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 pointer-events-none animate-foam-bubble">
            <div className="w-4 h-4 bg-white rounded-full opacity-90 shadow-lg"></div>
          </div>
          <div
            className="absolute -top-6 left-1/3 transform -translate-x-1/2 pointer-events-none animate-foam-bubble"
            style={{ animationDelay: "100ms" }}
          >
            <div className="w-3 h-3 bg-lime-200 rounded-full opacity-80"></div>
          </div>
          <div
            className="absolute -top-6 right-1/3 transform translate-x-1/2 pointer-events-none animate-foam-bubble"
            style={{ animationDelay: "200ms" }}
          >
            <div className="w-2 h-2 bg-green-200 rounded-full opacity-70"></div>
          </div>
        </>
      )}
    </div>
  );
}
