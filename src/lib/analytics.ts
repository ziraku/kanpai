interface CheersEvent {
  location: "home" | "room"
  count: number
}

interface MoodEvent {
  mood: string
  location: "home" | "room" 
}

interface JoinRoomEvent {
  roomId: string
}

export const trackCheers = ({ location, count }: CheersEvent): void => {
  if (typeof window === "undefined") return
  
  // TODO: Replace with GA4/GTM tracking
  console.log("🍻 Cheers tracked:", { 
    event: "cheers",
    location, 
    count, 
    timestamp: new Date().toISOString() 
  })
  
  // Future GA4 implementation example:
  // gtag('event', 'cheers', {
  //   'location': location,
  //   'count': count,
  //   'custom_parameter_1': 'value'
  // });
}

export const trackMood = ({ mood, location }: MoodEvent): void => {
  if (typeof window === "undefined") return
  
  // TODO: Replace with GA4/GTM tracking
  console.log("😊 Mood tracked:", { 
    event: "mood_selection",
    mood, 
    location, 
    timestamp: new Date().toISOString() 
  })
  
  // Future GA4 implementation example:
  // gtag('event', 'mood_selection', {
  //   'mood_type': mood,
  //   'location': location
  // });
}

export const trackJoinRoom = ({ roomId }: JoinRoomEvent): void => {
  if (typeof window === "undefined") return
  
  // TODO: Replace with GA4/GTM tracking
  console.log("🏠 Room join tracked:", { 
    event: "join_room",
    roomId, 
    timestamp: new Date().toISOString() 
  })
  
  // Future GA4 implementation example:
  // gtag('event', 'join_room', {
  //   'room_id': roomId
  // });
}

// TODO: Add more tracking functions as needed:
// - trackPageView
// - trackSessionStart
// - trackAppInstall (PWA)
// - trackError