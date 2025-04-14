// Simple in-memory storage for users
// This will be lost when the server restarts, but it's perfect for local testing

interface User {
  id: number
  username: string
  email: string
  passwordHash: string
  createdAt: string
}

class MemoryStore {
  private users: User[] = []
  private nextId = 1

  // Add a demo user by default
  constructor() {
    this.users.push({
      id: this.nextId++,
      username: "demo",
      email: "demo@example.com",
      passwordHash: "demo", // In a real app, this would be hashed
      createdAt: new Date().toISOString(),
    })
  }

  addUser(username: string, email: string, passwordHash: string): User {
    const user = {
      id: this.nextId++,
      username,
      email,
      passwordHash,
      createdAt: new Date().toISOString(),
    }
    this.users.push(user)
    return user
  }

  getUserByUsername(username: string): User | undefined {
    return this.users.find((user) => user.username === username)
  }

  getUserByEmail(email: string): User | undefined {
    return this.users.find((user) => user.email === email)
  }

  getAllUsers(): User[] {
    return [...this.users]
  }
}

// Create a singleton instance
export const memoryStore = new MemoryStore()
