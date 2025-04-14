// Utility functions for generating random data

// Generate a random integer between min and max (inclusive)
export function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

// Generate a random percentage (0-100)
export function getRandomPercentage(): number {
  return getRandomInt(1, 100)
}

// Generate a random trend (+/- percentage)
export function getRandomTrend(): string {
  const isPositive = Math.random() > 0.3 // 70% chance of positive trend
  const value = getRandomInt(1, 30)
  return `${isPositive ? "+" : "-"}${value}%`
}

// Generate a random view count
export function getRandomViews(): number {
  return getRandomInt(500, 10000)
}

// Generate a random subscriber count
export function getRandomSubscribers(): number {
  return getRandomInt(5, 100)
}

// Generate a random active user count
export function getRandomActiveUsers(): number {
  return getRandomInt(50, 1000)
}

// Generate a random message count
export function getRandomMessages(): number {
  return getRandomInt(1, 50)
}

// Generate a random unread count
export function getRandomUnread(): number {
  return getRandomInt(0, 10)
}

// Generate a random date in the past (up to maxDaysAgo days ago)
export function getRandomPastDate(maxDaysAgo = 30): Date {
  const daysAgo = getRandomInt(1, maxDaysAgo)
  const date = new Date()
  date.setDate(date.getDate() - daysAgo)
  return date
}

// Random activity types
const activityTypes = [
  "Profile updated",
  "Password changed",
  "Login detected",
  "New message received",
  "Document uploaded",
  "Settings changed",
  "Subscription renewed",
  "Account verified",
  "Payment processed",
  "Comment posted",
]

// Generate a random activity
export function getRandomActivity() {
  return {
    type: activityTypes[getRandomInt(0, activityTypes.length - 1)],
    date: getRandomPastDate(),
    icon: getRandomInt(1, 5), // We'll use this to determine which icon to show
  }
}

// Generate multiple random activities
export function getRandomActivities(count = 5) {
  return Array.from({ length: count }, () => getRandomActivity()).sort((a, b) => b.date.getTime() - a.date.getTime()) // Sort by date, newest first
}
