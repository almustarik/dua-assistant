import { Book, MessageSquare, Moon, HelpingHand as PrayingHands, Sun } from 'lucide-react';
import { useState } from 'react';
import AskQuestion from './components/AskQuestion';
import DuaList from './components/DuaList';

function App() {
  const [activeTab, setActiveTab] = useState<'duas' | 'ask'>('duas');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <nav className="p-4 text-white bg-emerald-600 dark:bg-emerald-800">
        <div className="container flex items-center justify-between mx-auto">
          <div className="flex items-center space-x-2">
            <PrayingHands className="w-6 h-6" />
            <h1 className="text-xl font-bold">Islamic Dua Assistant</h1>
          </div>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-emerald-700 dark:hover:bg-emerald-900"
          >
            {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      <div className="container px-4 py-8 mx-auto">
        <div className="flex justify-center mb-8">
          <div className="inline-flex border border-gray-200 rounded-lg dark:border-gray-700">
            <button
              onClick={() => setActiveTab('duas')}
              className={`px-4 py-2 rounded-l-lg flex items-center space-x-2 ${
                activeTab === 'duas'
                  ? 'bg-emerald-600 dark:bg-emerald-700 text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300'
              }`}
            >
              <Book className="w-4 h-4" />
              <span>Daily Duas</span>
            </button>
            <button
              onClick={() => setActiveTab('ask')}
              className={`px-4 py-2 rounded-r-lg flex items-center space-x-2 ${
                activeTab === 'ask'
                  ? 'bg-emerald-600 dark:bg-emerald-700 text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>Ask Question</span>
            </button>
          </div>
        </div>

        {activeTab === 'duas' ? <DuaList /> : <AskQuestion />}
      </div>
    </div>
  );
}

export default App;