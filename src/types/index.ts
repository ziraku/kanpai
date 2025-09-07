export type Mood = "none" | "mild" | "good" | "heavy" | "blackout"

export interface MoodLabel {
  emoji: string
  label: string
}

export const MOOD_LABELS: Record<Exclude<Mood, "none">, MoodLabel> = {
  mild: { emoji: "🍶", label: "ほろ酔い" },
  good: { emoji: "🍷", label: "いいかんじ" },
  heavy: { emoji: "🍺", label: "かなり酔ってきた" },
  blackout: { emoji: "🥴", label: "記憶ないかも" },
}

export interface Member {
  id: string
  name: string
  avatarUrl?: string
  count: number
  mood?: Exclude<Mood, "none">
}

export interface Room {
  id: string
  name: string
  members: Member[]
  total: number
  createdAt: string
  updatedAt: string
}

export interface DrinkSession {
  id: string
  userId: string
  roomId?: string
  count: number
  mood: Mood
  startedAt: string
  updatedAt: string
}