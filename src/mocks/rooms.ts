import { Room, Member } from "@/src/types"
import dayjs from "dayjs"

const mockMembers: Member[] = [
  {
    id: "me",
    name: "あなた",
    count: 5,
    mood: "good",
  },
  {
    id: "user1",
    name: "田中太郎",
    count: 4,
    mood: "mild",
  },
  {
    id: "user2", 
    name: "佐藤花子",
    count: 7,
    mood: "heavy",
  },
  {
    id: "user3",
    name: "鈴木一郎",
    count: 3,
  },
  {
    id: "user4",
    name: "高橋美咲", 
    count: 6,
    mood: "good",
  },
]

const mockRooms: Room[] = [
  {
    id: "1",
    name: "金曜日の会",
    members: mockMembers.slice(0, 3),
    total: 16,
    createdAt: dayjs().subtract(2, "hour").toISOString(),
    updatedAt: dayjs().subtract(10, "minute").toISOString(),
  },
  {
    id: "2",
    name: "同期飲み",
    members: mockMembers.slice(0, 4),
    total: 20,
    createdAt: dayjs().subtract(4, "hour").toISOString(),
    updatedAt: dayjs().subtract(15, "minute").toISOString(),
  },
  {
    id: "3",
    name: "プロジェクト打ち上げ",
    members: mockMembers,
    total: 25,
    createdAt: dayjs().subtract(6, "hour").toISOString(),
    updatedAt: dayjs().subtract(5, "minute").toISOString(),
  },
]

export const listRooms = async (): Promise<Room[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300))
  return mockRooms
}

export const getRoom = async (id: string): Promise<Room | null> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 200))
  
  const room = mockRooms.find((room) => room.id === id)
  return room || null
}

export const postMyDrink = async (roomId: string): Promise<{ success: boolean; newTotal: number }> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300))
  
  const room = mockRooms.find((r) => r.id === roomId)
  if (!room) {
    throw new Error("Room not found")
  }
  
  // Find current user and increment count
  const myMember = room.members.find((m) => m.id === "me")
  if (myMember) {
    myMember.count++
  }
  
  // Update total
  room.total++
  room.updatedAt = dayjs().toISOString()
  
  return {
    success: true,
    newTotal: room.total,
  }
}

export const patchMyMood = async (
  roomId: string, 
  mood: Exclude<Member["mood"], undefined>
): Promise<{ success: boolean }> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 200))
  
  const room = mockRooms.find((r) => r.id === roomId)
  if (!room) {
    throw new Error("Room not found")
  }
  
  // Find current user and update mood
  const myMember = room.members.find((m) => m.id === "me")
  if (myMember) {
    myMember.mood = mood
  }
  
  room.updatedAt = dayjs().toISOString()
  
  return {
    success: true,
  }
}