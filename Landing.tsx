import React from 'react';
import { UserRole } from '../types';

interface LandingProps {
  onStart: (role: UserRole) => void;
}

export const Landing: React.FC<LandingProps> = ({ onStart }) => {
  return (
    <div className="flex flex-col w-full overflow-x-hidden">
      
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-soft-cream via-white to-blue-50 pt-16 pb-24 lg:pt-32 lg:pb-40 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="lg:grid lg:grid-cols-12 lg:gap-16 items-center">
            
            {/* Text Content */}
            <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
              <div className="inline-flex items-center px-3 py-1 rounded-full border border-cyprus-blue/20 bg-blue-50 text-cyprus-blue text-xs font-bold tracking-wide uppercase mb-6 shadow-sm">
                <span className="w-2 h-2 bg-cyprus-copper rounded-full mr-2 animate-pulse"></span>
                ΝΕΑ ΠΛΑΤΦΟΡΜΑ ΣΤΗΝ ΚΥΠΡΟ
              </div>
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl mb-6">
                <span className="block">Ενώνοντας Γενιές,</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyprus-blue to-blue-600">
                  Χτίζοντας Σχέσεις
                </span>
              </h1>
              <p className="mt-4 text-lg text-gray-600 sm:mt-5 sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0 leading-relaxed">
                Το <strong>GENCONNECT CY</strong> είναι εδώ για να γεφυρώσει το χάσμα. Συνδέουμε την εμπειρία των μεγαλύτερων με τον ενθουσιασμό των νέων για αλληλοβοήθεια, συντροφιά και ανταλλαγή γνώσεων.
              </p>
              
              <div className="mt-10 sm:mt-12">
                <p className="text-sm font-bold text-gray-400 mb-4 uppercase tracking-wider sm:text-center lg:text-left">
                  Επιλέξτε το προφίλ σας για να ξεκινήσετε
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <button
                    onClick={() => onStart(UserRole.SENIOR)}
                    className="group relative flex items-center p-4 pr-6 bg-white border-2 border-cyprus-copper/30 rounded-2xl hover:border-cyprus-copper hover:bg-orange-50 transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-1"
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                      <i className="fa-solid fa-person-cane text-cyprus-copper text-xl"></i>
                    </div>
                    <div className="text-left">
                      <span className="block text-lg font-bold text-gray-900">Είμαι 65+</span>
                      <span className="block text-sm text-gray-500">Αναζητώ παρέα ή βοήθεια</span>
                    </div>
                  </button>

                  <button
                    onClick={() => onStart(UserRole.YOUTH)}
                    className="group relative flex items-center p-4 pr-6 bg-white border-2 border-cyprus-blue/30 rounded-2xl hover:border-cyprus-blue hover:bg-blue-50 transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-1"
                  >
                     <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                      <i className="fa-solid fa-hands-holding-circle text-cyprus-blue text-xl"></i>
                    </div>
                    <div className="text-left">
                      <span className="block text-lg font-bold text-gray-900">Είμαι Νέος/α</span>
                      <span className="block text-sm text-gray-500">Θέλω να προσφέρω & να μάθω</span>
                    </div>
                  </button>
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="mt-16 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
              <div className="relative mx-auto w-full rounded-2xl shadow-xl lg:max-w-md overflow-hidden group">
                 <div className="absolute inset-0 bg-cyprus-blue mix-blend-color opacity-10 group-hover:opacity-0 transition-opacity duration-500"></div>
                <img
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                  src="https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                  alt="Happy intergenerational interaction"
                />
                 {/* Float card */}
                 <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-white/50">
                    <div className="flex items-center space-x-3">
                        <div className="flex -space-x-2">
                             <img className="w-8 h-8 rounded-full border-2 border-white" src="https://randomuser.me/api/portraits/women/66.jpg" alt=""/>
                             <img className="w-8 h-8 rounded-full border-2 border-white" src="https://randomuser.me/api/portraits/men/32.jpg" alt=""/>
                        </div>
                        <p className="text-sm font-medium text-gray-800">Ασφαλείς συναντήσεις σε όλη την Κύπρο</p>
                    </div>
                 </div>
              </div>
              
              {/* Decorative Elements */}
              <div className="absolute -top-12 -right-12 -z-10 w-64 h-64 bg-cyprus-copper/20 rounded-full blur-3xl opacity-60"></div>
              <div className="absolute -bottom-12 -left-12 -z-10 w-64 h-64 bg-cyprus-blue/20 rounded-full blur-3xl opacity-60"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Features / Vision Section (Replacing Stats) */}
      <div className="bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-base text-cyprus-copper font-semibold tracking-wide uppercase">Γιατι να γινετε μελος</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Μια κοινότητα φτιαγμένη με ασφάλεια και αγάπη
            </p>
          </div>

          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
             {/* Feature 1 */}
             <div className="flex flex-col items-center text-center p-6 bg-soft-cream rounded-2xl transition-transform hover:-translate-y-1">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 text-cyprus-blue mb-6">
                   <i className="fa-solid fa-shield-heart text-2xl"></i>
                </div>
                <h3 className="text-xl font-bold text-gray-900">Απόλυτη Ασφάλεια</h3>
                <p className="mt-4 text-base text-gray-500">
                   Όλα τα προφίλ ελέγχονται. Η πλατφόρμα μας διασφαλίζει ότι κάθε επικοινωνία είναι ασφαλής και αξιόπιστη.
                </p>
             </div>

             {/* Feature 2 */}
             <div className="flex flex-col items-center text-center p-6 bg-soft-cream rounded-2xl transition-transform hover:-translate-y-1">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-orange-100 text-cyprus-copper mb-6">
                   <i className="fa-solid fa-wand-magic-sparkles text-2xl"></i>
                </div>
                <h3 className="text-xl font-bold text-gray-900">Έξυπνο Ταίριασμα</h3>
                <p className="mt-4 text-base text-gray-500">
                   Το AI μας δεν κοιτάζει μόνο την τοποθεσία, αλλά και τα ενδιαφέροντα, δημιουργώντας ουσιαστικές φιλίες.
                </p>
             </div>

             {/* Feature 3 */}
             <div className="flex flex-col items-center text-center p-6 bg-soft-cream rounded-2xl transition-transform hover:-translate-y-1">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-green-100 text-green-600 mb-6">
                   <i className="fa-solid fa-heart-circle-bolt text-2xl"></i>
                </div>
                <h3 className="text-xl font-bold text-gray-900">Αμφίδρομη Προσφορά</h3>
                <p className="mt-4 text-base text-gray-500">
                   Δεν είναι μόνο εθελοντισμός. Είναι ανταλλαγή γνώσεων, ιστοριών και εμπειριών ζωής που ωφελεί και τους δύο.
                </p>
             </div>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="py-16 bg-gradient-to-b from-white to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Πώς λειτουργεί το GENCONNECT
            </h2>
            <p className="mt-4 max-w-2xl text-lg text-gray-500 mx-auto">
              Τρία απλά βήματα για να γίνετε μέλος της νέας μας παρέας.
            </p>
          </div>

          <div className="mt-16 relative">
             {/* Connecting line for large screens */}
             <div className="hidden md:block absolute top-1/2 left-10 right-10 h-0.5 bg-gray-200 -translate-y-1/2 z-0"></div>

            <div className="grid grid-cols-1 gap-12 md:grid-cols-3 relative z-10">
              {/* Step 1 */}
              <div className="group bg-white p-8 rounded-2xl shadow-lg border border-gray-100 text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="inline-flex items-center justify-center p-3 bg-cyprus-blue text-white rounded-xl shadow-lg mb-6 group-hover:scale-110 transition-transform">
                  <i className="fa-solid fa-user-pen text-2xl"></i>
                </div>
                <h3 className="text-xl font-bold text-gray-900">1. Δημιουργία Προφίλ</h3>
                <p className="mt-4 text-gray-600">
                  Πείτε μας λίγα λόγια για εσάς, τα χόμπι σας και την πόλη σας (Λευκωσία, Λεμεσός, κτλ).
                </p>
              </div>

              {/* Step 2 */}
              <div className="group bg-white p-8 rounded-2xl shadow-lg border border-gray-100 text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="inline-flex items-center justify-center p-3 bg-cyprus-copper text-white rounded-xl shadow-lg mb-6 group-hover:scale-110 transition-transform">
                  <i className="fa-solid fa-people-arrows text-2xl"></i>
                </div>
                <h3 className="text-xl font-bold text-gray-900">2. Αυτόματη Σύνδεση</h3>
                <p className="mt-4 text-gray-600">
                  Βρίσκουμε το ιδανικό ταίρι για εσάς με βάση τα κοινά ενδιαφέροντα και τις ανάγκες.
                </p>
              </div>

              {/* Step 3 */}
              <div className="group bg-white p-8 rounded-2xl shadow-lg border border-gray-100 text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="inline-flex items-center justify-center p-3 bg-green-600 text-white rounded-xl shadow-lg mb-6 group-hover:scale-110 transition-transform">
                  <i className="fa-solid fa-comments text-2xl"></i>
                </div>
                <h3 className="text-xl font-bold text-gray-900">3. Γνωριμία</h3>
                <p className="mt-4 text-gray-600">
                  Μιλήστε με ασφάλεια και κανονίστε την πρώτη σας συνάντηση ή δραστηριότητα.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-cyprus-blue relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-cyprus-copper/20 rounded-full blur-3xl"></div>
          
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 lg:flex lg:items-center lg:justify-between relative z-10">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">Είστε έτοιμοι να ξεκινήσετε;</span>
            <span className="block text-blue-200 font-medium text-2xl mt-1">Γίνετε από τους πρώτους που θα συνδεθούν.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0 gap-4">
            <div className="inline-flex rounded-md shadow">
              <button
                onClick={() => onStart(UserRole.SENIOR)}
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-bold rounded-xl text-cyprus-blue bg-white hover:bg-gray-50 transition-colors"
              >
                Εγγραφή 65+
              </button>
            </div>
            <div className="inline-flex rounded-md shadow">
              <button
                onClick={() => onStart(UserRole.YOUTH)}
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-bold rounded-xl text-white bg-cyprus-copper hover:bg-orange-600 transition-colors"
              >
                Εγγραφή Νέου/ας
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};