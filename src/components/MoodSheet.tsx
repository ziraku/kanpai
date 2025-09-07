"use client"

import { useState } from "react"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Mood, MOOD_LABELS } from "@/src/types"
import { cn } from "@/lib/utils"

interface MoodSheetProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  onSelect: (mood: Exclude<Mood, "none">) => void
  onSkip: () => void
}

export function MoodSheet({ isOpen, onOpenChange, onSelect, onSkip }: MoodSheetProps) {
  const [selectedMood, setSelectedMood] = useState<Exclude<Mood, "none"> | null>(null)

  const handleSelect = (mood: Exclude<Mood, "none">) => {
    setSelectedMood(mood)
    setTimeout(() => {
      onSelect(mood)
      onOpenChange(false)
      setSelectedMood(null)
    }, 150)
  }

  const handleSkip = () => {
    onSkip()
    onOpenChange(false)
  }

  const moodEntries = Object.entries(MOOD_LABELS) as [Exclude<Mood, "none">, typeof MOOD_LABELS[keyof typeof MOOD_LABELS]][]

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="rounded-t-3xl">
        <SheetHeader className="text-center mb-6">
          <SheetTitle>今の気分はいかがですか？</SheetTitle>
          <SheetDescription>
            酔い加減を選択してください（スキップも可能です）
          </SheetDescription>
        </SheetHeader>

        <div className="grid grid-cols-2 gap-4 mb-6">
          {moodEntries.map(([mood, { emoji, label }]) => (
            <Button
              key={mood}
              variant="outline"
              className={cn(
                "h-20 flex flex-col gap-2 text-lg transition-all hover:scale-105",
                selectedMood === mood && "bg-brand text-white border-brand"
              )}
              onClick={() => handleSelect(mood)}
            >
              <span className="text-2xl">{emoji}</span>
              <span className="text-sm">{label}</span>
            </Button>
          ))}
        </div>

        <div className="flex justify-center">
          <Button
            variant="ghost"
            onClick={handleSkip}
            className="text-gray-500 hover:text-gray-700"
          >
            スキップ
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}