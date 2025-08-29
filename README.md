This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# 🌤️ Weather & Air Quality App

A React-based weather dashboard that fetches **real-time weather** and **air quality data** for different regions in Uganda (and beyond) using the [WeatherAPI](https://www.weatherapi.com/docs/).

---

## 🚀 Features
- Search weather by **city or region**.
- Display **current temperature, condition, and forecast**.
- Fetch **air quality data** and check it against WHO standards.
- User **login/logout** functionality.
- Environment variables for secure API key storage.
- Responsive design with clean UI.

---

## 📦 Installation & Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/weather-air-quality-app.git
   cd weather-air-quality-app

    Install dependencies:

npm install

Create a .env file in the project root:

VITE_WEATHER_API_KEY=your_api_key_here

Run the development server:

    npm run dev

🔑 API Usage

This app uses WeatherAPI

.
You’ll need to sign up for a free API key and place it in .env as shown above.

Example request:

https://api.weatherapi.com/v1/current.json?key=YOUR_API_KEY&q=Kampala&aqi=yes

🧪 Air Quality Check

We interpret AQI data against WHO standards:

    0–50 (Good) ✅ Safe

    51–100 (Moderate) ⚠️ Acceptable

    101–150 (Unhealthy for Sensitive Groups) 🚫

    151–200 (Unhealthy) ❌

    201–300 (Very Unhealthy) ☠️

    301+ (Hazardous) 💀

🛠️ Tech Stack

    React (Vite)

    TailwindCSS

    WeatherAPI

    Context API (for auth & state management)