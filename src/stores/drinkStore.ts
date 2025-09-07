import { create } from "zustand"
import { persist } from "zustand/middleware"
import { Mood } from "@/src/types"
import dayjs from "dayjs"

interface DrinkState {
  todayCount: number
  currentMood: Mood
  activeSessionId: string | null
  inRoomId: string | null
  lastActivityAt: string | null
}

interface DrinkActions {
  startPersonalSession: () => void
  incrementDrink: () => void
  setMood: (mood: Mood) => void
  joinRoom: (roomId: string) => void
  leaveRoom: () => void
  resetDaily: () => void
}

type DrinkStore = DrinkState & DrinkActions

const generateSessionId = () => `session_${Date.now()}_${Math.random()}`

export const useDrinkStore = create<DrinkStore>()(
  persist(
    (set, get) => ({
      // State
      todayCount: 0,
      currentMood: "none",
      activeSessionId: null,
      inRoomId: null,
      lastActivityAt: null,

      // Actions
      startPersonalSession: () => {
        const today = dayjs().format("YYYY-MM-DD")
        const lastActivity = get().lastActivityAt
        
        // 日付が変わっていたらリセット
        if (lastActivity && !dayjs(lastActivity).isSame(today, "day")) {
          set({
            todayCount: 0,
            currentMood: "none",
          })
        }

        const sessionId = get().activeSessionId || generateSessionId()
        set({
          activeSessionId: sessionId,
          lastActivityAt: dayjs().toISOString(),
        })
      },

      incrementDrink: () => {
        set((state) => ({
          todayCount: state.todayCount + 1,
          lastActivityAt: dayjs().toISOString(),
        }))
      },

      setMood: (mood: Mood) => {
        set({
          currentMood: mood,
          lastActivityAt: dayjs().toISOString(),
        })
      },

      joinRoom: (roomId: string) => {
        set({
          inRoomId: roomId,
          lastActivityAt: dayjs().toISOString(),
        })
      },

      leaveRoom: () => {
        set({
          inRoomId: null,
          lastActivityAt: dayjs().toISOString(),
        })
      },

      resetDaily: () => {
        set({
          todayCount: 0,
          currentMood: "none",
          lastActivityAt: dayjs().toISOString(),
        })
      },
    }),
    {
      name: "cheers-drink-store",
      version: 1,
    }
  )
)