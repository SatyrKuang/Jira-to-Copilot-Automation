import { useState } from 'react';

// Language interface
interface Language {
  code: string;
  name: string;
  flag?: string;
}

// Priority languages in the specified order
const PRIORITY_LANGUAGES: Language[] = [
  { code: 'EN', name: 'English' },
  { code: 'ZH', name: '中文(简体)' },
  { code: 'ZH_HANT', name: '中文(繁體)' },
  { code: 'TH', name: 'ไทย' },
  { code: 'BM', name: 'Bahasa Melayu' },
  { code: 'IN', name: 'Bahasa Indonesia' },
  { code: 'VN', name: 'Tiếng Việt' },
  { code: 'PH', name: 'Filipino' },
  { code: 'BN', name: 'বাংলা' },
];

// Other languages (example set)
const OTHER_LANGUAGES: Language[] = [
  { code: 'ES', name: 'Español' },
  { code: 'FR', name: 'Français' },
  { code: 'DE', name: 'Deutsch' },
  { code: 'JA', name: '日本語' },
  { code: 'KO', name: '한국어' },
];

const LanguageDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(PRIORITY_LANGUAGES[0]);

  const handleLanguageSelect = (language: Language) => {
    setSelectedLanguage(language);
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className="inline-flex justify-between w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          id="language-menu"
          aria-expanded={isOpen}
          aria-haspopup="true"
          onClick={toggleDropdown}
        >
          <span className="flex items-center">
            <span className="mr-2">{selectedLanguage.code}</span>
            <span>{selectedLanguage.name}</span>
          </span>
          <svg
            className={`-mr-1 ml-2 h-5 w-5 transform transition-transform duration-200 ${
              isOpen ? 'rotate-180' : ''
            }`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="language-menu">
            {/* Priority Languages */}
            {PRIORITY_LANGUAGES.map((language) => (
              <button
                key={language.code}
                className={`${
                  selectedLanguage.code === language.code
                    ? 'bg-indigo-100 text-indigo-900'
                    : 'text-gray-700'
                } group flex items-center px-4 py-2 text-sm w-full text-left hover:bg-gray-100 hover:text-gray-900`}
                role="menuitem"
                onClick={() => handleLanguageSelect(language)}
              >
                <span className="mr-3 font-medium text-indigo-600">{language.code}</span>
                <span>{language.name}</span>
              </button>
            ))}
            
            {/* Separator */}
            {OTHER_LANGUAGES.length > 0 && (
              <div className="border-t border-gray-100 my-1"></div>
            )}
            
            {/* Other Languages */}
            {OTHER_LANGUAGES.map((language) => (
              <button
                key={language.code}
                className={`${
                  selectedLanguage.code === language.code
                    ? 'bg-indigo-100 text-indigo-900'
                    : 'text-gray-700'
                } group flex items-center px-4 py-2 text-sm w-full text-left hover:bg-gray-100 hover:text-gray-900`}
                role="menuitem"
                onClick={() => handleLanguageSelect(language)}
              >
                <span className="mr-3 font-medium text-gray-500">{language.code}</span>
                <span>{language.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageDropdown;