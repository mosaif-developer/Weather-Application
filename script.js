// For weather app we need api so we took that api from open weather app...
// and also we need to create an asynchronous function and await fetch.....

const apiKey = "d1ac5edbefed78db13ff444054d58197";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector('.search button');
const weatherIcon = document.querySelector(".weather-icon");

// This function has all the weather updates of a particular city or country

async function checkWeather(city){
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    // Here, if there is no particular city or country then it will show invalid city or country
     
    if(response.status == 404){
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none"
    } else {

        // Here, we have created a variable called data and all the data ex:
        // city, temperature, humidity and wind speed are stored in this variable...

        var data = await response.json();
        
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";
    
        // Here, it will set the pictures according to the weather

        if(data.weather[0].main=="Clouds"){
          weatherIcon.src = "clouds.png";
        } else if(data.weather[0].main=="Clear"){
            weatherIcon.src = "clear.png";
        } else if(data.weather[0].main=="Rain"){
            weatherIcon.src = "rain.png";
        } else if(data.weather[0].main == "Drizzle"){
            weatherIcon.src = "drizzle.png";
        } else if(data.weather[0].main == "Mist"){
            weatherIcon.src = "mist.png";
        } else if(data.weather[0].main == "Snow"){
            weatherIcon.src = "snow.png";
        }
    
        // Here, we are hidding the display

        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
    
    }   
}

// Here, we are adding an event called addEventListener for search button

searchBtn.addEventListener("click",() => {
   checkWeather(searchBox.value);
})

checkWeather();