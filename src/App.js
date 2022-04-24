import "./App.css";
import React, { useContext, useState, useEffect } from "react";
import { Line, Bar } from "react-chartjs-2";
import favorite from "./img/favorite.png";
import { UserContext } from "./Wrapper";
import Axios from "axios";
function App() {
  const [city, setCity] = useState("Chennai");
  const [JSON_RESPONSE, setJSON_RESPONSE] = useState([]);
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [showData, setShowData] = useState(false);
  const [climateIcon, setClimateIcon] = useState("10d");
  const [long, setLong] = useState("");
  const [lat, setLat] = useState("");
  const [chennai, setChennai] = useState([]);
  const [mumbai, setMumbai] = useState([]);
  const [beng, setBeng] = useState([]);
  const [kolkata, setKolkata] = useState([]);
  const [delhi, setDelhi] = useState([]);
  const [ShowFav, setShowFav] = useState(false);
  const [FavoriteCities, setFavoriteCities] = useState([]);
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const [tempGraphValue, setTempGraphValue] = useState([]);
  const [tempColValue, setTempColValue] = useState([]);
  const { CurrentUser, setCurrentUser } = useContext(UserContext);

  useEffect(() => {
    var timer = setInterval(() => setDate(new Date()), 60000);
    return function cleanup() {
      clearInterval(timer);
    };
  });
  useEffect(() => {
    getCoordintes();
    getTopCity();
    getlist();
    console.log(CurrentUser);
  }, []);

  const insertFavorite = (CurrentUser, name) => {
    Axios.post("http://localhost:3001/favorite", {
      email: CurrentUser,
      city: name,
    }).then((response) => {
      if (response.data) alert("Favorite Added Successfully");
      else alert("An Error Occured");
    });
  };

  let API_KEY = "bf2739a632bb9f29a37f9a4359c75846";
  const LL_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=${API_KEY}`;
  const BASE_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

  const getCoordintes = () => {
    var options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };
    const success = (pos) => {
      var crd = pos.coords;
      var lat = crd.latitude.toString();
      var lng = crd.longitude.toString();
      setLat(lat);
      setLong(lng);
      return;
    };
    const error = (err) => {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    };
    navigator.geolocation.getCurrentPosition(success, error, options);
  };
  const getTop = async (i) => {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${i}&units=metric&appid=${API_KEY}`;

    const api_response = await fetch(url);

    const response = await api_response.json();

    if (i == "chennai") {
      setChennai([response.weather[0].main, response.main.temp]);
    } else if (i == "mumbai") {
      setMumbai([response.weather[0].main, response.main.temp]);
    } else if (i == "bengaluru") {
      setBeng([response.weather[0].main, response.main.temp]);
    } else if (i == "delhi") {
      setDelhi([response.weather[0].main, response.main.temp]);
    } else if (i == "kolkata") {
      setKolkata([response.weather[0].main, response.main.temp]);
    }
  };
  const getTopCity = () => {
    ["mumbai", "delhi", "chennai", "kolkata", "bengaluru"].map((i) => {
      getTop(i);
    });
  };

  const getResponse = async (URL,cityName) => {
    console.log(URL)
                  
    setCity(cityName);
    console.log("Waiting for responses...");

    const api_response = await fetch(URL);

    const response = await api_response.json();

    console.log(response);

    let newClass = "snow";

    if (response.cod == "404") {
      setShowData(false);
    } else {
      const weatherID = response.weather[0].id;

      if (weatherID > 800) newClass = "cloud";
      else if (weatherID == 800) newClass = "sun";
      else if (weatherID >= 700) newClass = "cloud";
      else if (weatherID >= 600) newClass = "snow";
      else if (weatherID >= 500) newClass = "rain";
      else if (weatherID >= 300) newClass = "rain";
      else if (weatherID >= 200) newClass = "light";

      var element = document.getElementById("app");

      element.classList.remove("sun");
      element.classList.remove("cloud");
      element.classList.remove("rain");
      element.classList.remove("light");
      element.classList.remove("snow");
      element.classList.add(newClass);

      setJSON_RESPONSE(response);

      setClimateIcon(response.weather[0].icon);

      setCountry(response.sys.country);

      setCity(response.name);

      setShowData(true);

      getlist();
    }
  };

  const getlist = async () => {
    let tempGraph = [];
    let tempCol = [];
    const api_response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`
    );

    const response = await api_response.json();

    response.list.map((i) => {
      tempGraph.push(i.main.temp);
      tempCol.push(i.dt_txt.slice(0, 10));
    });

    setTempGraphValue(tempGraph);
    setTempColValue(tempCol);
  };

  const getFavorites = () => {
    Axios.get("http://localhost:3001/favorite", {
            params: {
                email_id: CurrentUser,
            }
        }).then((response) => {
            if(response.data.length > 0){
                console.log(response.data)
                setFavoriteCities(response.data)
                setShowFav(true);
                document.getElementById("app").classList.add("blur")
            }else{
                alert("No Favorites Found")
            }
        });
  }

  return (
    <>
    <div id="app" className="App cloud">
      <div
        onClick={() => {
          getFavorites()

        }}
        className="flex fav-left"
      >
        <h4>Favorites</h4>
        <img src={favorite} alt="" />
      </div>
      <div className="top">
        <div className="importantCity">
          <div
            onClick={() => {
              setCity("mumbai");
              getResponse(
                `https://api.openweathermap.org/data/2.5/weather?q=mumbai&units=metric&appid=${API_KEY}`
              );
            }}
            className="importantCities mumbai"
          >
            <img
              src="https://www.india-briefing.com/news/wp-content/uploads/2013/07/India-Briefing-Economy-of-Mumbai-Indias-Major-Commercial-Hub.jpg"
              alt=""
            />

            <div className="sideGroup">
              <h2>Mumbai</h2> <code>{mumbai[0]}</code> <p>{mumbai[1]}°C</p>
            </div>
          </div>

          <div
            onClick={() => {
              setCity("delhi");
              getResponse(
                `https://api.openweathermap.org/data/2.5/weather?q=delhi&units=metric&appid=${API_KEY}`
              );
            }}
            className="importantCities delhi"
          >
            <img
              src="https://cdn.britannica.com/37/189837-050-F0AF383E/New-Delhi-India-War-Memorial-arch-Sir.jpg"
              alt=""
            />

            <div className="sideGroup">
              <h2>Delhi</h2> <code>{delhi[0]}</code> <p>{delhi[1]}°C</p>
            </div>
          </div>

          <div
            onClick={() => {
              setCity("chennai");
              getResponse(
                `https://api.openweathermap.org/data/2.5/weather?q=chennai&units=metric&appid=${API_KEY}`
              );
            }}
            className="importantCities chennai"
          >
            <img
              src="https://im.rediff.com/news/2014/aug/25chennai1.jpg?w=670&h=900"
              alt=""
            />
            <div className="sideGroup">
              <h2>Chennai</h2> <code>{chennai[0]}</code> <p>{chennai[1]}°C</p>
            </div>
          </div>

          <div
            onClick={() => {
              setCity("kolkata");
              getResponse(
                `https://api.openweathermap.org/data/2.5/weather?q=kolkata&units=metric&appid=${API_KEY}`
              );
            }}
            className="importantCities kolkata"
          >
            <img
              src="https://cdn.britannica.com/75/121075-050-CBF79FB6/Victoria-Statue-front-Memorial-Hall-Kolkata-West.jpg"
              alt=""
            />

            <div className="sideGroup">
              <h2>Kolkata</h2> <code>{kolkata[0]}</code> <p>{kolkata[1]}°C</p>
            </div>
          </div>

          <div
            onClick={() => {
              setCity("Bangalore");
              getResponse(
                `https://api.openweathermap.org/data/2.5/weather?q=Bangalore&units=metric&appid=${API_KEY}`
              );
            }}
            className="importantCities bangalore"
          >
            <img
              src="https://lp-cms-production.imgix.net/2019-06/9483508eeee2b78a7356a15ed9c337a1-bengaluru-bangalore.jpg"
              alt=""
            />

            <div className="sideGroup">
              <h2>Bangalore</h2> <code>{beng[0]}</code> <p>{beng[1]}°C</p>
            </div>
          </div>
        </div>

        <div className="search">
          <input
            type="text"
            placeholder="Search for a city"
            onChange={(e) => {
              setCity(e.target.value);
            }}
          />

          <button
            onClick={() => {
              getResponse(BASE_URL);
            }}
          >
            Search
          </button>

          <img
            onClick={() => {
              insertFavorite(CurrentUser, city);
            }}
            className="favorite"
            src={favorite}
            alt=""
          />
        </div>
      </div>

      <div className="bottom">
        {showData ? (
          <div className="left">
            <h1>
              {city} , {country}
            </h1>

            <h2>{date.toLocaleTimeString()}</h2>

            <h2>{date.toLocaleDateString()}</h2>

            <h4>{days[date.getDay()]}</h4>

            <img
              src={`https://openweathermap.org/img/wn/${climateIcon}@2x.png`}
              alt=""
            />

            <code>{JSON_RESPONSE.weather[0].description}</code>

            <h1>{JSON_RESPONSE.main.temp}°C</h1>

            <h3>
              Min: {JSON_RESPONSE.main.temp_min}°C Max:{" "}
              {JSON_RESPONSE.main.temp_max}°C
            </h3>
          </div>
        ) : (
          <div className="left">
            <h2 className="startup">
              <button
                onClick={() => {
                  getResponse(LL_URL);
                }}
              >
                Get My current weather
              </button>

              <code>Allow Location access</code>
            </h2>
          </div>
        )}
        <div className="right">
          <Line
            height={300}
            width={700}
            data={{
              labels: tempColValue,
              datasets: [
                {
                  fill: true,
                  cubicInterpolationMode: "monotone",
                  label: `Climate in ${city}`,
                  data: tempGraphValue,
                  backgroundColor: ["rgba(0, 0, 0, 0.5)"],
                  borderColor: [
                    "rgba(255, 99, 132, 0.7)",
                    "rgba(54, 162, 235, 0.7)",
                    "rgba(255, 206, 86, 0.7)",
                    "rgba(75, 192, 192, 0.7)",
                    "rgba(153, 102, 255, 0.7)",
                    "rgba(255, 159, 64, 0.7)",
                  ],
                  borderWidth: 2,
                },
              ],
            }}
            options={{
              maintainAspectRatio: false,
              scales: {
                y: {
                  beginAtZero: true,
                },
                animation: {
                  duration: 0,
                },
              },
            }}
          />
        </div>
      </div>
      
    </div>
    {ShowFav && (
        <div className="fav-list flex col">
          {FavoriteCities.map((cityName)=>(
            <h1 className="fav-city" onClick={()=>{
              
              setCity(cityName.city);
              console.log(cityName.city+" "+city+" "+BASE_URL)
              getResponse(`https://api.openweathermap.org/data/2.5/weather?q=${cityName.city}&units=metric&appid=${API_KEY}`);
              document.getElementById("app").classList.remove("blur")
              setShowFav(false)
            }}>{cityName.city}</h1>
          ))}
        </div>
      )}
    </>
  );
}

export default App;
