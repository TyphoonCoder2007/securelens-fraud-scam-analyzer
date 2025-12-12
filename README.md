# 🛡️ SecureLens - AI Fraud & Scam Analyzer

<div align="center">

![SecureLens Banner](https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6)

**Advanced AI-powered cybersecurity platform for real-time scam detection and prevention**

[![React](https://img.shields.io/badge/React-19.2.3-61DAFB?style=flat-square&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.2-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Gemini AI](https://img.shields.io/badge/Gemini-2.5_Flash-4285F4?style=flat-square&logo=google)](https://ai.google.dev/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](LICENSE)
[![Vite](https://img.shields.io/badge/Build-Vite-646CFF?style=flat-square&logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Styles-Tailwind-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)

[Demo](https://securelens-demo.vercel.app) · [Report Bug](https://github.com/yourusername/securelens/issues) · [Request Feature](https://github.com/yourusername/securelens/issues)

</div>

## ✨ Overview

**SecureLens** is an enterprise-grade cybersecurity platform that leverages cutting-edge AI to protect users from digital threats. Using Google's Gemini 2.5 Flash model, it analyzes emails, messages, URLs, and images in real-time to detect phishing attempts, financial scams, impersonation attacks, and other fraudulent activities.

## 🚀 Key Features

### 🔍 **Multi-Modal Threat Detection**
- **📧 Email Analysis**: Scan Gmail inboxes or paste suspicious emails
- **🔗 URL Intelligence**: Real-time domain reputation, SSL verification, WHOIS lookup
- **🖼️ Image OCR**: Extract and analyze text from screenshots
- **💬 Text Analysis**: Detect phishing patterns in messages and documents

### 🧠 **Advanced AI Engine**
- **Google Gemini 2.5 Flash**: State-of-the-art fraud pattern recognition
- **Google Search Grounding**: Enhanced accuracy with real-time web data
- **Contextual Understanding**: Identifies urgency tactics and emotional manipulation
- **Audio Summaries**: TTS-powered verbal security reports

### 📊 **Comprehensive Risk Assessment**
- **Dynamic Risk Scoring**: 0-100 scale with visual gauge
- **Red Flag Categorization**: Severity-based classification (Low/Medium/High)
- **Technical Analysis**: Domain, SSL, grammar, sender reputation
- **Actionable Insights**: Step-by-step safety recommendations

### 💬 **Interactive Security Assistant**
- **AI Chat Interface**: Context-aware Q&A about security findings
- **Feedback System**: Like/Dislike responses for AI improvement
- **Suggested Prompts**: Quick access to common security questions
- **Real-time Explanations**: Simplified technical term breakdowns

### 🎨 **Modern Developer Experience**
- **Type-Safe Codebase**: Full TypeScript coverage
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Real-time Animations**: Smooth transitions and interactive elements
- **Modular Architecture**: Clean, maintainable component structure

## 📸 Screenshots

| Dashboard | Email Scanner | Analysis Report |
|-----------|---------------|-----------------|
| ![Dashboard](https://via.placeholder.com/400x225/1e293b/ffffff?text=Dashboard+View) | ![Email Scanner](https://via.placeholder.com/400x225/1e293b/ffffff?text=Gmail+Integration) | ![Analysis Report](https://via.placeholder.com/400x225/1e293b/ffffff?text=Risk+Assessment) |

## 🏗️ Architecture

```mermaid
graph TB
    A[User Input] --> B{Analysis Type}
    B --> C[Text/Email]
    B --> D[URL]
    B --> E[Image]
    
    C --> F[Gemini AI Processing]
    D --> G[Domain Intelligence]
    E --> H[OCR Extraction]
    
    F --> I[Pattern Detection]
    G --> J[SSL/WHOIS Check]
    H --> F
    
    I --> K[Risk Assessment]
    J --> K
    
    K --> L[Visual Report]
    K --> M[Audio Summary]
    K --> N[AI Assistant]
    
    L --> O[User Dashboard]
    M --> O
    N --> O
🛠️ Tech Stack
Category	Technology
Frontend	React 19, TypeScript, Vite
Styling	Tailwind CSS, Lucide Icons
Charts	Recharts
AI/ML	Google Gemini 2.5 Flash, Google Search Grounding
Auth	Google Identity Services, OAuth 2.0
Audio	Web Audio API, Gemini TTS
Build	Vite, ES Modules
📁 Project Structure
text
securelens/
├── src/
│   ├── components/           # React Components
│   │   ├── AnalyzerForm.tsx  # Multi-mode input form
│   │   ├── AnalysisReport.tsx # Detailed results display
│   │   ├── RiskGauge.tsx     # Interactive risk visualization
│   │   ├── MailScanner.tsx   # Gmail inbox integration
│   │   ├── ChatWidget.tsx    # AI assistant interface
│   │   ├── AboutModal.tsx    # Product information
│   │   └── ...              # Additional components
│   ├── services/
│   │   └── geminiService.ts  # AI integration layer
│   ├── types.ts             # TypeScript interfaces
│   ├── App.tsx              # Root application
│   └── index.tsx            # Entry point
├── public/                  # Static assets
├── index.html              # Main HTML template
├── vite.config.ts          # Build configuration
├── tsconfig.json          # TypeScript configuration
└── package.json           # Dependencies
🚀 Quick Start
Prerequisites
Node.js 18+

Google Cloud Account (for Gemini API)

Google Cloud Console Project (for Gmail API Client ID)

Installation
Clone the repository

bash
git clone https://github.com/yourusername/securelens.git
cd securelens
Install dependencies

bash
npm install
Set up environment variables

bash
cp .env.local.example .env.local
Edit .env.local:

env
GEMINI_API_KEY=your_google_gemini_api_key_here
Configure Gmail API (Optional)

Visit Google Cloud Console

Create a new project or select existing

Enable Gmail API and Google Identity Services

Configure OAuth 2.0 credentials with authorized origins

Copy Client ID to settings in app

Start development server

bash
npm run dev
Open in browser

text
http://localhost:3000
🔧 Configuration
Gemini API Setup
Visit Google AI Studio

Create API key

Add key to .env.local as GEMINI_API_KEY

Gmail Integration Setup
Enable Gmail API in Google Cloud Console

Create OAuth 2.0 Client ID (Web Application)

Add authorized origins: http://localhost:3000, https://yourdomain.com

Enter Client ID in app settings

Deployment
bash
# Build for production
npm run build

# Preview production build
npm run preview

# Deploy to Vercel
vercel deploy
📊 API Integration
Core Services
typescript
// Text/Image Analysis
import { analyzeContent } from './services/geminiService';

const result = await analyzeContent(
  "Suspicious message text",
  "optional_image_base64"
);

// Audio Summary
import { generateAudioSummary } from './services/geminiService';
const audio = await generateAudioSummary("Analysis summary text");

// Chat Assistant
import { sendChatResponse } from './services/geminiService';
const response = await sendChatResponse(
  chatHistory,
  userQuestion,
  analysisContext
);
Analysis Response Schema
typescript
interface AnalysisResult {
  riskScore: number; // 0-100
  riskLevel: 'Safe' | 'Low Risk' | 'Medium Risk' | 'High Risk' | 'Critical';
  scamType: string;
  summary: string;
  redFlags: Array<{
    title: string;
    description: string;
    severity: 'low' | 'medium' | 'high';
  }>;
  technicalDetails: {
    domainAnalysis: string;
    sslAnalysis?: string;
    grammarAnalysis: string;
    urgencyAnalysis: string;
    senderAnalysis: string;
  };
  recommendations: string[];
  externalReferences?: Array<{
    title: string;
    uri: string;
  }>;
}
🧪 Testing
bash
# Run in development mode
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Type checking
npx tsc --noEmit
🤝 Contributing
We welcome contributions! Please see our Contributing Guidelines for details.

Fork the repository

Create a feature branch (git checkout -b feature/AmazingFeature)

Commit changes (git commit -m 'Add AmazingFeature')

Push to branch (git push origin feature/AmazingFeature)

Open a Pull Request

📄 License
Distributed under the MIT License. See LICENSE for more information.

👥 Team
Nirmalya - Lead Developer & Architect

Contributors - List of contributors

🙏 Acknowledgments
Google Gemini AI for advanced AI capabilities

Google Cloud Platform for infrastructure

Vite for blazing-fast build tooling

Tailwind CSS for utility-first styling

Lucide Icons for beautiful iconography

🔗 Links
Live Demo: securelens-demo.vercel.app

Report Bug: GitHub Issues

Request Feature: GitHub Issues

Documentation: Coming Soon

<div align="center">
Made with ❤️ by the SecureLens Team

Protecting the digital world, one analysis at a time

https://api.star-history.com/svg?repos=yourusername/securelens&type=Date

</div> ```
This README features:

Modern Visual Design - Professional badges, dividers, and spacing

Comprehensive Feature Breakdown - Detailed sections for each major feature

Architecture Diagram - Mermaid.js flowchart showing system flow

Tech Stack Table - Clear technology categorization

Project Structure - Detailed file organization

Quick Start Guide - Step-by-step setup instructions

API Documentation - Code examples and response schemas

Visual Placeholders - Ready for screenshot integration

Contributing Guidelines - Clear path for community involvement

Professional Acknowledgments - Credits for dependencies

Badges & Shields - Visual indicators for tech stack

Mobile-Responsive Layout - Proper markdown formatting

License Information - MIT license declaration

Team Section - Credit to contributors

Star History Chart - Visual GitHub popularity tracker
