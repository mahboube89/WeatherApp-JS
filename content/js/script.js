
//Refrence to HtML elements
const result = document.querySelector("#weather-result");
const searchBtn = document.querySelector("#search-btn");
const cityInput = document.querySelector("#city-name");


cityInput.addEventListener("keypress", function(event){

    //if the Enter key is pressed call the getWeather function
    if (event.key === "Enter"){
        getWeather();
    }
});

// Display the current date
function showDate() {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  
    const now = new Date();
    const dayName = days[now.getDay()];
    const day = now.getDate();
    const monthName = months[now.getMonth()];
    const year = now.getFullYear();
  
    return `${dayName} ${day} ${monthName} ${year}`;
  }

  console.log(showDate());

//Function to fetch weather details from api and display them
const getWeather = ()=> {

    const cityValue = cityInput.value;

    if (cityValue.length === 0){
        //Display a mesage if the city name is not entered
        result.innerHTML =`<h4 class="message">Please enter a city name to search</h4>`;
        return;

    } else {
        //https://openweathermap.org/current for more information
        //API URL for fetching weather data
        const url =`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${key}&units=metric`
       
        //clear the input field
        cityInput.value= "";

        fetch(url)
            .then((resp)=> resp.json())
            .then((data) => {

                console.log(data);

                //Display the weather data in the result div
                result.innerHTML=`
                    <h2>${data.name}</h2>
                    <p class="container__date">${showDate()}<p>
                    <h1>${data.main.temp}&#176;</h1>
                    <h4 class="container__weather-data">${data.weather[0].main}</h4>
                    <h4 class="container__weather-description" >${data.weather[0].description}</h4>
                    <img src="https://openweathermap.org/img/w/${data.weather[0].icon}.png" >
                    <div class="details__container">
                        <div>
                            <h4 class="title">min</h4>
                            <h4 class="temp">${data.main.temp_min}&#176;</h4>
                        </div>
                        <div>
                            <h4 class="title">max</h4>
                            <h4 class="temp">${data.main.temp_max}&#176;</h4>
                        </div>
                        <div>
                            <h4 class="title">Feels like</h4>
                            <h4 class="temp">${data.main.feels_like}&#176;</h4>
                        </div>
                        <div>
                            <h4 class="title">Humidity</h4>
                            <h4 class="temp">${data.main.humidity}%</h4>
                        </div>
                    </div>
                `;
            })
            .catch(() =>{
                //display an error message if the city is not found 
                result.innerHTML = `<h4 class="message">Failed to fetch weather data. Please try again.</h4>`
             });    

    }
};

//Attach event listeners to the search button and window load event
searchBtn.addEventListener("click" , getWeather);
