# ☀️ Weather App with AI Chat Assistant

> **Group 14** - Deepening of Student's Professional Skills, OAMK University

A beautiful, mobile-first weather application built with **React Native (Expo)** that provides detailed weather information, interactive charts, and an AI-powered chat assistant to answer your weather questions.

![React Native](https://img.shields.io/badge/React_Native-0.81.5-61DAFB?logo=react)
![Expo](https://img.shields.io/badge/Expo-~54.0-000020?logo=expo)
![Node](https://img.shields.io/badge/Node.js-18+-339933?logo=node.js)

---

## 📋 Table of Contents

- [Features](#-features)
- [Prerequisites](#-prerequisites)
- [Complete Installation Guide](#-complete-installation-guide)
  - [Step 1: Check Prerequisites](#step-1-check-prerequisites)
  - [Step 2: Clone the Repository](#step-2-clone-the-repository)
  - [Step 3: Install Dependencies](#step-3-install-dependencies)
  - [Step 4: Configure AI Chat (Optional)](#step-4-configure-ai-chat-optional)
  - [Step 5: Run the Application](#step-5-run-the-application)
- [Running on Different Platforms](#-running-on-different-platforms)
- [Project Structure](#-project-structure)
- [Technologies Used](#-technologies-used)
- [Troubleshooting](#-troubleshooting)
- [Team](#-team)

---

## ✨ Features

### 🌤️ Weather Features

- **Current Weather Card**
  - Real-time temperature display
  - "Feels like" temperature
  - Humidity percentage
  - Wind speed
  - Weather condition description

- **24-Hour Forecast**
  - Interactive line chart showing temperature trends
  - Hourly breakdown with detailed metrics
  - Precipitation probability
  - Wind speed per hour

- **7-Day Forecast**
  - Daily min/max temperatures
  - Precipitation amounts
  - Weather codes and conditions

- **Smart Features**
  - Automatic GPS location detection
  - Manual location refresh
  - Celsius (°C) ↔ Fahrenheit (°F) toggle
  - Pull-to-refresh functionality

### 🤖 AI Chat Assistant

- Ask natural language questions about weather
- Powered by Groq API (Llama 3.3 70B model)
- Context-aware conversations

### 🎨 UI/UX

- Mobile-first responsive design
- Modern card-based layout
- Smooth animations
- Light/Dark mode support

---

## 📦 Prerequisites

Before you start, make sure you have the following installed on your computer:

### Required Software

1. **Node.js** (v18 or newer)
   - Download from: https://nodejs.org/
   - Verify installation:
     ```bash
     node --version
     ```
     Should show: `v18.x.x` or higher

2. **npm** (comes with Node.js)
   - Verify installation:
     ```bash
     npm --version
     ```
     Should show: `9.x.x` or higher

3. **Git**
   - Download from: https://git-scm.com/
   - Verify installation:
     ```bash
     git --version
     ```

### Optional (for Mobile Testing)

4. **Expo Go App** (for testing on real phone)
   - iOS: Download from App Store
   - Android: Download from Google Play Store

5. **Android Studio** (for Android Emulator)
   - Download from: https://developer.android.com/studio

6. **Xcode** (for iOS Simulator - Mac only)
   - Download from Mac App Store

---

## 🚀 Complete Installation Guide

Follow these steps **carefully** to get the project running:

### Step 1: Check Prerequisites

Open your terminal (PowerShell on Windows, Terminal on Mac/Linux) and verify:

```bash
node --version
npm --version
git --version
```

If any command fails, install the missing software from the [Prerequisites](#-prerequisites) section.

---

### Step 2: Clone the Repository

1. Open your terminal
2. Navigate to where you want to save the project:

   ```bash
   cd Desktop
   # or
   cd Documents
   ```

3. Clone the repository:

   ```bash
   git clone https://github.com/HaNguyen-oamk/profskill_group14.git
   ```

4. Enter the project folder:
   ```bash
   cd profskill_group14
   ```

---

### Step 3: Install Dependencies

Install all required packages (this may take 2-5 minutes):

```bash
npm install
```

**Wait until you see:** `added XXX packages` and no error messages.

**If you see warnings** (yellow text), that's normal and OK to ignore.

**If you see errors** (red text), check the [Troubleshooting](#-troubleshooting) section.

---

### Step 4: Configure AI Chat (Optional)

The AI chat feature requires a free API key. If you want to use it:

1. **Get a free API key:**
   - Visit: https://console.groq.com/
   - Create a free account
   - Generate an API key

2. **Add the key to the project:**
   - Open the file: `services/groq.js`
   - Find this line at the top:
     ```javascript
     const API_KEY = "";
     ```
   - Replace it with:
     ```javascript
     const API_KEY = "your_actual_api_key_here";
     ```
   - Save the file

**Note:** The app will work without this step, but the AI chat feature won't function.

---

### Step 5: Run the Application

Now you're ready to start the app! Choose ONE of the following options:

#### 🌐 Option A: Run in Web Browser (Easiest & Fastest)

This is the **recommended way** to test quickly:

```bash
npm run web
```

**What happens:**

- Terminal will show: `Starting Metro Bundler...`
- Your browser will automatically open
- App will load at: `http://localhost:19006/`
- You'll see the weather app interface

**Note:** GPS location may not work in browsers. The app will use a fallback location (Hanoi, Vietnam).

**To stop the app:** Press `Ctrl + C` in the terminal

---

#### 📱 Option B: Run on Your Phone (Best for GPS)

This requires the **Expo Go** app on your phone:

1. **Install Expo Go:**
   - iOS: Search "Expo Go" in App Store
   - Android: Search "Expo Go" in Google Play

2. **Start the development server:**

   ```bash
   npm start
   ```

3. **Scan the QR code:**
   - **iOS:** Open Camera app → Point at QR code → Tap notification
   - **Android:** Open Expo Go app → Tap "Scan QR Code" → Point at QR code

4. **Wait for the app to load** on your phone (15-30 seconds)

**Troubleshooting QR code:**

- Make sure your phone and computer are on the **same WiFi network**
- If QR code doesn't work, type `w` in terminal to open web version
- Or type `a` for Android, `i` for iOS (if emulator is running)

---

#### 🖥️ Option C: Run in Emulator/Simulator

**For Android Emulator:**

1. Make sure Android Studio is installed and an emulator is created
2. Start the emulator
3. Run:
   ```bash
   npm run android
   ```

**For iOS Simulator (Mac only):**

1. Make sure Xcode is installed
2. Run:
   ```bash
   npm run ios
   ```

---

## 🎮 Running on Different Platforms

### Quick Commands Reference

| Platform             | Command           | Requirements              |
| -------------------- | ----------------- | ------------------------- |
| **Web Browser**      | `npm run web`     | None (easiest!)           |
| **Expo Go (Phone)**  | `npm start`       | Expo Go app installed     |
| **Android Emulator** | `npm run android` | Android Studio + Emulator |
| **iOS Simulator**    | `npm run ios`     | Xcode (Mac only)          |

### Development Commands

```bash
npm start          # Start with options menu
npm run web        # Launch in browser
npm run android    # Launch on Android
npm run ios        # Launch on iOS
npm run lint       # Check code quality
```

---

## 📁 Project Structure

```
profskill_group14/
│
├── app/                          # Main application screens
│   ├── index.js                  # ⭐ Main weather screen
│   ├── _layout.tsx               # Root navigation layout
│   └── (tabs)/                   # Tab navigation
│       ├── index.tsx             # Home tab
│       └── explore.tsx           # Explore tab
│
├── weather/                      # ⭐ Weather module (core functionality)
│   ├── CurrentCard.js            # Current weather display
│   ├── ChartCard.js              # Weather charts (24h/7d)
│   ├── HeaderBar.js              # Top bar with location
│   ├── SegmentedTabs.js          # Toggle between hourly/daily
│   ├── useLocation.js            # GPS location hook
│   ├── useWeather.js             # Weather data fetching
│   ├── openMeteo.js              # Open-Meteo API integration
│   ├── theme.js                  # App theme colors
│   └── VictoryCompat.js          # Chart library wrapper
│
├── services/                     # External services
│   └── groq.js                   # ⭐ AI chat API (Groq)
│
├── components/                   # Reusable UI components
├── hooks/                        # Custom React hooks
├── constants/                    # App constants
├── assets/                       # Images and icons
│
├── package.json                  # Dependencies and scripts
├── app.json                      # Expo configuration
└── README.md                     # This file!
```

**Key Files to Understand:**

- 🌟 `app/index.js` - Main screen logic
- 🌟 `weather/useWeather.js` - Fetches weather data
- 🌟 `weather/useLocation.js` - Gets user location
- 🌟 `services/groq.js` - AI chat functionality

---

## 🛠️ Technologies Used

| Technology            | Purpose                              | Documentation                                               |
| --------------------- | ------------------------------------ | ----------------------------------------------------------- |
| **React Native 0.81** | Cross-platform mobile framework      | [Docs](https://reactnative.dev/)                            |
| **Expo SDK 54**       | Development platform                 | [Docs](https://docs.expo.dev/)                              |
| **Expo Router**       | File-based navigation                | [Docs](https://docs.expo.dev/router/introduction/)          |
| **Victory Charts**    | Data visualization                   | [Docs](https://formidable.com/open-source/victory/)         |
| **Open-Meteo API**    | Free weather data (no key required!) | [API](https://open-meteo.com/)                              |
| **Groq API**          | AI chat (Llama 3.3 70B)              | [Console](https://console.groq.com/)                        |
| **Expo Location**     | GPS and geolocation                  | [Docs](https://docs.expo.dev/versions/latest/sdk/location/) |
| **TypeScript**        | Type-safe JavaScript                 | [Docs](https://www.typescriptlang.org/)                     |

---

## 🔧 Troubleshooting

### Common Issues and Solutions

#### ❌ "npm: command not found"

**Solution:** Install Node.js from https://nodejs.org/

---

#### ❌ "npm install" fails with errors

**Solutions:**

1. Delete `node_modules` folder and `package-lock.json`
2. Run again:
   ```bash
   npm install
   ```
3. If still fails, try:
   ```bash
   npm install --legacy-peer-deps
   ```

---

#### ❌ "Port 19006 already in use"

**Solution:**

- Close other Expo projects
- Or run with different port:
  ```bash
  npm run web -- --port 19007
  ```

---

#### ❌ GPS/Location not working in browser

**Expected behavior:** Browsers block GPS access.
**Solution:**

- Use Expo Go on your phone for real GPS
- Or use Android/iOS emulator
- Web version will use fallback location (Hanoi, Vietnam)

---

#### ❌ QR code not scanning

**Solutions:**

1. Make sure phone and computer are on **same WiFi**
2. Try typing `w` in terminal to open web version
3. Check if Expo Go app is updated to latest version
4. Try restarting `npm start`

---

#### ❌ AI Chat not working

**Check:**

1. Did you add API key in `services/groq.js`?
2. Is your API key valid? Test at https://console.groq.com/
3. Check internet connection

---

#### ❌ Android build fails

**Solutions:**

1. Make sure Android Studio is installed
2. Start an Android emulator before running `npm run android`
3. Try: `npm start` then press `a` in terminal

---

#### 🆘 Still having issues?

- Check Expo documentation: https://docs.expo.dev/
- Search for your error message on Stack Overflow
- Check the GitHub repository issues page

---

## 👥 Team

**Group 14** - Deepening of Student's Professional Skills, OAMK

| Name                      | Role                        | Contribution                       |
| ------------------------- | --------------------------- | ---------------------------------- |
| **Chenqi Li**             | Location & Data Layer       | GPS integration, API calls         |
| **Sumaiya Khan**          | UI / Design                 | Interface design, user experience  |
| **Bibimaryam Jakipbaeva** | Charts & Screen Integration | Victory charts, data visualization |
| **Ha Nguyen**             | Chat Feature                | AI integration, Groq API           |

---

## 📄 License

Educational project for **OAMK Deepening of Student's Professional Skills** course.

---

## 🎉 Next Steps

After getting the app running:

1. **Explore the features:**
   - Check current weather
   - View 24-hour forecast chart
   - Browse 7-day forecast
   - Try toggling °C / °F
   - Pull down to refresh

2. **Test on different devices:**
   - Try web browser
   - Test on your phone
   - Compare with emulator

3. **Customize it:**
   - Change colors in `weather/theme.js`
   - Modify layouts in `app/index.js`
   - Add new features!

---

**Questions?** Check the code comments or ask your team members!

**Happy coding! ☀️🤖💬**
