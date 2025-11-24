import React from 'react';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  userRole?: string;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate, userRole }) => {
  return (
    <nav className="bg-cyprus-blue text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center cursor-pointer" onClick={() => onNavigate('landing')}>
            <div className="flex-shrink-0">
              <i className="fa-solid fa-people-roof text-3xl text-cyprus-copper mr-2"></i>
            </div>
            <div className="font-bold text-xl tracking-wider">
              GENCONNECT <span className="text-cyprus-copper">CY</span>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {userRole && (
                <>
                  <button
                    onClick={() => onNavigate('dashboard')}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      currentPage === 'dashboard' ? 'bg-white text-cyprus-blue' : 'hover:bg-blue-700'
                    }`}
                  >
                    <i className="fa-solid fa-magnifying-glass mr-2"></i>
                    Αντιστοιχίσεις
                  </button>
                  <button
                     onClick={() => onNavigate('chat')}
                     className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                       currentPage === 'chat' ? 'bg-white text-cyprus-blue' : 'hover:bg-blue-700'
                     }`}
                  >
                     <i className="fa-solid fa-comments mr-2"></i>
                     Συνομιλίες
                  </button>
                </>
              )}
            </div>
          </div>
          <div className="md:hidden">
            {/* Mobile menu button placeholder - functional for basic nav */}
             {userRole && (
               <button onClick={() => onNavigate('dashboard')} className="text-white p-2">
                 <i className="fa-solid fa-bars text-xl"></i>
               </button>
             )}
          </div>
        </div>
      </div>
    </nav>
  );
};