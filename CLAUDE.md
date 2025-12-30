# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Anywhere Lead Capture Form - A single-page quiz-style form for capturing leads for English experimental classes. Built with a Typeform-like UX, showing one question at a time with smooth transitions.

## Tech Stack

- **Frontend**: React + TypeScript + Vite
- **Styling**: TailwindCSS + Framer Motion
- **Forms**: Controlled components with validation
- **Storage**: CSV/TXT file (MVP) - to be implemented server-side

## Development Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run type checking
npm run type-check

# Run linting
npm run lint
```

## Architecture Notes

### Component Structure
- **QuizForm**: Main container managing form state and navigation
- **WelcomeScreen**: Initial landing screen
- **QuestionScreen**: Displays one question at a time with proper input types
- **ThankYouScreen**: Success message after submission

### Data Flow
1. User starts on WelcomeScreen
2. Progresses through 8 questions one at a time
3. Data is collected in FormData state
4. On submission, data is sent to server endpoint
5. Success screen confirms lead capture

### Design Guidelines
- **Colors**: White background, Orange (#FF6600) for CTAs and highlights
- **Typography**: Clean sans-serif, black/gray text
- **Mobile First**: Optimized for mobile devices
- **Interactions**: Large clickable cards for options, not small radio buttons

## Project Structure

```
anyform/
├── src/
│   ├── components/
│   │   └── QuizForm/
│   │       ├── index.tsx
│   │       ├── WelcomeScreen.tsx
│   │       ├── QuestionScreen.tsx
│   │       ├── ThankYouScreen.tsx
│   │       └── questions.ts
│   ├── types/
│   └── styles/
└── PRD.md    # Product Requirements Document
```

## Important Files

- **PRD.md**: Complete product requirements and specifications
- **src/types/index.ts**: FormData interface
- **src/components/QuizForm/questions.ts**: Question configuration
- **src/components/QuizForm/**: All quiz components