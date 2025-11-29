# SaveMate Frontend

A modern, responsive financial management app for children and teens with parental controls.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Deploy to GitHub Pages
npm run deploy
```

## 🏗️ Tech Stack

- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite 6
- **UI Components**: Radix UI + Tailwind CSS
- **Icons**: Lucide React
- **HTTP Client**: Axios
- **PWA**: Vite PWA Plugin

## 📁 Project Structure

```
Frontend/
├── src/
│   ├── components/       # React components
│   │   ├── ui/          # Reusable UI components
│   │   └── figma/       # Figma-imported components
│   ├── services/        # API service layer
│   │   ├── authService.ts
│   │   ├── transactionService.ts
│   │   └── goalService.ts
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Utilities and API config
│   ├── assets/          # Images and static files
│   └── styles/          # Global styles
├── public/              # Static assets
└── dist/                # Production build
```

## 🔧 Configuration

### Environment Variables

Create `.env` files for different environments:

**`.env.development`**
```
VITE_BACKEND_URL=http://localhost:4000
```

**`.env.production`**
```
VITE_BACKEND_URL=https://savemate-mini-project-1.onrender.com
```

### Vite Configuration

The `vite.config.ts` is configured for:
- GitHub Pages deployment with base path
- PWA support
- Path aliases (`@/` → `src/`)
- React Fast Refresh

## 🌐 API Integration

The frontend connects to the SaveMate backend API:

### Services Available

- **Authentication**: Login, signup, logout
- **Transactions**: Create, read, delete transactions
- **Goals**: Manage savings goals
- **Stats**: Get spending statistics

### Example Usage

```typescript
import { transactionService } from './services/transactionService';

// Get transactions
const transactions = await transactionService.getTransactions();

// Create transaction
await transactionService.createTransaction({
  amount: 100,
  category: 'Food',
  description: 'Lunch',
  type: 'expense'
});
```

## 🎨 Features

- ✅ Dashboard with spending overview
- ✅ Budget tracking by category
- ✅ Savings goals management
- ✅ Rewards system
- ✅ Emergency mode
- ✅ Parental controls
- ✅ PWA support (offline capable)
- ✅ Responsive design

## 🐛 Troubleshooting

### Build Issues

If you encounter import errors:
```bash
node fix-all-imports.js
npm run build
```

### API Connection Issues

1. Check backend is running
2. Verify CORS configuration
3. Check environment variables
4. Inspect browser console for errors

## 📦 Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

### Quick Deploy to GitHub Pages

```bash
npm run deploy
```

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## 📄 License

Private project for SaveMate Mini Project
