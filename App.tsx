import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Landing } from './components/Landing';
import { ProfileSetup } from './components/ProfileSetup';
import { Dashboard } from './components/Dashboard';
import { Chat } from './components/Chat';
import { UserRole, UserProfile } from './types';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('landing');
  const [userRole, setUserRole] = useState<UserRole | undefined>(undefined);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [chatRecipient, setChatRecipient] = useState<{id: string, name: string} | null>(null);

  const handleStart = (role: UserRole) => {
    setUserRole(role);
    setCurrentPage('profile-setup');
  };

  const handleProfileComplete = (profile: UserProfile) => {
    setUserProfile(profile);
    setCurrentPage('dashboard');
  };

  const handleNavigate = (page: string) => {
    if (page === 'landing') {
        // Reset if going home
        setCurrentPage('landing');
        setUserRole(undefined);
        setUserProfile(null);
    } else {
        setCurrentPage(page);
    }
  };

  const handleChatSelect = (matchId: string, matchName: string) => {
      setChatRecipient({ id: matchId, name: matchName });
  };

  return (
    <div className="min-h-screen bg-soft-cream font-sans">
      <Navbar 
        currentPage={currentPage} 
        onNavigate={handleNavigate} 
        userRole={userRole}
      />

      <main className="pb-10">
        {currentPage === 'landing' && (
          <Landing onStart={handleStart} />
        )}

        {currentPage === 'profile-setup' && userRole && (
          <ProfileSetup role={userRole} onComplete={handleProfileComplete} />
        )}

        {currentPage === 'dashboard' && userProfile && (
          <Dashboard currentUser={userProfile} onChatSelect={handleChatSelect} />
        )}
        
        {/* Simple toggle for chat page/modal logic */}
        {currentPage === 'chat' && (
            <div className="flex items-center justify-center h-[80vh]">
                <div className="text-center">
                    <i className="fa-solid fa-comments text-6xl text-gray-300 mb-4"></i>
                    <p className="text-gray-500">Επιλέξτε μια αντιστοίχιση από τον πίνακα για να ξεκινήσετε συνομιλία.</p>
                    <button 
                        onClick={() => setCurrentPage('dashboard')}
                        className="mt-4 text-cyprus-blue underline"
                    >
                        Πίσω στον Πίνακα
                    </button>
                </div>
            </div>
        )}
      </main>

      {/* Chat Modal Overlay */}
      {chatRecipient && (
        <Chat 
            recipientName={chatRecipient.name} 
            onClose={() => setChatRecipient(null)} 
        />
      )}

      <footer className="bg-white border-t border-gray-200 py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">© 2025 GENCONNECT CY. Με αγάπη για την Κύπρο.</p>
            <div className="flex space-x-6 mt-4 md:mt-0 text-gray-400">
                <i className="fa-brands fa-facebook hover:text-cyprus-blue cursor-pointer"></i>
                <i className="fa-brands fa-instagram hover:text-cyprus-copper cursor-pointer"></i>
                <i className="fa-brands fa-twitter hover:text-blue-400 cursor-pointer"></i>
            </div>
        </div>
      </footer>
    </div>
  );
};

export default App;