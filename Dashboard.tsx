import React, { useEffect, useState } from 'react';
import { UserProfile, MatchSuggestion } from '../types';
import { findMatchesWithAI } from '../services/geminiService';

interface DashboardProps {
  currentUser: UserProfile;
  onChatSelect: (matchId: string, matchName: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ currentUser, onChatSelect }) => {
  const [matches, setMatches] = useState<MatchSuggestion[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMatches = async () => {
      setLoading(true);
      // Simulate network delay for realism
      await new Promise(resolve => setTimeout(resolve, 1000));
      const results = await findMatchesWithAI(currentUser);
      setMatches(results);
      setLoading(false);
    };

    fetchMatches();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run once on mount

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-5rem)]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-cyprus-blue mb-4"></div>
        <h2 className="text-2xl font-semibold text-gray-700">Το AI Matching Engine CY εργάζεται...</h2>
        <p className="text-gray-500">Ψάχνουμε τα καλύτερα ταιριάσματα για εσάς.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Καλώς ήρθατε, {currentUser.name}
        </h1>
        <p className="text-gray-600 mt-2">
          Βρήκαμε {matches.length} άτομα που ταιριάζουν με το προφίλ σας.
        </p>
      </div>

      {matches.length === 0 ? (
         <div className="text-center p-10 bg-white rounded-lg shadow">
            <i className="fa-regular fa-face-frown text-4xl text-gray-400 mb-2"></i>
            <p>Δεν βρέθηκαν αντιστοιχίες αυτή τη στιγμή.</p>
         </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {matches.map((match) => (
            <div key={match.id} className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col border border-gray-100 hover:shadow-xl transition-shadow duration-300">
              <div className="h-24 bg-gradient-to-r from-cyprus-blue to-blue-600 relative">
                <div className="absolute -bottom-10 left-6">
                  <img 
                    className="h-20 w-20 rounded-full border-4 border-white object-cover shadow-md"
                    src={`https://picsum.photos/seed/${match.id}/200`} 
                    alt={match.name} 
                  />
                </div>
                <div className="absolute top-3 right-3 bg-white px-3 py-1 rounded-full text-sm font-bold text-cyprus-blue shadow-sm">
                    {match.compatibilityScore}% Συμβατότητα
                </div>
              </div>
              
              <div className="pt-12 px-6 pb-6 flex-1 flex flex-col">
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="text-xl font-bold text-gray-900">{match.name}, {match.age}</h3>
                        <p className="text-sm text-gray-500 flex items-center mt-1">
                            <i className="fa-solid fa-location-dot mr-1 text-cyprus-copper"></i> {match.location}
                        </p>
                    </div>
                </div>

                <div className="mt-4 bg-blue-50 p-3 rounded-lg border border-blue-100">
                    <p className="text-sm text-gray-800 italic">"{match.reasoning}"</p>
                </div>

                <div className="mt-4">
                    <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Κοινά Ενδιαφέροντα</h4>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {match.commonInterests.map((interest, idx) => (
                            <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-600 rounded-md text-xs font-medium">
                                {interest}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="mt-6 flex space-x-3 mt-auto">
                    <button 
                        onClick={() => onChatSelect(match.id, match.name)}
                        className="flex-1 flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-cyprus-blue hover:bg-blue-800"
                    >
                        <i className="fa-regular fa-comment-dots mr-2"></i>
                        Συνομιλία
                    </button>
                    <button className="flex-1 flex items-center justify-center py-2 px-4 border border-cyprus-blue rounded-md shadow-sm text-sm font-medium text-cyprus-blue bg-white hover:bg-blue-50">
                        <i className="fa-regular fa-calendar-check mr-2"></i>
                        Ραντεβού
                    </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

        {/* Community Activities Section */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Δραστηριότητες Κοινότητας</h2>
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            <li>
              <div className="px-4 py-4 sm:px-6 hover:bg-gray-50 cursor-pointer">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-cyprus-blue truncate">
                    Ομαδικό Περπάτημα στην Παλιά Λευκωσία
                  </p>
                  <div className="ml-2 flex-shrink-0 flex">
                    <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Αύριο, 09:00
                    </p>
                  </div>
                </div>
                <div className="mt-2 sm:flex sm:justify-between">
                  <div className="sm:flex">
                    <p className="flex items-center text-sm text-gray-500">
                      <i className="fa-solid fa-users mr-1.5 text-gray-400"></i>
                      8 Συμμετέχοντες
                    </p>
                  </div>
                </div>
              </div>
            </li>
            <li>
              <div className="px-4 py-4 sm:px-6 hover:bg-gray-50 cursor-pointer">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-cyprus-blue truncate">
                    Εργαστήρι Μαγειρικής: Κυπριακές Πίτες
                  </p>
                  <div className="ml-2 flex-shrink-0 flex">
                    <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                      Σάββατο, 17:00
                    </p>
                  </div>
                </div>
                 <div className="mt-2 sm:flex sm:justify-between">
                  <div className="sm:flex">
                    <p className="flex items-center text-sm text-gray-500">
                      <i className="fa-solid fa-video mr-1.5 text-gray-400"></i>
                      Online Zoom
                    </p>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};