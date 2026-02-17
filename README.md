Deepening of Student's Professional Skills Group 14 - Weather App with Chat Assistant
A mobile-first weather application built with React Native (Expo) for the Deepening of Student's Professional Skills course at OAMK. The app provides detailed weather information with beautiful UI, data visualization, and an AI-powered chat weather assistant.

☀️ Final App Features
Weather Features
Hero Weather Card – Displays:

City name

Current date

Weather icon (sunny, cloudy, rainy, etc.)

Big temperature display

Weather Stats Section – Key metrics at a glance:

💨 Wind speed

💧 Humidity percentage

🌧️ Rain chance / precipitation

📊 Atmospheric pressure

Hourly Forecast Section:

Interactive line chart showing temperature trends

Hourly forecast list with times and temperatures

Daily Forecast Section:

7-day forecast list

Optional min/max temperature chart for the week

UI/UX Features
Mobile-first design – Optimized for smartphones

Rounded cards – Modern, clean card design

Gradient backgrounds – Smooth color transitions

Careful spacing – Comfortable and intuitive layout

Bonus Feature
AI Chat Weather Assistant – Ask questions about the weather!

👥 Team Members & Responsibilities
Name	Role	Responsibilities
Chenqi Li	Location & Data Layer	• Handle GPS & permissions
• Reverse geocoding to get city name
• Fetch weather data from Open-Meteo
• Convert raw API data into UI-ready models
• Handle unit conversion (°C / °F)
Sumaiya Khan	UI / Design	• Build mobile-style UI similar to reference image
• Focus on layout, spacing, colors, typography
• Create presentational components (no API calls)
Bibimaryam Jakipbaeva	Charts & Screen Integration	• Implement hourly & daily charts
• Handle web vs native (Victory / Victory Native)
• Compose the main screen
• Wire hooks to UI components
• Switch between Hourly / Daily tabs
Ha Nguyen	Chat Feature	• Build AI chat weather assistant
• LLM for parsing user questions
• Integrate OpenAI / Gemini 1.5 Flash (Free Tier, 15 questions/min)
📋 Prerequisites
Before you begin, ensure you have the following installed:

Node.js (v18 or newer recommended)

npm or Yarn

Git

Expo CLI (optional)

🛠️ Installation & Setup
1. Clone the repository
bash
git clone https://github.com/HaNguyen-oamk/profskill_group14.git
cd profskill_group14
2. Install dependencies
bash
npm install
3. Start the project
For web browser (quick testing):
bash
npm run web
The app will open at http://localhost:19006/

For mobile development:
bash
npm start
Then scan the QR code with Expo Go app on your phone.

🧪 Available Scripts
npm start – Start Expo development server

npm run web – Run in web browser

npm run android – Run on Android

npm run ios – Run on iOS (macOS only)

🛠️ Technologies Used
React Native + Expo – Cross-platform framework

TypeScript – Type-safe development

React Navigation – Screen navigation

Victory / Victory Native – For line charts (hourly/daily)

Open-Meteo API – Free weather data

OpenAI / Gemini 1.5 Flash – AI chat assistant (free tier)

📱 Screens Overview
Home Screen – Hero card + weather stats

Hourly Forecast Screen – Line chart + hourly list

Daily Forecast Screen – 7-day list (+ optional chart)

Chat Screen – AI weather assistant

🤝 Team
Group 14 – Deepening of Student's Professional Skills, OAMK

Chenqi Li

Sumaiya Khan

Bibimaryam Jakipbaeva

Ha Nguyen

📄 License
Educational project – OAMK Deepening of Student's Professional Skillscourse

Check the weather and ask your AI assistant! ☀️🤖💬

