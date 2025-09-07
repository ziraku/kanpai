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
  label = "🍻 Cheers!",
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
          "relative w-72 h-20 text-white font-extrabold rounded-full text-xl tracking-wide",
          "bg-gradient-to-br from-red-500 via-red-400 to-red-300",
          "shadow-lg shadow-red-500/40 border-2 border-white/40",
          "focus:outline-none focus:ring-4 focus:ring-white/30",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          "touch-manipulation", // iOS Safari optimization
          "active:scale-95", // Better touch feedback
          "transition-all duration-200",
          "hover:shadow-xl hover:shadow-red-500/50 hover:border-white/50",
          "hover:-translate-y-1 hover:scale-105",
          isPressed && "animate-scale-bump",
          className
        )}
        style={{
          boxShadow: `
            0 10px 25px rgba(229, 62, 62, 0.4),
            0 4px 15px rgba(245, 101, 101, 0.3),
            0 0 0 3px rgba(255, 255, 255, 0.2)
          `,
        }}
      >
        <span
          className="relative z-10 drop-shadow-lg"
          style={{ textShadow: "0 2px 4px rgba(0, 0, 0, 0.3)" }}
        >
          {label}
        </span>

        {/* Inner glow effect */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
      </button>

      {/* Floating particles */}
      {isPressed && (
        <>
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 pointer-events-none animate-foam-bubble">
            <div className="w-4 h-4 bg-white rounded-full opacity-80 shadow-lg"></div>
          </div>
          <div
            className="absolute -top-6 left-1/3 transform -translate-x-1/2 pointer-events-none animate-foam-bubble"
            style={{ animationDelay: "100ms" }}
          >
            <div className="w-3 h-3 bg-yellow-200 rounded-full opacity-70"></div>
          </div>
          <div
            className="absolute -top-6 right-1/3 transform translate-x-1/2 pointer-events-none animate-foam-bubble"
            style={{ animationDelay: "200ms" }}
          >
            <div className="w-2 h-2 bg-orange-200 rounded-full opacity-60"></div>
          </div>
        </>
      )}
    </div>
  );
}
