"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface ToastCheersProps {
  onCheers: () => void;
  label?: string;
  className?: string;
  disabled?: boolean;
  style?: React.CSSProperties;
}

export function ToastCheers({
  onCheers,
  label = "🍻 Kanpai!",
  className,
  disabled = false,
  style,
}: ToastCheersProps) {
  const [isPressed, setIsPressed] = useState(false);
  const [isFilling, setIsFilling] = useState(false);

  const handlePress = () => {
    if (disabled || isFilling) return;

    console.log("Button pressed! Starting animation...");
    setIsPressed(true);
    setIsFilling(true);
    
    // ビールアニメーション後にonCheersを実行
    setTimeout(() => {
      onCheers();
      setIsPressed(false);
    }, 2500);
    
    // アニメーションをリセット
    setTimeout(() => {
      setIsFilling(false);
      console.log("Animation reset");
    }, 3000);
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
          "relative w-40 h-40 font-black rounded-full text-2xl tracking-wide",
          "bg-white",
          "shadow-2xl",
          "focus:outline-none focus:ring-8 focus:ring-orange-400/30",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          "touch-manipulation",
          "active:scale-95",
          "transition-all duration-300 ease-out",
          "hover:scale-110",
          "border-4 border-orange-400/20",
          "flex items-center justify-center",
          isPressed && "animate-scale-bump",
          className
        )}
        style={{
          background: `
            linear-gradient(145deg, 
              #FFFFFF 0%, 
              #FAFAFA 50%,
              #F5F5F5 100%
            )
          `,
          boxShadow: `
            0 20px 40px rgba(0, 0, 0, 0.15),
            0 10px 20px rgba(0, 0, 0, 0.1),
            0 0 0 1px rgba(255, 255, 255, 1),
            inset 0 2px 4px rgba(255, 255, 255, 1),
            inset 0 -2px 4px rgba(0, 0, 0, 0.05)
          `,
          ...style,
        }}
      >
        {/* ビール液体アニメーション */}
        {isFilling && (
          <div className="absolute inset-0 rounded-full overflow-hidden z-30">
            {/* 半透明の黒背景 */}
            <div className="absolute inset-0 bg-black/20 z-10" />
            
            {/* ビール本体 */}
            <div 
              className="absolute bottom-0 left-0 right-0 z-20"
              style={{
                background: "linear-gradient(to top, #D97706 0%, #F59E0B 30%, #FCD34D 90%, #FDE68A 100%)",
                height: "0%",
                animation: "fillUpWave 2.5s ease-in-out forwards",
                boxShadow: "inset 0 2px 10px rgba(0, 0, 0, 0.2)",
              }}
            />
          
            {/* 泡の層 */}
            <div 
              className="absolute left-0 right-0 z-30"
              style={{
                background: "linear-gradient(to top, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 1) 100%)",
                height: "20%",
                bottom: "-20%",
                animation: "foamUpWave 2.5s ease-in-out forwards",
                boxShadow: "0 -2px 10px rgba(255, 255, 255, 0.5)",
              }}
            />
            
            {/* 泡のアニメーション */}
            <div className="absolute bottom-1/2 left-1/4 w-3 h-3 bg-white rounded-full z-40 animate-bubble-rise opacity-90" />
            <div className="absolute bottom-1/3 right-1/4 w-4 h-4 bg-white/90 rounded-full z-40 animate-bubble-rise" style={{animationDelay: "0.2s"}} />
            <div className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-white rounded-full z-40 animate-bubble-rise opacity-95" style={{animationDelay: "0.4s"}} />
            <div className="absolute bottom-1/3 right-1/3 w-5 h-5 bg-white/85 rounded-full z-40 animate-bubble-rise" style={{animationDelay: "0.6s"}} />
          </div>
        )}

        <div className="relative z-10 text-center">
          <div
            className="font-black mb-1"
            style={{
              fontSize: "2rem",
              background: "linear-gradient(135deg, #F97316 0%, #FB923C 50%, #FED7AA 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              filter: "drop-shadow(0 2px 4px rgba(249, 115, 22, 0.2))",
            }}
          >
            PUSH
          </div>
        </div>

        {/* Inner glow effect */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-orange-200/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500"></div>

        {/* Animated gradient overlay */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-100/10 via-amber-100/10 to-yellow-100/10 opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
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
            <div className="w-3 h-3 bg-orange-200 rounded-full opacity-80"></div>
          </div>
          <div
            className="absolute -top-6 right-1/3 transform translate-x-1/2 pointer-events-none animate-foam-bubble"
            style={{ animationDelay: "200ms" }}
          >
            <div className="w-2 h-2 bg-amber-200 rounded-full opacity-70"></div>
          </div>
        </>
      )}
    </div>
  );
}
