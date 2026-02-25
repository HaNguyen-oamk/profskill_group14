# ☀️ Weather App with AI Chat Assistant

> **Group 14** - Deepening of Student's Professional Skills  
> Oulu University of Applied Sciences (OAMK)

A production-ready, cross-platform mobile weather application built with **React Native (Expo)** that provides real-time weather information, interactive visualizations, and an intelligent AI chat assistant powered by Groq's Llama 3.3 70B model.

![React Native](https://img.shields.io/badge/React_Native-0.81.5-61DAFB?logo=react)
![Expo](https://img.shields.io/badge/Expo-~54.0-000020?logo=expo)
![Node](https://img.shields.io/badge/Node.js-18+-339933?logo=node.js)
![Platform](https://img.shields.io/badge/Platform-iOS%20%7C%20Android%20%7C%20Web-blue)

---

## 📋 Table of Contents

- [Features](#-features)
- [Demo & Screenshots](#-demo--screenshots)
- [Prerequisites](#-prerequisites)
- [Quick Start](#-quick-start)
- [Complete Installation Guide](#-complete-installation-guide)
- [Environment Configuration](#-environment-configuration)
- [Running on Different Platforms](#-running-on-different-platforms)
- [Project Structure](#-project-structure)
- [Technologies & Architecture](#-technologies--architecture)
- [API Integration](#-api-integration)
- [Code Quality Features](#-code-quality-features)
- [Troubleshooting](#-troubleshooting)
- [Project Documentation](#-project-documentation)
- [Team](#-team)
- [License](#-license)

---

## ✨ Features

### 🌤️ Weather Features

#### **Current Weather Display**

- 🌡️ Large, readable temperature display with unit toggle (°C/°F)
- 🤔 "Feels like" apparent temperature
- 💧 Humidity percentage
- 💨 Wind speed (km/h)
- ☁️ Weather condition with descriptive text
- 📏 2×2 grid of key weather metrics (humidity, wind, rain probability, pressure)

#### **24-Hour Hourly Forecast**

- 📊 Interactive Victory line chart showing temperature trends
- 📜 Horizontal scrollable list with hourly breakdown
- 🌧️ Precipitation probability (POP) for each hour
- 💨 Hourly wind speed
- ⛅ Weather icons for each time slot

#### **7-Day Daily Forecast**

- 📅 Complete week forecast with min/max temperatures
- 📊 Visual temperature range bars
- 🌧️ Daily precipitation amounts
- ☀️ Weather condition icons and descriptions
- 📈 Optional dual-line chart (max/min temperatures)

#### **Smart Location Features**

- 📍 Automatic GPS location detection with permissions handling
- 🗺️ Reverse geocoding (coordinates → city name)
- 🔄 Manual location refresh button
- 🏙️ Fallback location for web/blocked GPS (Hanoi, Vietnam)
- 🔴 Clear error messages with color-coded status

#### **User Experience**

- ⚡ Pull-to-refresh for instant data updates
- 🔄 Real-time loading states and animations
- ⚡ Race condition prevention
- ⏱️ Timeout protection (10s for GPS, 30s for API)
- 🎯 Smooth transitions and responsive layout
- 📱 Mobile-first design with safe area support

### 🤖 AI Chat Assistant

#### **Intelligent Weather Conversations**

- 💬 Floating action button (FAB) in bottom-right corner
- 🎨 Beautiful modal interface with message bubbles
- 🧠 Context-aware responses using Llama 3.3 70B (Groq API)
- 📊 Automatically includes current weather data in context
- 🌍 Can query weather for ANY city worldwide
- 💡 Natural language understanding
- 🔄 Conversation history tracking
- ⚡ Real-time typing indicators
- 🎨 User/AI message differentiation with colors

#### **Chat Features**

- Ask about current conditions: _"Is it going to rain today?"_
- Get forecast information: _"What's the weather tomorrow?"_
- Compare locations: _"Is it warmer in Tokyo?"_
- General queries: _"Should I bring an umbrella?"_
- Multi-turn conversations with memory

### 🎨 UI/UX Design

- 🌓 **Dark Mode** - Modern dark theme with gradient accents
- 🎴 **Card-Based Layout** - Clean, rounded cards with glassmorphism
- 🎨 **Color-Coded Status** - Red errors, blue info, green success
- 📱 **Responsive Design** - Optimized for all screen sizes
- ⚡ **Smooth Animations** - React Native Reanimated
- 🔤 **Custom Typography** - SF Rounded font (iOS-style)
- 🎯 **Accessibility** - Readable fonts, proper contrast
- 🖼️ **Icon Support** - Weather condition emojis and SF Symbols

---

## � Demo & Screenshots

### Live Demo Script

A complete 5-minute demo script is available in [`DEMO_SCRIPT.txt`](DEMO_SCRIPT.txt) that covers:

- Part 1: Web browser demonstration
- Part 2: Mobile phone (Expo Go) demonstration
- Feature walkthrough and technical highlights

### Project Documentation

- 📋 [`PROJECT_PLAN.md`](PROJECT_PLAN.md) - Complete project plan with architecture, timeline, and success metrics
- 🔧 [`weather/IMPROVEMENTS.md`](weather/IMPROVEMENTS.md) - Detailed code improvements and best practices
- 🎤 [`weather/PRESENTATION.md`](weather/PRESENTATION.md) - Presentation guide and talking points

---

## 📦 Prerequisites

### Required Software

Before starting, ensure you have these installed:

| Software    | Version | Download                            | Verify           |
| ----------- | ------- | ----------------------------------- | ---------------- |
| **Node.js** | v18+    | [nodejs.org](https://nodejs.org/)   | `node --version` |
| **npm**     | v9+     | (included with Node.js)             | `npm --version`  |
| **Git**     | Latest  | [git-scm.com](https://git-scm.com/) | `git --version`  |

### Optional (For Mobile Testing)

| Tool               | Platform          | Purpose             | Download                                                                                                                                     |
| ------------------ | ----------------- | ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| **Expo Go**        | iOS/Android       | Test on real device | [App Store](https://apps.apple.com/app/expo-go/id982107779) / [Google Play](https://play.google.com/store/apps/details?id=host.exp.exponent) |
| **Android Studio** | Windows/Mac/Linux | Android emulator    | [developer.android.com/studio](https://developer.android.com/studio)                                                                         |
| **Xcode**          | Mac only          | iOS simulator       | [Mac App Store](https://apps.apple.com/app/xcode/)                                                                                           |

---

## 🚀 Quick Start

Get up and running in 3 minutes:

```bash
# 1. Clone the repository
git clone https://github.com/HaNguyen-oamk/profskill_group14.git
cd profskill_group14

# 2. Install dependencies
npm install

# 3. (Optional) Configure AI chat - see Environment Configuration section
# Copy .env.example to .env and add your Groq API key

# 4. Start the app
npm run web        # Open in browser (easiest!)
# OR
npm start          # Open with Expo (scan QR code with your phone)
```

**That's it!** The app should now be running. 🎉

> **Note:** The weather features work immediately (no API key needed). The AI chat requires a free Groq API key - see [Environment Configuration](#-environment-configuration).

---

## 🛠️ Complete Installation Guide

### Step 1: Verify Prerequisites

Open your terminal and check that you have the required software:

```bash
node --version    # Should show v18.x.x or higher
npm --version     # Should show v9.x.x or higher
git --version     # Should show git version x.x.x
```

✅ If all commands work, proceed to Step 2.  
❌ If any fail, install the missing software from [Prerequisites](#-prerequisites).

---

### Step 2: Clone the Repository

```bash
# Navigate to your preferred directory
cd Desktop    # or Documents, or wherever you want

# Clone the repository
git clone https://github.com/HaNguyen-oamk/profskill_group14.git

# Enter the project directory
cd profskill_group14
```

---

### Step 3: Install Dependencies

This step installs all required packages (React Native, Expo, Victory Charts, etc.):

```bash
npm install
```

⏱️ **This takes 2-5 minutes** depending on your internet speed.

**Expected output:**

```
added 1500+ packages in 3m
```

**Warnings (yellow text)** are normal and can be ignored.  
**Errors (red text)** - see [Troubleshooting](#-troubleshooting).

---

### Step 4: Configure Environment Variables (Optional but Recommended)

The AI chat assistant requires a **Groq API key** (free tier available):

#### Get Your Free Groq API Key

1. Visit: [https://console.groq.com/](https://console.groq.com/)
2. Sign up for a free account (GitHub/Google login available)
3. Navigate to **API Keys** section
4. Click **Create API Key**
5. Copy your key (starts with `gsk_...`)

#### Configure the `.env` File

1. Copy the example environment file:

   ```bash
   cp .env.example .env
   # On Windows: copy .env.example .env
   ```

2. Open `.env` in your text editor:

   ```bash
   notepad .env         # Windows
   nano .env            # Linux/Mac
   # or use VS Code, etc.
   ```

3. Replace the placeholder with your actual API key:

   ```env
   GROQ_API_KEY=gsk_your_actual_api_key_here
   ```

4. Save the file

✅ **AI chat is now configured!**

> **Note:** The `.env` file is ignored by Git (in `.gitignore`) so your API key stays private.

**Without API key:** The weather app works perfectly, but clicking the chat button will show an error.

---

### Step 5: Run the Application

Choose the platform that works best for you:

#### 🌐 Option A: Web Browser (Recommended for Quick Testing)

**Fastest way to see the app:**

```bash
npm run web
```

**What happens:**

1. Metro bundler starts
2. Browser automatically opens
3. App loads at `http://localhost:19006/`
4. You see the weather interface

**Pros:** Instant preview, no additional setup  
**Cons:** GPS location may be blocked (uses fallback location)

**To stop:** Press `Ctrl + C` in terminal

---

#### 📱 Option B: Real Phone via Expo Go (Best Experience)

**Best for testing GPS, interactions, and full features:**

**Prerequisites:**

- Install **Expo Go** app on your phone ([iOS](https://apps.apple.com/app/expo-go/id982107779) | [Android](https://play.google.com/store/apps/details?id=host.exp.exponent))
- Phone and computer on **same WiFi network**

**Steps:**

1. Start the development server:

   ```bash
   npm start
   ```

2. A QR code appears in your terminal

3. Scan the QR code:
   - **iOS:** Open Camera app → point at QR code → tap notification
   - **Android:** Open Expo Go app → tap "Scan QR Code" → point at QR code

4. Wait 15-30 seconds for the app to load on your phone

**Pros:** Real GPS, real touch gestures, full performance  
**Cons:** Requires Expo Go app and same WiFi

---

#### 🖥️ Option C: Emulator/Simulator (For Developers)

**For Android Emulator:**

Prerequisites: Android Studio installed with an emulator configured

```bash
npm run android
# OR
npm start    # then press 'a' when prompted
```

**For iOS Simulator (Mac only):**

Prerequisites: Xcode installed

```bash
npm run ios
# OR
npm start    # then press 'i' when prompted
```

**Pros:** Full native environment, debugging tools  
**Cons:** Requires Android Studio/Xcode setup

---

## ⚙️ Environment Configuration

### Environment Variables

The project uses environment variables for sensitive configuration:

| Variable       | Purpose                  | Required | Default                      |
| -------------- | ------------------------ | -------- | ---------------------------- |
| `GROQ_API_KEY` | Groq API key for AI chat | Optional | None (chat feature disabled) |

### `.env` File Structure

```env
# Groq API Configuration (for AI Chat)
# Get your free key at: https://console.groq.com/
GROQ_API_KEY=gsk_your_actual_groq_api_key_here
```

### Security Notes

- ✅ `.env` is in `.gitignore` (not committed to Git)
- ✅ `.env.example` provides template without secrets
- ✅ API keys are loaded via `react-native-dotenv`
- ⚠️ Never commit actual API keys to version control
- ⚠️ Regenerate keys if accidentally exposed

---

## 🎮 Running on Different Platforms

### Quick Command Reference

| Platform                | Command               | Best For                   | GPS Support          |
| ----------------------- | --------------------- | -------------------------- | -------------------- |
| **🌐 Web Browser**      | `npm run web`         | Quick testing, development | ❌ Fallback location |
| **📱 Expo Go**          | `npm start` → Scan QR | Full experience, real GPS  | ✅ Real location     |
| **🤖 Android Emulator** | `npm run android`     | Android testing, debugging | ✅ Mock/Real GPS     |
| **🍎 iOS Simulator**    | `npm run ios`         | iOS testing, debugging     | ✅ Mock/Real GPS     |

### All Available Commands

```bash
# Development
npm start                 # Start Metro bundler with options menu
npm run web               # Launch in web browser
npm run android           # Launch on Android device/emulator
npm run ios               # Launch on iOS device/simulator (Mac only)

# Code Quality
npm run lint              # Run ESLint code quality checks
npm run reset-project     # Reset project to clean state

# Testing (Manual)
# The app includes comprehensive error handling and input validation
# See PROJECT_PLAN.md for testing strategy
```

### Platform-Specific Notes

#### **Web Browser**

- ✅ Fastest for development iteration
- ✅ No additional setup required
- ⚠️ GPS usually blocked by browser security
- ⚠️ Some native features limited
- 📍 Uses fallback location: Hanoi, Vietnam (21.0285°N, 105.8542°E)

#### **Expo Go (Mobile)**

- ✅ Real GPS and location services
- ✅ True mobile performance
- ✅ Touch gestures and haptics
- ✅ Camera and device features
- ⚠️ Requires same WiFi network
- ⚠️ Limited to Expo SDK features

#### **Android Emulator**

- ✅ Full Android environment
- ✅ Debug and profiling tools
- ✅ Simulated GPS locations
- ⚠️ Requires Android Studio setup
- ⚠️ Resource-intensive

#### **iOS Simulator**

- ✅ Full iOS environment
- ✅ Debug and profiling tools
- ✅ Simulated GPS locations
- ⚠️ Mac only
- ⚠️ Requires Xcode (large install)

---

## 📁 Project Structure

```
profskill_group14/
│
├── 📱 app/                          # Application screens (Expo Router)
│   ├── index.js                     # ⭐ Main weather screen (home)
│   ├── _layout.tsx                  # Root layout with navigation setup
│   ├── modal.tsx                    # Example modal screen
│   └── (tabs)/                      # Tab-based navigation group
│       ├── _layout.tsx              # Tab navigator configuration
│       ├── index.tsx                # Home tab (example screen)
│       └── explore.tsx              # Explore tab (example screen)
│
├── ☀️ weather/                      # ⭐ Weather module (core functionality)
│   ├── CurrentCard.js               # Current weather display component
│   ├── ChartCard.js                 # Chart visualization (hourly/daily)
│   ├── ChartCard.native.js          # Native Victory charts version
│   ├── DailyForecastList.js         # 7-day forecast list with range bars
│   ├── HourlyList.js                # 24-hour forecast horizontal list
│   ├── HeaderBar.js                 # Top bar (location, unit toggle, GPS)
│   ├── SegmentedTabs.js             # Tab switcher (hourly/daily)
│   │
│   ├── 🔧 useLocation.js            # ⭐ GPS location hook with error handling
│   ├── 🔧 useWeather.js             # ⭐ Weather data fetching hook
│   ├── 🔧 openMeteo.js              # ⭐ Open-Meteo API integration + utilities
│   │
│   ├── theme.js                     # App-wide theme (colors, spacing)
│   ├── VictoryCompat.js             # Victory charts web compatibility
│   │
│   ├── 📄 IMPROVEMENTS.md           # Code improvements documentation
│   ├── 📄 PRESENTATION.md           # Presentation guide
│   └── 📄 SPEECH_SCRIPT_5MIN.txt   # 5-minute demo speech script
│
├── 🤖 services/                     # External API services
│   └── groq.js                      # ⭐ Groq AI API integration (Llama 3.3 70B)
│
├── 🎨 components/                   # Reusable UI components
│   ├── ChatButton.js                # ⭐ Floating action button for chat
│   ├── ChatModal.js                 # ⭐ AI chat modal interface
│   ├── external-link.tsx            # External link component
│   ├── haptic-tab.tsx               # Tab with haptic feedback
│   ├── hello-wave.tsx               # Animated wave component
│   ├── parallax-scroll-view.tsx     # Parallax scrolling header
│   ├── themed-text.tsx              # Text with theme support
│   ├── themed-view.tsx              # View with theme support
│   └── ui/                          # UI primitives
│       ├── collapsible.tsx          # Collapsible section
│       ├── icon-symbol.tsx          # SF Symbols wrapper
│       └── icon-symbol.ios.tsx      # iOS-specific symbols
│
├── 🎣 hooks/                        # Custom React hooks
│   ├── use-color-scheme.ts          # Color scheme detection
│   ├── use-color-scheme.web.ts      # Web-specific color scheme
│   └── use-theme-color.ts           # Theme color hook
│
├── 🎨 constants/                    # App constants
│   └── theme.ts                     # Theme constants (colors, fonts)
│
├── 🖼️ assets/                       # Static assets
│   └── images/                      # App icons, splash screens, images
│
├── 🔧 scripts/                      # Build and utility scripts
│   └── reset-project.js             # Project reset script
│
├── 📄 Configuration Files
│   ├── .env.example                 # Environment variables template
│   ├── .env                         # Environment variables (create this!)
│   ├── .gitignore                   # Git ignore rules
│   ├── package.json                 # Dependencies and scripts
│   ├── package-lock.json            # Locked dependency versions
│   ├── app.json                     # Expo app configuration
│   ├── tsconfig.json                # TypeScript configuration
│   ├── eslint.config.js             # ESLint code quality rules
│   └── expo-env.d.ts                # Expo TypeScript definitions
│
└── 📚 Documentation
    ├── README.md                    # ⭐ This file (main documentation)
    ├── PROJECT_PLAN.md              # ⭐ Complete project plan (2000+ lines)
    ├── DEMO_SCRIPT.txt              # 5-minute live demo script
    └── STUDY_PROJECT_PLAN.txt       # Study project planning notes
```

### Key Files to Understand

| File                                                 | Purpose                                      | Lines | Complexity |
| ---------------------------------------------------- | -------------------------------------------- | ----- | ---------- |
| [`app/index.js`](app/index.js)                       | Main weather screen, data flow orchestration | ~211  | ⭐⭐⭐     |
| [`weather/useLocation.js`](weather/useLocation.js)   | GPS detection, permissions, error handling   | ~200+ | ⭐⭐⭐⭐   |
| [`weather/useWeather.js`](weather/useWeather.js)     | API calls, data caching, refresh logic       | ~150+ | ⭐⭐⭐     |
| [`weather/openMeteo.js`](weather/openMeteo.js)       | Open-Meteo API, data parsing, utilities      | ~200+ | ⭐⭐⭐     |
| [`services/groq.js`](services/groq.js)               | Groq AI integration, error handling          | ~50   | ⭐⭐       |
| [`components/ChatModal.js`](components/ChatModal.js) | Chat UI, message handling, context building  | ~373  | ⭐⭐⭐⭐   |
| [`weather/ChartCard.js`](weather/ChartCard.js)       | Victory charts, data visualization           | ~322  | ⭐⭐⭐⭐   |

---

## 🛠️ Technologies & Architecture

### Core Technologies

| Technology       | Version | Purpose                      | Documentation                                                      |
| ---------------- | ------- | ---------------------------- | ------------------------------------------------------------------ |
| **React Native** | 0.81.5  | Cross-platform UI framework  | [reactnative.dev](https://reactnative.dev/)                        |
| **React**        | 19.1.0  | UI library (latest)          | [react.dev](https://react.dev/)                                    |
| **Expo SDK**     | ~54.0   | Development platform & tools | [docs.expo.dev](https://docs.expo.dev/)                            |
| **Expo Router**  | ~6.0    | File-based navigation        | [docs.expo.dev/router](https://docs.expo.dev/router/introduction/) |
| **TypeScript**   | ~5.9    | Type safety (partial)        | [typescriptlang.org](https://www.typescriptlang.org/)              |

### UI & Visualization

| Library                        | Purpose                   | Usage                      |
| ------------------------------ | ------------------------- | -------------------------- |
| **Victory**                    | Charts (web)              | Line charts, scatter plots |
| **Victory Native**             | Charts (mobile)           | Native chart rendering     |
| **React Native SVG**           | Vector graphics           | Chart rendering            |
| **@shopify/react-native-skia** | High-performance graphics | Advanced rendering         |
| **React Native Reanimated**    | Animations                | Smooth 60fps animations    |
| **Expo Linear Gradient**       | Gradients                 | Background effects         |
| **Expo Blur**                  | Blur effects              | Glassmorphism UI           |

### Services & APIs

| Service                  | Purpose                 | Cost         | Rate Limits                          |
| ------------------------ | ----------------------- | ------------ | ------------------------------------ |
| **Open-Meteo API**       | Weather data            | 🆓 Free      | 10,000 requests/day (non-commercial) |
| **Groq API**             | AI chat (Llama 3.3 70B) | 🆓 Free tier | 30 requests/min, 14,400/day          |
| **Expo Location**        | GPS & geolocation       | 🆓 Free      | No limits                            |
| **Open-Meteo Geocoding** | City name lookup        | 🆓 Free      | Part of Open-Meteo                   |

### Architecture Patterns

#### **Custom Hooks Pattern**

- `useLocation()` - Encapsulates GPS logic, permissions, error states
- `useWeather()` - Manages API calls, caching, refresh state
- Clean separation of concerns

#### **Component Composition**

- Small, focused components (CurrentCard, ChartCard, etc.)
- Props-based data flow
- Reusable UI primitives

#### **Error Handling Strategy**

- Race condition prevention with `useRef`
- Timeout protection (10s GPS, 30s API)
- Graceful fallbacks (default location)
- User-friendly error messages

#### **State Management**

- React hooks (`useState`, `useEffect`, `useMemo`)
- No external state library needed (simple app)
- Derived state with `useMemo` for performance

---

## 🔌 API Integration

### Open-Meteo Weather API

**Endpoint:** `https://api.open-meteo.com/v1/forecast`

**Features:**

- ✅ No API key required
- ✅ Free for non-commercial use
- ✅ 10,000 requests/day limit
- ✅ Real-time weather data
- ✅ 7-day forecast included
- ✅ Timezone-aware

**Data We Fetch:**

- **Current:** temperature, apparent_temperature, wind_speed, humidity, weather_code
- **Hourly:** temperature, precipitation_probability, wind_speed (24h)
- **Daily:** temperature_max, temperature_min, precipitation_sum, weather_code (7 days)

**Example Request:**

```javascript
const url = `https://api.open-meteo.com/v1/forecast?latitude=65.01&longitude=25.47&current=temperature_2m,apparent_temperature,wind_speed_10m,relative_humidity_2m,weather_code&hourly=temperature_2m,precipitation_probability,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,weather_code&forecast_days=7&timezone=auto`;
```

**Documentation:** [open-meteo.com/en/docs](https://open-meteo.com/en/docs)

---

### Groq AI API (Chat)

**Endpoint:** `https://api.groq.com/openai/v1/chat/completions`

**Model:** `llama-3.3-70b-versatile`

**Features:**

- ✅ OpenAI-compatible API
- ✅ Extremely fast inference
- ✅ Free tier available
- ✅ Context window: 32,768 tokens
- ⚠️ Rate limit: 30 requests/min

**Configuration:**

- `max_tokens`: 1000
- `temperature`: 0.7
- Conversation history tracked

**Context Injection:**
The app automatically includes current weather data in the system prompt:

```javascript
const systemPrompt = `You are a weather assistant AI.

CURRENT LOCATION: Oulu, Finland

CURRENT WEATHER DATA:
- Temperature: 15.2°C
- Feels like: 13.8°C
- Condition: Partly cloudy
- Humidity: 75%
- Wind speed: 12 km/h

7-DAY FORECAST: ...
`;
```

**Documentation:** [console.groq.com/docs](https://console.groq.com/docs/quickstart)

---

### Expo Location API

**Purpose:** GPS coordinates and reverse geocoding

**Permissions Required:**

- iOS: `NSLocationWhenInUseUsageDescription`
- Android: `ACCESS_FINE_LOCATION`

**Accuracy Used:** `Location.Accuracy.Balanced` (balanced power/precision)

**Timeout:** 10 seconds (then fallback to default location)

**Documentation:** [docs.expo.dev/versions/latest/sdk/location](https://docs.expo.dev/versions/latest/sdk/location/)

---

## ✅ Code Quality Features

### Error Handling

✅ **Comprehensive Error Types**

- Permission denied errors
- GPS timeout errors
- Network/API errors
- Rate limit errors
- Invalid input errors

✅ **User-Friendly Messages**

```javascript
// Instead of: "Error: Request failed with status code 500"
// We show: "Location permission denied. Please enable location access in settings."
```

✅ **Graceful Fallbacks**

- GPS blocked → Fallback to Hanoi, Vietnam
- API timeout → Show cached data
- Network offline → Clear error message

---

### Performance Optimizations

✅ **Race Condition Prevention**

```javascript
const isDetecting = useRef(false);
if (isDetecting.current) return; // Prevent duplicate GPS requests
```

✅ **Memory Leak Prevention**

```javascript
useEffect(() => {
  let isMounted = true;
  // ... async operations ...
  return () => {
    isMounted = false;
  };
}, []);
```

✅ **Memoization**

```javascript
const hourlyChartData = useMemo(
  () => hourlyItems.map((x) => ({ x: idx, y: x.temp })),
  [hourlyItems, unit],
); // Only recalculate when dependencies change
```

✅ **Timeout Protection**

- GPS: 10 second timeout
- API: 30 second timeout
- Prevents hanging requests

---

### Input Validation

✅ **Coordinate Validation**

```javascript
function validateCoords(latitude, longitude) {
  if (latitude < -90 || latitude > 90) throw new Error("Invalid latitude");
  if (longitude < -180 || longitude > 180) throw new Error("Invalid longitude");
}
```

✅ **API Response Validation**

```javascript
if (!response.ok) throw new Error(`API error: HTTP ${response.status}`);
const data = await response.json();
if (!data.current) throw new Error("Invalid API response");
```

---

### Documentation

✅ **JSDoc Comments** throughout codebase
✅ **README.md** (this file) - complete user guide
✅ **PROJECT_PLAN.md** - 2000+ line project documentation
✅ **IMPROVEMENTS.md** - code improvements explained
✅ **DEMO_SCRIPT.txt** - live demo walkthrough

---

## 🔧 Troubleshooting

### Common Issues and Solutions

#### ❌ `npm: command not found`

**Cause:** Node.js is not installed or not in PATH

**Solution:**

1. Install Node.js from [nodejs.org](https://nodejs.org/)
2. Restart your terminal
3. Verify: `node --version`

---

#### ❌ `npm install` fails with dependency errors

**Error Example:**

```
npm ERR! code ERESOLVE
npm ERR! ERESOLVE unable to resolve dependency tree
```

**Solutions:**

**Option 1:** Clear cache and retry

```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

**Option 2:** Use legacy peer deps

```bash
npm install --legacy-peer-deps
```

**Option 3:** Update npm

```bash
npm install -g npm@latest
```

---

#### ❌ Port 19006 (or 8081) already in use

**Error Example:**

```
Error: listen EADDRINUSE: address already in use :::19006
```

**Solutions:**

**Option 1:** Kill existing Expo process

```bash
# Windows PowerShell
Get-Process -Name node | Stop-Process

# Mac/Linux
killall node
```

**Option 2:** Use different port

```bash
npm run web -- --port 19007
```

---

#### ❌ GPS/Location not working in web browser

**Symptoms:**

- Red error: "Location permission denied"
- Shows fallback location (Hanoi, Vietnam)

**Cause:** Browsers block GPS access for security reasons

**This is EXPECTED behavior, not a bug!**

**Solutions:**

1. ✅ **Use Expo Go on your phone** (recommended)
2. ✅ **Use Android/iOS emulator** with simulated location
3. ⚠️ Browser will always use fallback location

**Web Security Note:**

- Chrome/Firefox block GPS unless site is HTTPS
- `localhost` is usually blocked
- This is browser security, not an app bug

---

#### ❌ QR code not scanning

**Symptoms:**

- QR code appears but phone can't scan
- "Unable to connect" error in Expo Go

**Solutions:**

**Check 1:** Same WiFi network

```bash
# Both devices must be on same network
# Corporate/school WiFi may block peer-to-peer
```

**Check 2:** Firewall

- Windows Defender may block port 19000
- Temporarily disable firewall for testing

**Check 3:** Use tunnel mode

```bash
npm start
# Press 's' to switch to tunnel mode
```

**Check 4:** Manual connection

```bash
npm start
# Note the URL (e.g., exp://192.168.1.5:19000)
# Enter it manually in Expo Go
```

**Check 5:** Try web version

```bash
# Press 'w' in terminal to open browser
```

---

#### ❌ AI Chat not working / "API Error"

**Symptoms:**

- Chat button works but shows error
- "Error connect" or "API Error" message

**Check 1:** API Key configured

```bash
# 1. Does .env file exist?
ls .env    # Should show the file

# 2. Open .env and verify
# GROQ_API_KEY=gsk_...   (should start with gsk_)
```

**Check 2:** API Key is valid

- Go to [console.groq.com](https://console.groq.com/)
- Check if key is active
- Regenerate if needed

**Check 3:** Rate limits

```
Error: "Over limit. Waiting 1 minute!"
```

- Groq free tier: 30 requests/minute
- Wait 60 seconds and try again

**Check 4:** Network connection

```bash
# Test API directly
curl -H "Authorization: Bearer gsk_YOUR_KEY" \
  https://api.groq.com/openai/v1/models
```

---

#### ❌ Android build fails

**Error Example:**

```
Task :app:installDebug FAILED
```

**Solutions:**

**Check 1:** Emulator running

```bash
# Start Android Studio → AVD Manager → Start emulator
# THEN run: npm run android
```

**Check 2:** Environment variables

```bash
# Check ANDROID_HOME is set
echo $ANDROID_HOME   # Should show Android SDK path
```

**Check 3:** USB debugging enabled (real device)

- Settings → Developer Options → USB Debugging

**Check 4:** Use `npm start` instead

```bash
npm start
# Press 'a' when emulator is running
```

---

#### ❌ iOS build fails (Mac only)

**Error Example:**

```
No Xcode project found
```

**Solutions:**

**Check 1:** Xcode installed

```bash
xcode-select --install
```

**Check 2:** Accept Xcode license

```bash
sudo xcodebuild -license accept
```

**Check 3:** Use `npm start` instead

```bash
npm start
# Press 'i' to open simulator
```

---

#### ❌ Charts not displaying

**Symptoms:**

- Blank space where charts should be
- Console errors about Victory

**Solutions:**

**Check 1:** Platform-specific file

- Web uses `ChartCard.js`
- Native uses `ChartCard.native.js`
- Both exist in `weather/` folder

**Check 2:** Data available

```javascript
// Check in console:
console.log(hourlyChartData); // Should be array of {x, y, label}
```

**Check 3:** Victory Native version

```bash
npm list victory-native
# Should be ^41.20.2
```

---

#### ❌ "Unable to resolve module" errors

**Error Example:**

```
Unable to resolve module `@env`
```

**Solution:**

```bash
# Clear Metro bundler cache
npm start -- --clear

# Or
npx expo start -c
```

---

#### 🆘 Still having issues?

**Resources:**

1. 📖 **Expo Documentation:** [docs.expo.dev](https://docs.expo.dev/)
2. 📖 **React Native Docs:** [reactnative.dev](https://reactnative.dev/docs/troubleshooting)
3. 💬 **Expo Discord:** [discord.gg/expo](https://discord.gg/expo)
4. 🐛 **GitHub Issues:** [github.com/HaNguyen-oamk/profskill_group14/issues](https://github.com/HaNguyen-oamk/profskill_group14/issues)
5. 📚 **Stack Overflow:** Search for your specific error message

**Getting Help:**
When asking for help, include:

- ✅ Operating system (Windows/Mac/Linux)
- ✅ Node.js version (`node --version`)
- ✅ npm version (`npm --version`)
- ✅ Expo SDK version (from `package.json`)
- ✅ Complete error message (copy/paste, not screenshot)
- ✅ What you've already tried

---

## 📚 Project Documentation

This project includes comprehensive documentation:

### Main Documentation

| Document                             | Description                        | Lines | Purpose                                                 |
| ------------------------------------ | ---------------------------------- | ----- | ------------------------------------------------------- |
| [`README.md`](README.md)             | **This file** - User guide & setup | 800+  | Getting started, installation, troubleshooting          |
| [`PROJECT_PLAN.md`](PROJECT_PLAN.md) | Complete project plan              | 2000+ | Architecture, timeline, testing strategy, retrospective |
| [`DEMO_SCRIPT.txt`](DEMO_SCRIPT.txt) | 5-minute live demo script          | 395   | Presentation walkthrough for web & mobile               |

### Technical Documentation

| Document                 | Location            | Purpose                                           |
| ------------------------ | ------------------- | ------------------------------------------------- |
| `IMPROVEMENTS.md`        | `weather/`          | Code improvements, error handling, best practices |
| `PRESENTATION.md`        | `weather/`          | Presentation guide and talking points             |
| `SPEECH_SCRIPT_5MIN.txt` | `weather/`          | 5-minute speech script                            |
| JSDoc Comments           | Throughout codebase | Function-level documentation                      |

### Configuration Files

| File               | Purpose                                         |
| ------------------ | ----------------------------------------------- |
| `.env.example`     | Template for environment variables              |
| `app.json`         | Expo configuration (name, icons, splash screen) |
| `package.json`     | Dependencies, scripts, project metadata         |
| `tsconfig.json`    | TypeScript compiler options                     |
| `eslint.config.js` | Code quality rules                              |

### How to Use Documentation

**For Users/Testers:**

1. Start with this **README.md** for installation
2. Check **DEMO_SCRIPT.txt** for feature walkthrough

**For Developers:** 3. Read **PROJECT_PLAN.md** for architecture overview 4. See **weather/IMPROVEMENTS.md** for code quality details 5. Check JSDoc comments in source files

**For Presentations:** 6. Use **DEMO_SCRIPT.txt** for live demos 7. Reference **PRESENTATION.md** for talking points

---

## 👥 Team

**Group 14** - Deepening of Student's Professional Skills  
**Institution:** Oulu University of Applied Sciences (OAMK)  
**Course:** Professional Skills Development  
**Academic Year:** 2025-2026

### Team Members

| Name                      | Role                        | Responsibilities                                                    | GitHub                                             |
| ------------------------- | --------------------------- | ------------------------------------------------------------------- | -------------------------------------------------- |
| **Chenqi Li**             | Location & Data Layer Lead  | GPS integration, Open-Meteo API, location services, error handling  | [@Chenqi](https://github.com/)                     |
| **Sumaiya Khan**          | UI/UX Designer & Developer  | Interface design, visual design, theme implementation, user testing | [@Sumaiya](https://github.com/)                    |
| **Bibimaryam Jakipbaeva** | Charts & Visualization Lead | Victory charts, data visualization, screen integration, graphics    | [@Bibi](https://github.com/)                       |
| **Ha Nguyen**             | AI & Integration Lead       | Groq API, chat feature, project coordination, documentation         | [@HaNguyen-oamk](https://github.com/HaNguyen-oamk) |

### Collaboration

- **Repository:** [github.com/HaNguyen-oamk/profskill_group14](https://github.com/HaNguyen-oamk/profskill_group14)
- **Methodology:** Agile-inspired with 4 sprints
- **Communication:** GitHub Issues, Pull Requests, Weekly meetings
- **Code Review:** Peer review before merging
- **Documentation:** Shared responsibility

### Acknowledgments

- **Open-Meteo** for free weather API
- **Groq** for free AI API access
- **Expo Team** for excellent React Native tooling
- **OAMK Faculty** for project guidance

---

## 📄 License

**Educational Project License**

This project was developed as part of the **Deepening of Student's Professional Skills** course at **Oulu University of Applied Sciences (OAMK)**.

### Usage Terms

✅ **Allowed:**

- Educational use and learning
- Viewing and studying the code
- Using as a reference for your own projects
- Forking for personal learning
- Adapting concepts and techniques

⚠️ **Please:**

- Give credit if you use significant portions
- Do not submit as your own course work
- Respect API terms of service (Open-Meteo, Groq)

❌ **Not Allowed:**

- Commercial use without permission
- Redistribution without attribution

### Third-Party Licenses

This project uses open-source software:

- **React Native** - MIT License
- **Expo** - MIT License
- **Victory** - MIT License
- **Open-Meteo API** - CC BY 4.0 (non-commercial free)
- **Groq API** - Subject to Groq Terms of Service

### Disclaimer

This application is provided "as is" without warranty. Weather data accuracy depends on Open-Meteo API. AI chat responses are generated by Llama 3.3 70B and may not always be accurate.

---

## 🎉 Getting Started

Ready to explore the app? Here's what to do next:

### 1️⃣ First Run Checklist

```bash
# ✅ Verify prerequisites
node --version && npm --version && git --version

# ✅ Clone and install
git clone https://github.com/HaNguyen-oamk/profskill_group14.git
cd profskill_group14
npm install

# ✅ (Optional) Configure AI chat
cp .env.example .env
# Edit .env and add your Groq API key

# ✅ Start the app
npm run web    # Or: npm start for mobile
```

### 2️⃣ Features to Try

**Weather Features:**

- 🌡️ Check current temperature and conditions
- 📊 Explore the 24-hour forecast chart
- 📅 Browse the 7-day forecast
- 🔄 Toggle between °C and °F
- 📍 Try the "Re-detect" button
- ⬇️ Pull down to refresh data

**AI Chat:**

- 💬 Click the chat button (bottom-right)
- 💭 Ask: _"What's the weather like?"_
- 🌍 Try: _"How's the weather in Tokyo?"_
- 🤔 Ask: _"Should I bring an umbrella?"_

### 3️⃣ Explore the Code

**Start with these files:**

1. [`app/index.js`](app/index.js) - Main screen logic
2. [`weather/useLocation.js`](weather/useLocation.js) - GPS handling
3. [`weather/useWeather.js`](weather/useWeather.js) - API calls
4. [`components/ChatModal.js`](components/ChatModal.js) - AI chat

### 4️⃣ Customize It

**Easy customizations:**

- 🎨 **Colors:** Edit [`weather/theme.js`](weather/theme.js)
- 📍 **Default location:** Change `FALLBACK` in [`weather/openMeteo.js`](weather/openMeteo.js)
- 🤖 **AI personality:** Modify system prompt in [`components/ChatModal.js`](components/ChatModal.js)
- 📊 **Chart colors:** Update `CHART` object in [`weather/ChartCard.js`](weather/ChartCard.js)

---

## 💬 Support & Contact

**Questions about the project?**

- 📧 **Email:** Check team member GitHub profiles
- 🐛 **Bug reports:** [GitHub Issues](https://github.com/HaNguyen-oamk/profskill_group14/issues)
- 💡 **Feature requests:** [GitHub Discussions](https://github.com/HaNguyen-oamk/profskill_group14/discussions)

**For OAMK students:**

- This project can serve as a reference for similar course work
- Feel free to study the code structure and techniques
- Please don't copy-paste for your own submissions

---

## 🌟 Project Highlights

### What Makes This Project Special

✨ **Production-Ready Code Quality**

- Comprehensive error handling
- Input validation
- Race condition prevention
- Memory leak prevention
- Timeout protection

✨ **Professional Documentation**

- 2000+ lines of project planning
- Complete API documentation
- JSDoc comments throughout
- Multiple demo scripts

✨ **Best Practices**

- Custom hooks for reusability
- Component composition
- Memoization for performance
- TypeScript for type safety (partial)

✨ **Real-World Features**

- GPS location detection
- Multi-platform support
- AI integration
- Interactive data visualization

### Technologies Showcase

This project demonstrates proficiency in:

- ⚛️ React Native & Expo
- 🎣 React Hooks (custom hooks)
- 🎨 Advanced UI/UX design
- 📊 Data visualization
- 🤖 AI API integration
- 📍 Geolocation services
- 🔧 Error handling
- 📚 Technical documentation

---

**🌤️ Built with ❤️ by Group 14 @ OAMK**

**Questions? Issues? Suggestions?**  
**Open an issue on GitHub or reach out to the team!**

**Happy coding! ☀️💬🚀**
