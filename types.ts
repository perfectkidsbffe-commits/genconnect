export enum UserRole {
  SENIOR = 'SENIOR',
  YOUTH = 'YOUTH'
}

export interface UserProfile {
  id?: string;
  name: string;
  age: number;
  role: UserRole;
  location: string; // e.g., "Nicosia", "Limassol"
  interests: string[];
  languages: string[];
  needsOrSkills: string; // Description of what they need or can offer
  bio: string;
}

export interface MatchSuggestion {
  id: string;
  name: string;
  age: number;
  location: string;
  compatibilityScore: number; // 0-100
  reasoning: string;
  commonInterests: string[];
  role: UserRole;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  text: string;
  timestamp: Date;
  isSystem?: boolean;
}