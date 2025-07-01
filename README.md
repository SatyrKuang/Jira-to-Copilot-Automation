# Jira-to-Copilot-Automation

A modern web application built with the latest versions of React, TypeScript, Vite, and Tailwind CSS.

## 🚀 Tech Stack

- **React 19.1.0** - Latest React with modern features
- **TypeScript 5.8.3** - Type-safe JavaScript
- **Vite 7.0.0** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **ESLint** - Code linting and formatting

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/SatyrKuang/Jira-to-Copilot-Automation.git
cd Jira-to-Copilot-Automation
```

2. Install dependencies:
```bash
npm install
```

## 🛠️ Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173/`

## 🏗️ Build

Build for production:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## 🧪 Linting

Run ESLint to check for code quality issues:
```bash
npm run lint
```

## 🎨 Features

- ⚡ Hot Module Replacement (HMR)
- 🎯 TypeScript support out of the box
- 🎨 Tailwind CSS for styling
- 📱 Responsive design
- 🔧 Modern development tooling
- 🛡️ **Login Rate Limiting** - Prevents brute-force attacks with configurable attempt limits and lockout periods

## 🔒 Security Features

### Login Rate Limiting

The application includes a robust rate limiting system to prevent brute-force attacks on login attempts:

**Features:**
- Configurable maximum attempts before lockout (default: 5 attempts)
- Configurable lockout duration (default: 15 minutes)
- Persistent storage across browser sessions using localStorage
- Real-time countdown during lockout period
- Automatic reset after lockout expires
- Manual reset on successful login

**Usage:**
1. Click "Show Login Demo" in the main application
2. Try entering incorrect credentials multiple times
3. After 5 failed attempts, the account will be locked for 15 minutes
4. Use demo credentials (username: `demo`, password: `password`) to test successful login

**Demo:**
Open `demo/rate-limiting-demo.html` in your browser for an interactive demonstration of the rate limiting functionality.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.
