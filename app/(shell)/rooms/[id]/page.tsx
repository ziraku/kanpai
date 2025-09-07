"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { ToastCheers } from "@/src/components/ToastCheers"
import { MoodSheet } from "@/src/components/MoodSheet"
import { getRoom, postMyDrink, patchMyMood } from "@/src/mocks/rooms"
import { useDrinkStore } from "@/src/stores/drinkStore"
import { trackCheers, trackMood, trackJoinRoom } from "@/src/lib/analytics"
import { Room, MOOD_LABELS } from "@/src/types"

interface PageProps {
  params: Promise<{ id: string }>
}

export default function RoomDetailPage({ params }: PageProps) {
  const [room, setRoom] = useState<Room | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isMoodSheetOpen, setIsMoodSheetOpen] = useState(false)
  const [resolvedParams, setResolvedParams] = useState<{ id: string } | null>(null)
  
  const { joinRoom, incrementDrink } = useDrinkStore()

  useEffect(() => {
    const resolveParams = async () => {
      const resolved = await params
      setResolvedParams(resolved)
    }
    resolveParams()
  }, [params])

  useEffect(() => {
    if (!resolvedParams) return

    const fetchRoom = async () => {
      try {
        const roomData = await getRoom(resolvedParams.id)
        if (roomData) {
          setRoom(roomData)
          joinRoom(roomData.id)
          trackJoinRoom({ roomId: roomData.id })
        }
      } catch (error) {
        console.error("Failed to fetch room:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchRoom()
  }, [resolvedParams, joinRoom])

  const handleCheers = async () => {
    if (!room) return

    try {
      const result = await postMyDrink(room.id)
      if (result.success) {
        // Update local room state
        const updatedRoom = await getRoom(room.id)
        if (updatedRoom) {
          setRoom(updatedRoom)
        }
        
        // Update global state
        incrementDrink()
        trackCheers({ location: "room", count: result.newTotal })
        
        // Show mood selection
        setIsMoodSheetOpen(true)
      }
    } catch (error) {
      console.error("Failed to post drink:", error)
    }
  }

  const handleMoodSelect = async (selectedMood: "mild" | "good" | "heavy" | "blackout") => {
    if (!room) return

    try {
      await patchMyMood(room.id, selectedMood)
      trackMood({ mood: selectedMood, location: "room" })
      
      // Refresh room data
      const updatedRoom = await getRoom(room.id)
      if (updatedRoom) {
        setRoom(updatedRoom)
      }
    } catch (error) {
      console.error("Failed to update mood:", error)
    }
  }

  const handleMoodSkip = () => {
    console.log("Mood selection skipped in room")
  }

  if (isLoading || !room) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="sticky top-0 bg-white border-b border-gray-200 z-10">
          <div className="container max-w-md mx-auto p-4">
            <div className="h-6 bg-gray-300 rounded w-3/4 mb-2 animate-pulse"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2 animate-pulse"></div>
          </div>
        </div>
        <div className="container max-w-md mx-auto p-4">
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                      <div>
                        <div className="h-4 bg-gray-300 rounded w-20 mb-2"></div>
                        <div className="h-3 bg-gray-300 rounded w-16"></div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="h-6 bg-gray-300 rounded w-8 mb-1"></div>
                      <div className="h-3 bg-gray-300 rounded w-6"></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="sticky top-0 bg-white border-b border-gray-200 z-10">
        <div className="container max-w-md mx-auto p-4">
          <h1 className="text-xl font-bold">{room.name}</h1>
          <p className="text-sm text-gray-600">合計: {room.total}杯</p>
        </div>
      </div>

      <div className="container max-w-md mx-auto p-4">
        <div className="space-y-3">
          {room.members
            .sort((a, b) => b.count - a.count)
            .map((member) => (
              <Card 
                key={member.id}
                className={member.id === "me" ? "border-brand/50 bg-brand/5" : ""}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium">
                          {member.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium">{member.name}</p>
                        <p className="text-sm text-gray-600">
                          {member.mood ? (
                            <span>
                              {MOOD_LABELS[member.mood].emoji} {MOOD_LABELS[member.mood].label}
                            </span>
                          ) : (
                            <span className="text-gray-400">-</span>
                          )}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold">{member.count}</p>
                      <p className="text-xs text-gray-500">杯</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>
      </div>

      <div className="fixed bottom-28 left-0 right-0 flex justify-center px-4">
        <ToastCheers onCheers={handleCheers} />
      </div>

      <MoodSheet
        isOpen={isMoodSheetOpen}
        onOpenChange={setIsMoodSheetOpen}
        onSelect={handleMoodSelect}
        onSkip={handleMoodSkip}
      />
    </div>
  )
}