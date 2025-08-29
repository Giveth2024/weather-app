"use client"
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function RegionPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const city = searchParams.get("city"); 
  const weatherApiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY; 

  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState("");
  const [aqiIndex, setAqiIndex] = useState(null);

  const epaLevels = {
    1: "Good 😊",
    2: "Moderate 🙂",
    3: "Unhealthy for sensitive groups 😷",
    4: "Unhealthy 🚫",
    5: "Very Unhealthy ☠️",
    6: "Hazardous 💀"
  };

  useEffect(() => {
    const loggedInUser = sessionStorage.getItem("IsLoggedIn");
    if (!loggedInUser) {
      alert("Must be Logged In");
      router.push("/login");
    } else {
      const [username, fullname] = loggedInUser.split(",");
      const names = fullname.split(" ");
      setUser(names[0]);
    }
  }, [router]);

  useEffect(() => {
    if (city) {
      setLoading(true);
      fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=${weatherApiKey}&q=${city}&days=5&aqi=yes`
      )
        .then(res => res.json())
        .then(data => {
          setDetails(data);
          setLoading(false);

          // Grab AQI index from WeatherAPI
            // Inside useEffect after fetching:
            const airQualityNow = data.current.air_quality;
            const forecastAirQuality = data.forecast?.forecastday[0]?.day?.air_quality;

            if (forecastAirQuality && forecastAirQuality["us-epa-index"]) {
            setAqiIndex(forecastAirQuality["us-epa-index"]);
            }

        })
        .catch(err => {
          console.error("Error fetching weather:", err);
          setLoading(false);
        });
    }
  }, [city, weatherApiKey]);

  if (!city) {
    return <p className="text-center text-gray-600">No city selected.</p>;
  }

  if (loading) {
    return <p className="text-center text-gray-500">Loading weather details...</p>;
  }

  if (!details || details.error) {
    return <p className="text-center text-red-500">Failed to load weather data.</p>;
  }

  const { location, current, forecast } = details;

  function logOut(data)
  {
    const loggedInUser = sessionStorage.getItem("IsLoggedIn");
    const [username, fullname] = loggedInUser.split(",");
    const names = fullname.split(" ");
    if (data === names[0])
    {
        console.log("Names Match");
        sessionStorage.removeItem("IsLoggedIn");
        alert("You are successfully Logged out");
        router.push("/login")
    }
    
  }

  return (
    <div className="bg-gray-200 p-9 mx-auto overflow-x-hidden overflow-y-scroll w-full">
    <div className="w-full flex justify-between items-center mb-6">
        
      <button
        onClick={() => router.push("/weather")}
        className="bg-blue-600 py-2 mb-3 w-max text-white px-3 rounded-lg hover:bg-blue-700 transition shadow"
      >
        Back
      </button>
      <button
        onClick={() => logOut(user)}
        className="bg-blue-600 py-2 mb-3 w-max text-white px-3 rounded-lg hover:bg-blue-700 transition shadow"
      >
        Logout
      </button>
    </div>

      {/* Navigation */}
      <nav className="w-full flex justify-between items-center mb-6">
        <span className="text-2xl font-bold text-gray-800">Givefy</span>
        <div className="text-gray-600">Hello, {user}</div>
      </nav>

      <h1 className="text-3xl font-bold mb-6">
        Weather in {location.name}, {location.country}
      </h1>

      {/* Current Weather Card */}
      <div className="bg-white p-6 rounded-2xl shadow-xl flex flex-col items-center text-center mb-6">
        <img
          src={current.condition.icon}
          alt={current.condition.text}
          className="w-20 h-20"
        />
        <p className="text-xl font-semibold">{current.condition.text}</p>
        <p className="text-lg">🌡 Temp: {current.temp_c}°C (Feels like {current.feelslike_c}°C)</p>
        <p className="text-lg">💧 Humidity: {current.humidity}%</p>
        <p className="text-lg">🌬 Wind: {current.wind_kph} kph {current.wind_dir}</p>
        <p className="text-lg">☀️ UV Index: {current.uv}</p>
      </div>

{/* Current pollutant readings */}
<div className="bg-white p-4 rounded-lg shadow-md mb-4">
  <p>CO: {current.air_quality.co.toFixed(2)}</p>
  <p>NO₂: {current.air_quality.no2.toFixed(2)}</p>
  <p>O₃: {current.air_quality.o3.toFixed(2)}</p>
  <p>PM2.5: {current.air_quality.pm2_5.toFixed(2)}</p>
  <p>PM10: {current.air_quality.pm10.toFixed(2)}</p>
</div>

{/* EPA AQI meaning */}
{aqiIndex && (
  <div className={`p-4 rounded-xl shadow-lg text-white text-center mb-6
    ${aqiIndex === 1 ? "bg-green-500" : 
      aqiIndex === 2 ? "bg-yellow-400 text-black" : 
      aqiIndex === 3 ? "bg-orange-500" :
      aqiIndex === 4 ? "bg-red-600" : 
      aqiIndex === 5 ? "bg-purple-600" : 
      "bg-gray-800"}`}>
    <h2 className="text-xl font-bold">Air Quality Index</h2>
    <p className="mt-2 text-lg">{epaLevels[aqiIndex]}</p>
  </div>
)}


      {/* Forecast */}
      <h2 className="text-2xl font-bold mb-4">5-Day Forecast</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {forecast.forecastday.map(day => (
          <div key={day.date} className="bg-blue-50 p-4 rounded-lg shadow-xl flex flex-col items-center">
            <p className="font-semibold">{day.date}</p>
            <img
              src={day.day.condition.icon}
              alt={day.day.condition.text}
              className="w-14 h-14"
            />
            <p>{day.day.condition.text}</p>
            <p className="text-lg">🌡 {day.day.avgtemp_c}°C</p>
            <p>🌧 {day.day.daily_chance_of_rain}% chance of rain</p>
          </div>
        ))}
      </div>
    </div>
  );
}
