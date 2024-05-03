
const weatherForm = document.querySelector(".weatherForm");
const cityInput  = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apikey = "ff71cec9e85b68eed834526dd98da2ab";

weatherForm.addEventListener("submit",async event => {

    event.preventDefault();//Prevent from from refreshing

    const city = cityInput.value;

    if(city){
        try{
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);
        }
        catch(error){
            console.error(error);
                displayError(error);
        }

    }
    else{
        displayError("Please enter a city");
    }

});

async function getWeatherData(city){
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;

    const response = await fetch(apiUrl);

    if(!response.ok){
        throw new Error("Could not fetch weather data");  
    }

    return await response.json();
    

}

function displayWeatherInfo(data){

    const {name: city, 
            main: {temp, humidity},
            weather: [{description, id}]} = data;
    
    card.textContent = "";
    card.style.display = "flex";

    //Create elements
    
    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const descDisplay = document.createElement("p");
    const weatherEmoji = document.createElement("p");

    cityDisplay.textContent = city;
    tempDisplay.textContent = `${(temp -273.15).toFixed(1)}°C`;
    humidityDisplay.textContent = `Humidty: ${humidity}%`;
    descDisplay.textContent = description;
    weatherEmoji.textContent = getWeatherEmoji(id);

    //CSS class for cityDisplay
    cityDisplay.classList.add("cityDisplay");
    //CSS class for tempDisplay
    tempDisplay.classList.add("tempDisplay");
    //CSS class for humidityDisplay
    humidityDisplay.classList.add("humidityDisplay");
    //CSS class for descDisplay
    descDisplay.classList.add("descDisplay");
    //CSS class for weatherDisplay
    weatherEmoji.classList.add("weatherEmoji");

     card.appendChild(cityDisplay);
     card.appendChild(tempDisplay);
     card.appendChild(humidityDisplay);
     card.appendChild(descDisplay);
     card.appendChild(weatherEmoji);

}


function getWeatherEmoji(weatherId){
    switch (true) {
        case (weatherId >= 200 && weatherId < 300):
            return "⛈";
        case (weatherId >= 300 && weatherId < 400):
            return "🌧";
        case (weatherId >= 500 && weatherId < 600):
            return "🌨";
        case (weatherId >= 600 && weatherId < 700):
            return "❄";
        case (weatherId >= 700 && weatherId < 800):
            return "🌫";
        case (weatherId === 800 ):
            return "☀";
        case (weatherId >= 801 && weatherId < 810):
            return "☁";
        default:
            return "❓";
    }

}

function displayError(message){
    //Because there is no paragraph elements in HTML
    //We have to create to Display

    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");

    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorDisplay);


}