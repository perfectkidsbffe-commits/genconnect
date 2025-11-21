import React, { useState } from 'react';
import { UserRole, UserProfile } from '../types';

interface ProfileSetupProps {
  role: UserRole;
  onComplete: (profile: UserProfile) => void;
}

export const ProfileSetup: React.FC<ProfileSetupProps> = ({ role, onComplete }) => {
  const [formData, setFormData] = useState<UserProfile>({
    name: '',
    age: role === UserRole.SENIOR ? 70 : 25,
    role: role,
    location: 'Λευκωσία',
    interests: [],
    languages: ['Ελληνικά'],
    needsOrSkills: '',
    bio: ''
  });

  const cities = ['Λευκωσία', 'Λεμεσός', 'Λάρνακα', 'Πάφος', 'Αμμόχωστος (Ελ. Περιοχές)', 'Τρόοδος'];
  const availableInterests = ['Μαγειρική', 'Πεζοπορία', 'Σκάκι/Τάβλι', 'Τεχνολογία', 'Ιστορία', 'Μουσική', 'Κηπουρική', 'Ανάγνωση', 'Τέχνες'];

  const handleInterestToggle = (interest: string) => {
    setFormData(prev => {
      const current = prev.interests;
      if (current.includes(interest)) {
        return { ...prev, interests: current.filter(i => i !== interest) };
      } else {
        return { ...prev, interests: [...current, interest] };
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete(formData);
  };

  return (
    <div className="max-w-3xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow-xl rounded-3xl overflow-hidden border border-gray-100">
        <div className="bg-cyprus-blue py-8 px-8 text-center relative overflow-hidden">
            {/* Decorative background circles */}
            <div className="absolute top-0 left-0 -ml-10 -mt-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
            <div className="absolute bottom-0 right-0 -mr-10 -mb-10 w-32 h-32 bg-cyprus-copper/20 rounded-full blur-2xl"></div>
            
            <h2 className="text-3xl font-bold text-white relative z-10">
                {role === UserRole.SENIOR ? 'Δημιουργία Προφίλ Μέλους' : 'Δημιουργία Προφίλ Εθελοντή'}
            </h2>
            <p className="text-blue-100 mt-2 relative z-10 font-light text-lg">Συμπληρώστε τα στοιχεία για να βρούμε το καλύτερο ταίρι για εσάς.</p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="block text-sm font-bold text-cyprus-blue mb-2">Ονοματεπώνυμο</label>
              <input
                type="text"
                required
                className="block w-full border-gray-200 rounded-xl shadow-sm p-4 bg-gray-50 text-gray-800 focus:ring-2 focus:ring-cyprus-blue focus:border-transparent transition-all focus:bg-white placeholder-gray-400"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                placeholder="Π.χ. Μαρία Παπαδοπούλου"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-cyprus-blue mb-2">Ηλικία</label>
              <input
                type="number"
                required
                className="block w-full border-gray-200 rounded-xl shadow-sm p-4 bg-gray-50 text-gray-800 focus:ring-2 focus:ring-cyprus-blue focus:border-transparent transition-all focus:bg-white placeholder-gray-400"
                value={formData.age}
                onChange={e => setFormData({...formData, age: parseInt(e.target.value)})}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-cyprus-blue mb-2">Πόλη / Περιοχή</label>
            <div className="relative">
                <select
                  className="block w-full border-gray-200 rounded-xl shadow-sm p-4 bg-gray-50 text-gray-800 appearance-none focus:ring-2 focus:ring-cyprus-blue focus:border-transparent transition-all focus:bg-white cursor-pointer"
                  value={formData.location}
                  onChange={e => setFormData({...formData, location: e.target.value})}
                >
                  {cities.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
                {/* Custom arrow icon for better visibility */}
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-cyprus-blue">
                  <i className="fa-solid fa-chevron-down text-sm"></i>
                </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-cyprus-blue mb-3">Ενδιαφέροντα (Επιλέξτε τουλάχιστον 1)</label>
            <div className="flex flex-wrap gap-3">
              {availableInterests.map(interest => (
                <button
                  type="button"
                  key={interest}
                  onClick={() => handleInterestToggle(interest)}
                  className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 transform hover:-translate-y-0.5 border ${
                    formData.interests.includes(interest)
                      ? 'bg-cyprus-copper border-cyprus-copper text-white shadow-lg shadow-orange-100 ring-2 ring-cyprus-copper ring-offset-1'
                      : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-cyprus-blue/30'
                  }`}
                >
                  {interest}
                  {formData.interests.includes(interest) && <i className="ml-2 fa-solid fa-check text-xs"></i>}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-cyprus-blue mb-2">
              {role === UserRole.SENIOR ? 'Τι είδους βοήθεια ή παρέα αναζητάτε;' : 'Τι δεξιότητες ή βοήθεια μπορείτε να προσφέρετε;'}
            </label>
            <textarea
              rows={3}
              className="block w-full border-gray-200 rounded-xl shadow-sm p-4 bg-gray-50 text-gray-800 focus:ring-2 focus:ring-cyprus-blue focus:border-transparent transition-all focus:bg-white resize-none placeholder-gray-400"
              placeholder={role === UserRole.SENIOR ? "Π.χ. Θα ήθελα κάποιον να παίζουμε σκάκι ή να με βοηθά με το tablet." : "Π.χ. Μπορώ να διδάξω αγγλικά και να βοηθήσω στα ψώνια."}
              value={formData.needsOrSkills}
              onChange={e => setFormData({...formData, needsOrSkills: e.target.value})}
            />
          </div>
          
          <div>
             <label className="block text-sm font-bold text-cyprus-blue mb-2">Σύντομο Βιογραφικό</label>
              <textarea
              rows={2}
              className="block w-full border-gray-200 rounded-xl shadow-sm p-4 bg-gray-50 text-gray-800 focus:ring-2 focus:ring-cyprus-blue focus:border-transparent transition-all focus:bg-white resize-none placeholder-gray-400"
              value={formData.bio}
              placeholder="Λίγα λόγια για εσάς..."
              onChange={e => setFormData({...formData, bio: e.target.value})}
            />
          </div>

          <div className="pt-6">
            <button
              type="submit"
              disabled={formData.interests.length === 0 || !formData.name}
              className="w-full flex justify-center py-4 px-6 border border-transparent rounded-xl shadow-lg text-lg font-bold text-white bg-gradient-to-r from-cyprus-blue to-blue-700 hover:from-blue-800 hover:to-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyprus-blue disabled:opacity-50 disabled:shadow-none transform transition hover:-translate-y-1"
            >
              Ολοκλήρωση & Εύρεση Αντιστοιχιών
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};