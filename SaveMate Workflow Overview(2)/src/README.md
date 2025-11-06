# SaveMate

SaveMate is a comprehensive financial management app designed specifically for students, featuring secure bank account linking, AI-powered budget management, parental controls, and gamified learning experiences.

## Features

### 🔐 Security & Parental Controls
- **Secure Bank Linking**: Bank-level encryption for account connections
- **Parental Oversight**: Real-time spending alerts and controls
- **OTP Verification**: Parent approval required for non-essential spending when over budget
- **Emergency Mode**: Instant access to emergency funds while blocking unnecessary spending

### 💰 Smart Financial Management
- **AI-Powered Budgeting**: Intelligent spending limit suggestions
- **Real-time Expense Tracking**: Monitor spending patterns across categories
- **Automatic Savings**: Set up recurring transfers to goals
- **Indian Rupee Support**: Complete localization for Indian currency

### 🎯 Goals & Gamification
- **Savings Goals**: Create and track progress toward financial targets
- **Achievement System**: Earn badges and points for good financial habits
- **Streak Tracking**: Maintain saving and budgeting streaks
- **Group Challenges**: Family savings challenges with shared progress

### 📱 Mobile-First Design
- **Responsive Web App**: Mobile-optimized design with native-like experience
- **Intuitive Navigation**: Bottom tab navigation with clear visual hierarchy
- **Cross-Platform**: Works on all devices with modern browsers
- **Progressive Web App**: Can be installed like a native app

## Technology Stack

- **React**: Modern web development with hooks and functional components
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Beautiful and consistent icons
- **Shadcn/ui**: High-quality, accessible UI components
- **Vite**: Fast build tool and development server

## Getting Started

### Prerequisites

- Node.js (16+)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd SaveMate
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## Project Structure

```
SaveMate/
├── components/
│   ├── AccountSetup.tsx      # Multi-step onboarding flow
│   ├── Dashboard.tsx         # Main overview screen
│   ├── Goals.tsx            # Savings goals management
│   ├── Budget.tsx           # Budget tracking and analysis
│   ├── Rewards.tsx          # Gamification and achievements
│   ├── SettingsPanel.tsx    # User settings and preferences
│   ├── EmergencyMode.tsx    # Emergency spending controls
│   └── ui/                  # Reusable UI components
├── styles/
│   └── globals.css          # Global styles and design tokens
├── App.tsx                  # Main app component with navigation
├── package.json            # Dependencies and scripts
└── README.md               # This file
```

## Key Components

### Dashboard
- Weekly budget overview with progress visualization
- Recent transaction history with categorization
- AI-powered spending insights and recommendations
- Quick access to emergency mode and goal creation

### Account Setup
- Progressive disclosure onboarding flow
- Personal information collection with validation
- Secure bank account linking with multiple bank support
- Parental control configuration with spending limits

### Goals
- Visual progress tracking for savings targets
- Automatic savings scheduling with weekly/monthly options
- Group savings challenges with family collaboration
- Smart saving tips and round-up suggestions

### Budget
- Category-wise spending breakdown with visual representations
- Real-time budget utilization tracking
- Overspending alerts with parental lock functionality
- Essential vs non-essential category classification

### Rewards
- Point-based achievement system with multiple badges
- Daily and weekly challenges with progress tracking
- Redeemable rewards catalog with point costs
- Streak maintenance for bonus multipliers

### Emergency Mode
- Instant blocking of non-essential spending categories
- Emergency fund access with immediate availability
- Parent verification system for category unblocking
- Emergency contact integration for quick access

## Currency Localization

The app is fully localized for Indian Rupees (₹) with:
- Proper number formatting with Indian comma notation
- Currency symbols displayed consistently throughout
- Regional banking integration support
- Local payment method compatibility

## Security Features

- **Bank-Level Encryption**: All financial data is encrypted using industry standards
- **Biometric Authentication**: Fingerprint and Face ID support for app access
- **Parental Verification**: Two-factor authentication for sensitive operations
- **Emergency Protocols**: Secure emergency fund access without compromising security

## Design System

SaveMate uses a consistent design system with:
- **Modern UI Components**: Built with Shadcn/ui for consistency and accessibility
- **Tailwind CSS**: Utility-first styling for rapid development
- **Mobile-First**: Designed primarily for mobile with desktop support
- **Dark/Light Mode**: Supports both color schemes
- **Accessible**: WCAG compliant components and interactions

## Development

### Adding New Features

1. Create component files in the `/components` directory
2. Import and integrate in `App.tsx`
3. Update navigation if needed
4. Add proper TypeScript types
5. Test on various screen sizes

### Styling Guidelines

- Use Tailwind CSS classes for styling
- Follow the established design tokens in `styles/globals.css`
- Maintain consistent spacing and typography
- Ensure responsive design patterns
- Test accessibility compliance

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation for common solutions

---

Built with ❤️ for smart savers everywhere