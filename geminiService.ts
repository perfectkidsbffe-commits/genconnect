import { GoogleGenAI, Type } from "@google/genai";
import { UserProfile, MatchSuggestion, UserRole } from "../types";

// Initialize Gemini
// Note: In a real production app, this should be handled via a backend proxy to protect the key.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Dummy database of users in Cyprus to match against
const MOCK_DATABASE: UserProfile[] = [
  {
    id: 'u1',
    name: 'Γιώργος Παπαδόπουλος',
    age: 78,
    role: UserRole.SENIOR,
    location: 'Λευκωσία',
    interests: ['Σκάκι', 'Ιστορία', 'Κηπουρική'],
    languages: ['Ελληνικά', 'Αγγλικά'],
    needsOrSkills: 'Αναζητώ παρέα για καφέ και συζήτηση ιστορικών θεμάτων.',
    bio: 'Συνταξιούχος εκπαιδευτικός.'
  },
  {
    id: 'u2',
    name: 'Μαρία Γεωργίου',
    age: 82,
    role: UserRole.SENIOR,
    location: 'Λεμεσός',
    interests: ['Μαγειρική', 'Πλέξιμο', 'Ελληνική Μουσική'],
    languages: ['Ελληνικά'],
    needsOrSkills: 'Χρειάζομαι βοήθεια με τα ψώνια και λίγη συντροφιά.',
    bio: 'Λατρεύω να μαγειρεύω παραδοσιακές συνταγές.'
  },
  {
    id: 'u3',
    name: 'Ανδρέας Κωνσταντίνου',
    age: 22,
    role: UserRole.YOUTH,
    location: 'Λευκωσία',
    interests: ['Τεχνολογία', 'Σκάκι', 'Εθελοντισμός'],
    languages: ['Ελληνικά', 'Αγγλικά'],
    needsOrSkills: 'Μπορώ να διδάξω χρήση υπολογιστή και να κρατήσω παρέα.',
    bio: 'Φοιτητής πληροφορικής στο Πανεπιστήμιο Κύπρου.'
  },
  {
    id: 'u4',
    name: 'Ελένη Χριστοφόρου',
    age: 25,
    role: UserRole.YOUTH,
    location: 'Λεμεσός',
    interests: ['Λογοτεχνία', 'Μαγειρική', 'Πεζοπορία'],
    languages: ['Ελληνικά', 'Γαλλικά'],
    needsOrSkills: 'Προσφέρω συνοδεία σε περιπάτους και βοήθεια στο σπίτι.',
    bio: 'Αγαπώ τις ιστορίες των παλιών και τη φύση.'
  },
  {
    id: 'u5',
    name: 'Κώστας Μιχαήλ',
    age: 75,
    role: UserRole.SENIOR,
    location: 'Πάφος',
    interests: ['Ψάρεμα', 'Πολιτική', 'Τάβλι'],
    languages: ['Ελληνικά'],
    needsOrSkills: 'Ψάχνω αντίπαλο στο τάβλι.',
    bio: 'Πρώην ναυτικός.'
  },
  {
    id: 'u6',
    name: 'Σοφία Ιωάννου',
    age: 20,
    role: UserRole.YOUTH,
    location: 'Πάφος',
    interests: ['Κοινωνιολογία', 'Τάβλι', 'Θέατρο'],
    languages: ['Ελληνικά', 'Αγγλικά'],
    needsOrSkills: 'Θέλω να μάθω ιστορίες από το παρελθόν.',
    bio: 'Φοιτήτρια κοινωνικών επιστημών.'
  }
];

export const findMatchesWithAI = async (currentUser: UserProfile): Promise<MatchSuggestion[]> => {
  // Filter out users of the same role (we want Cross-Generational matches)
  const candidates = MOCK_DATABASE.filter(u => u.role !== currentUser.role);

  if (candidates.length === 0) return [];

  const modelId = "gemini-2.5-flash";
  
  const prompt = `
    You are the "AI Matching Engine CY" for GENCONNECT.
    Your goal is to match a user with potential companions based on location (Cyprus cities), shared interests, and complementary needs/skills.
    
    Current User Profile:
    ${JSON.stringify(currentUser)}

    Candidate Profiles:
    ${JSON.stringify(candidates)}

    Task:
    Select the top 3 matches. Prioritize location proximity (cities in Cyprus) and shared interests.
    Return a valid JSON array of objects.
  `;

  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              name: { type: Type.STRING },
              age: { type: Type.NUMBER },
              location: { type: Type.STRING },
              compatibilityScore: { type: Type.NUMBER, description: "A score from 0 to 100" },
              reasoning: { type: Type.STRING, description: "A short explanation in GREEK language why they are a good match." },
              commonInterests: { type: Type.ARRAY, items: { type: Type.STRING } },
              role: { type: Type.STRING } // 'SENIOR' or 'YOUTH'
            }
          }
        }
      }
    });

    const jsonStr = response.text || "[]";
    const matches = JSON.parse(jsonStr) as MatchSuggestion[];
    
    // Ensure we map the role correctly if the AI returns string text
    return matches.map(m => ({
      ...m,
      role: m.role as UserRole
    }));

  } catch (error) {
    console.error("AI Matching failed", error);
    // Fallback: Return simple filtered list if AI fails
    return candidates.slice(0, 3).map(c => ({
        id: c.id || 'unknown',
        name: c.name,
        age: c.age,
        location: c.location,
        role: c.role,
        compatibilityScore: 50,
        reasoning: "Προτεινόμενη επαφή βάσει τοποθεσίας (Fallback).",
        commonInterests: c.interests
    }));
  }
};
