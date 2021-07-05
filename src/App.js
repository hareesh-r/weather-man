import './App.css';
import React, { useState } from "react";

function App() {
  const [city, setCity] = useState("Chennai");
  const [JSON_RESPONSE, setJSON_RESPONSE] = useState([]);

  const API_KEY = "590ef8542927784e438ff86038506500";
  const BASE_URL = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;
  const DAYS_URL = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}`;



  const getResponse = async (BASE_URL, city) => {

    console.log("Waiting for responses...");

    const api_response = await fetch(BASE_URL);

    const response = await api_response.json();

    console.log(city);

    console.log(response);

    setJSON_RESPONSE(response);

  }

  return (
    <div className="App">
      <div className="top">
        <div className="importantCity">
        <div className="importantCities mumbai">
          <img src="https://www.india-briefing.com/news/wp-content/uploads/2013/07/India-Briefing-Economy-of-Mumbai-Indias-Major-Commercial-Hub.jpg" alt="" />
          <div className="sideGroup">
            <h2>Mumbai</h2> <code>climate</code> <p>35°C</p>
          </div>
        </div>
        <div className="importantCities delhi">
          <img src="https://cdn.britannica.com/37/189837-050-F0AF383E/New-Delhi-India-War-Memorial-arch-Sir.jpg" alt="" />
          <div className="sideGroup">
            <h2>Delhi</h2> <code>climate</code> <p>35°C</p>
          </div>
        </div>
        <div className="importantCities chennai">
          <img src="https://im.rediff.com/news/2014/aug/25chennai1.jpg?w=670&h=900" alt="" />
          <div className="sideGroup">
            <h2>Chennai</h2> <code>climate</code> <p>35°C</p>
          </div>
        </div>
        <div className="importantCities kolkatta">
          <img src="https://cdn.britannica.com/75/121075-050-CBF79FB6/Victoria-Statue-front-Memorial-Hall-Kolkata-West.jpg" alt="" />
          <div className="sideGroup">
            <h2>Kolatta</h2> <code>climate</code> <p>35°C</p>
          </div>
        </div>
        <div className="importantCities bangalore">
          <img src="https://lp-cms-production.imgix.net/2019-06/9483508eeee2b78a7356a15ed9c337a1-bengaluru-bangalore.jpg" alt="" />
          <div className="sideGroup">
            <h2>Bangalore</h2> <code>climate</code> <p>35°C</p>
          </div>
        </div>
        </div>
        <div className="search">
          <input type="text" onChange={(e) => { setCity(e.target.value) }} />
          <button onClick={() => { getResponse(BASE_URL, city) }}>Print JSON Object</button>
        </div>
      </div>
    </div>
  );
}

export default App;
