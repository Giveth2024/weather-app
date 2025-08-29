'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function Weather() {
  const weatherApiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
  const router = useRouter();

  const [user, setUser] = useState("");
  const [city, setCity] = useState("");
  const [weatherCards, setWeatherCards] = useState([]); // stores all fetched cards

  const ugandaCities = ["Soroti","Sironko","Tororo","Wakiso","Ntungamo","Rakai","Rukungiri","Sembabule","Wobulenzi","Ntoroko","Pallisa","Paidha","Nyachera","Yumbe","Pader Palwo","Nsika","Njeru","Nebbi","Namasuba","Mityana","Mukono","Mbarara","Mubende","Nakaseke","Namutumba","Muhororo","Nakasongola","Mayuge","Mpigi","Masindi Port","Ngora","Mitoma","Mbale","Moroto","Masindi","Lugazi","Kumi","Luwero","Kiryandongo","Lwengo","Maracha","Masaka","Lira","Lyantonde","Kyegegwa","Kyenjojo","Kisoro","Kotido","Kitgum","Kyotera","Kilembe","Kigorobya","Koboko","Kireka","Kiruhura","Kibuku","Kaliro","Kaberamaido","Kamuli","Kabale","Kibale","Kajansi","Kayunga","Kanungu","Kamwenge","Kapchorwa","Kiboga","Kasese","Kampala","Katakwi","Kalangala","Kanoni","Kagadi","Iganga","Gulu","Jinja","Kaabong","Hoima","Ibanda","Bwizibwera","Bweyogerere","Entebbe","Busembatia","Fort Portal","Bushenyi","Byakabanda","Bundibugyo","Butaleja","Buwenge","Dokolo","Buyende","Busia","Bukedea","Bugembe","Bulisa","Buikwe","Bulambuli","Adjumani","Bukomansimbi","Bukwa","Bugiri","Bududa","Binyin","Arua","Amudat","Amolatar","Nakapiripirit","Abim","Alebtong","Nwoya"];
  ugandaCities.sort();

  // ------------------------
  // 1️⃣ Check login
  // ------------------------
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
  }, []);

  // ------------------------
  // 2️⃣ Fetch weather for a single city
  // ------------------------
  async function fetchCityWeather(cityName) {
    try {
      const response = await axios.get(
        `https://api.weatherapi.com/v1/current.json?key=${weatherApiKey}&q=${cityName}&aqi=no`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching weather for:", cityName, error);
      console.log("Error fetching weather for:", cityName, error);
      alert("Error:: Region Doesn't Exist...");
      return null;
    }
  }

  // ------------------------
  // 3️⃣ Load initial 30 cards
  // ------------------------
  useEffect(() => {
    const loadInitialCards = async () => {
      const first30Cities = ugandaCities.slice(0, 30);
      const promises = first30Cities.map((city) => fetchCityWeather(city));
      const results = await Promise.all(promises);
      const filteredResults = results.filter((res) => res !== null);
      setWeatherCards(filteredResults);
    };
    loadInitialCards();
  }, []);

  // ------------------------
  // 4️⃣ Search or select a city
  // ------------------------
  // ------------------------
  // 4️⃣ Search or select a city
  // ------------------------
  async function handleSearch(cityName) {
  if (!cityName) {
      // Reset to initial 30 cards if needed
      setWeatherCards(initialCards); 
      return;
  }

  const data = await fetchCityWeather(cityName);
  if (data) {
      // Only show the searched city
      setWeatherCards([data]);
      setCity(""); // clear input
  }
  }

  function handleClick(region)
  {
    localStorage.setItem("SelectedCity", region);
    router.push(`/region`)
  }
  
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
    <div className="bg-gray-200 min-h-[100dvh] w-[95%] mx-auto flex flex-col items-center p-9 overflow-y-scroll overflow-x-hidden">

    <div className="w-full flex justify-end items-center mb-1">
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

      {/* Search Box */}
      <div className="flex w-full flex-col sm:flex-row max-w-md mb-4 gap-2">
        <input
          type="text"
          placeholder="Enter the City Name"
          className="flex-1 p-3 rounded-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button
          onClick={() => handleSearch(city)}
          className="bg-blue-600 p-3 text-white px-6 rounded-lg hover:bg-blue-700 transition shadow"
        >
          Search
        </button>
      </div>

      {/* Dropdown */}
      <select
        name="regions"
        value={city}
        onChange={(e) => handleSearch(e.target.value)}
        className="bg-gray-300 text-gray-800 p-3 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full max-w-md mb-6"
      >
        <option value="">Select a city</option>
        {ugandaCities.map((ugandaCity, index) => (
          <option key={index} value={ugandaCity}>
            {ugandaCity}
          </option>
        ))}
      </select>
              <button
          onClick={() => window.location.reload()}
          className="bg-blue-600 p-3 text-white px-6 rounded-lg hover:bg-blue-700 mb-4 transition shadow"
        >
          Refresh
        </button>

      {/* Weather Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        {weatherCards.map((weather, index) => (
          <div key={index} onClick={() => handleClick(weather.location.name)} className="bg-white p-6 rounded-3xl shadow-xl flex flex-col items-center text-center transition-transform hover:scale-105">
            <h3 className="text-2xl font-bold text-gray-800">{weather.location.name}, {weather.location.country}</h3>
            <p className="text-gray-500 text-sm mb-2">{weather.location.localtime}</p>
            <img
              src={weather.current.condition.icon}
              alt={weather.current.condition.text}
              className="w-24 h-24 mb-2"
            />
            <p className="text-yellow-500 text-lg font-semibold">{weather.current.condition.text}</p>
            <p className="text-gray-700 text-lg font-medium">Temperature: {weather.current.temp_c}°C</p>
            <p className="text-gray-600 text-sm">Humidity: {weather.current.humidity}% | Wind: {weather.current.wind_kph} kph</p>
          </div>
        ))}
      </div>
    </div>
  );
}
