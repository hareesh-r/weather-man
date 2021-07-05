import './App.css';
import React, { useState, useEffect } from "react";


function App() {
  const [city, setCity] = useState("Chennai");
  const [JSON_RESPONSE, setJSON_RESPONSE] = useState([]);
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [showData, setShowData] = useState(false);
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const [climateIcon, setClimateIcon] = useState("10d");
  const [long, setLong] = useState("");
  const [lat, setLat] = useState("");

  useEffect(() => {
    var timer = setInterval(() => setDate(new Date()), 1000)
    return function cleanup() {
      clearInterval(timer)
    }
  })
  useEffect(() => { getCoordintes(); }, []);

  const API_KEY = "590ef8542927784e438ff86038506500";
  const LL_URL = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=${API_KEY}`
  const BASE_URL = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
  const DAYS_URL = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`;

  const getCoordintes = () => {
    var options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };
    const success = (pos) => {
      var crd = pos.coords;
      var lat = crd.latitude.toString();
      var lng = crd.longitude.toString();
      console.log(`Latitude: ${lat}, Longitude: ${lng}`);
      setLat(lat);
      setLong(lng);
      return;
    }
    const error = (err) => {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }
    navigator.geolocation.getCurrentPosition(success, error, options);
  }



  const getResponse = async (URL) => {

    console.log(URL)

    console.log("Waiting for responses...");

    const api_response = await fetch(URL);

    const response = await api_response.json();

    console.log(response);

    if (response.cod == "404") {
      setShowData(false);

    } else {

      setJSON_RESPONSE(response);

      setClimateIcon(response.weather[0].icon);

      setCountry(response.sys.country);

      setCity(response.name);

      setShowData(true);
    }

  }

  return (
    <div id="app" className="App cloud">

      <div className="top">

        <div className="importantCity">

          <div
            onClick={() => { setCity("mumbai"); getResponse(`http://api.openweathermap.org/data/2.5/weather?q=mumbai&units=metric&appid=${API_KEY}`) }}
            className="importantCities mumbai">

            <img src="https://www.india-briefing.com/news/wp-content/uploads/2013/07/India-Briefing-Economy-of-Mumbai-Indias-Major-Commercial-Hub.jpg" alt="" />

            <div className="sideGroup">

              <h2>Mumbai</h2> <code>climate</code> <p>35°C</p>

            </div>

          </div>

          <div onClick={() => { setCity("delhi"); getResponse(`http://api.openweathermap.org/data/2.5/weather?q=delhi&units=metric&appid=${API_KEY}`) }} className="importantCities delhi">
            <img src="https://cdn.britannica.com/37/189837-050-F0AF383E/New-Delhi-India-War-Memorial-arch-Sir.jpg" alt="" />

            <div className="sideGroup">

              <h2>Delhi</h2> <code>climate</code> <p>35°C</p>

            </div>

          </div>

          <div onClick={() => { setCity("chennai"); getResponse(`http://api.openweathermap.org/data/2.5/weather?q=chennai&units=metric&appid=${API_KEY}`) }} className="importantCities chennai">

            <img src="https://im.rediff.com/news/2014/aug/25chennai1.jpg?w=670&h=900" alt="" />
            <div className="sideGroup">

              <h2>Chennai</h2> <code>climate</code> <p>35°C</p>

            </div>

          </div>

          <div onClick={() => { setCity("kolkata"); getResponse(`http://api.openweathermap.org/data/2.5/weather?q=kolkata&units=metric&appid=${API_KEY}`) }} className="importantCities kolkata">

            <img src="https://cdn.britannica.com/75/121075-050-CBF79FB6/Victoria-Statue-front-Memorial-Hall-Kolkata-West.jpg" alt="" />

            <div className="sideGroup">

              <h2>Kolkata</h2> <code>climate</code> <p>35°C</p>

            </div>

          </div>

          <div onClick={() => { setCity("Bangalore"); getResponse(`http://api.openweathermap.org/data/2.5/weather?q=Bangalore&units=metric&appid=${API_KEY}`) }} className="importantCities bangalore">

            <img src="https://lp-cms-production.imgix.net/2019-06/9483508eeee2b78a7356a15ed9c337a1-bengaluru-bangalore.jpg" alt="" />

            <div className="sideGroup">

              <h2>Bangalore</h2> <code>climate</code> <p>35°C</p>

            </div>

          </div>

        </div>

        <div className="search">

          <input type="text" placeholder="Search for a city" onChange={(e) => { setCity(e.target.value) }} />

          <button onClick={() => { getResponse(BASE_URL, city) }}>Search</button>

        </div>

      </div>

      <div className="bottom">

        {showData
          ?
          (
            <div className="left">

              <h1>{city} , {country}</h1>

              <h2>{date.toLocaleTimeString()}</h2>

              <h2>{date.toLocaleDateString()}</h2>

              <h4>{days[date.getDay()]}</h4>

              <img src={`http://openweathermap.org/img/wn/${climateIcon}@2x.png`} alt="" />

              <code>{JSON_RESPONSE.weather[0].description}</code>

              <h1>{JSON_RESPONSE.main.temp}°C</h1>

              <h3>Min: {JSON_RESPONSE.main.temp_min}°C Max: {JSON_RESPONSE.main.temp_max}°C</h3>


            </div>

          )
          :
          (
            <div className="left">

              <h2 className="startup">

                <button
                  onClick={() => { getResponse(LL_URL) }}>Get My current weather
                </button>

                <code>Allow Location access</code>

              </h2>

            </div>
          )
        }
        <div className="right">
          
        </div>
      </div>



    </div>
  );
}

export default App;
