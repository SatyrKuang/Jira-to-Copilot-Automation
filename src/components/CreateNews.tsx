import { useState } from 'react';

interface Language {
  code: string;
  name: string;
  localName: string;
}

interface NewsItem {
  id: string;
  title: string;
  content: string;
  language: string;
  createdAt: Date;
}

const SUPPORTED_LANGUAGES: Language[] = [
  { code: 'en', name: 'English', localName: 'English' },
  { code: 'bn', name: 'Bengali (Bangladesh)', localName: 'বাংলা' },
  { code: 'zh-TW', name: 'Traditional Chinese (Taiwan)', localName: '繁體中文' },
  { code: 'es', name: 'Spanish', localName: 'Español' },
  { code: 'fr', name: 'French', localName: 'Français' },
];

function CreateNews() {
  const [selectedLanguage, setSelectedLanguage] = useState<string>('en');
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !content.trim()) {
      alert('Please fill in both title and content');
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      const newItem: NewsItem = {
        id: Date.now().toString(),
        title: title.trim(),
        content: content.trim(),
        language: selectedLanguage,
        createdAt: new Date(),
      };

      setNewsItems(prev => [newItem, ...prev]);
      setTitle('');
      setContent('');
      setIsSubmitting(false);
      
      alert('News item created successfully!');
    }, 1000);
  };

  const getLanguageName = (code: string) => {
    const lang = SUPPORTED_LANGUAGES.find(l => l.code === code);
    return lang ? `${lang.name} (${lang.localName})` : code;
  };

  const getPlaceholders = (langCode: string) => {
    switch (langCode) {
      case 'bn':
        return {
          title: 'সংবাদের শিরোনাম...',
          content: 'সংবাদের বিস্তারিত বিবরণ লিখুন...'
        };
      case 'zh-TW':
        return {
          title: '新聞標題...',
          content: '請輸入新聞詳細內容...'
        };
      case 'es':
        return {
          title: 'Título de la noticia...',
          content: 'Escriba el contenido detallado de la noticia...'
        };
      case 'fr':
        return {
          title: 'Titre de l\'actualité...',
          content: 'Rédigez le contenu détaillé de l\'actualité...'
        };
      default:
        return {
          title: 'News title...',
          content: 'Write detailed news content...'
        };
    }
  };

  const placeholders = getPlaceholders(selectedLanguage);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Create News</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Language Selection */}
          <div>
            <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-2">
              Select Language
            </label>
            <select
              id="language"
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.name} ({lang.localName})
                </option>
              ))}
            </select>
          </div>

          {/* Title Input */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={placeholders.title}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          {/* Content Input */}
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
              Content
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={placeholders.content}
              rows={6}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-2 px-4 rounded-md font-medium transition-colors ${
              isSubmitting
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
            } text-white`}
          >
            {isSubmitting ? 'Creating...' : 'Create News'}
          </button>
        </form>
      </div>

      {/* News Items List */}
      {newsItems.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Recent News Items</h2>
          <div className="space-y-4">
            {newsItems.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-md p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                    {getLanguageName(item.language)}
                  </span>
                </div>
                <p className="text-gray-600 mb-2">{item.content}</p>
                <p className="text-xs text-gray-400">
                  Created: {item.createdAt.toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default CreateNews;