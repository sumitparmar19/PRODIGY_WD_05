document.getElementById('location-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const locationInput = document.getElementById('location-input').value;
    fetchData(locationInput);
});

async function fetchData(city) {
    const url = `https://weather-api138.p.rapidapi.com/weather?city_name=${city}`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '4f673d1d99msh64fd304eab9b567p1a9397jsn30b4824be346',
            'X-RapidAPI-Host': 'weather-api138.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const result = await response.json();

        // Convert temperature from Kelvin to Celsius
        const temperatureCelsius = result.main.temp - 273.15;

        // Update the UI with weather information
        document.getElementById('location-text').textContent = result.name;
        document.getElementById('temperature-text').textContent = temperatureCelsius.toFixed(2) + '°C';
        document.getElementById('weather-text').textContent = result.weather[0].description;
        document.getElementById('wind-text').textContent = 'Wind Speed: ' + result.wind.speed + ' m/s';
        document.getElementById('humidity-text').textContent = 'Humidity: ' + result.main.humidity + '%';

        // Determine weather condition and display corresponding image and text
        const conditionDiv = document.getElementById('weather-condition');
        conditionDiv.style.display = 'block'; // Show the weather condition
        if (temperatureCelsius < 0) {
            conditionDiv.innerHTML = `<img src="Assets/comp_1.gif" alt="Snow Icon" width="200" height="200"><br> <br><span>Condition:</span><b> <span id="condition-text">Snowing</span></b>`;
        } else if (result.main.humidity > 85) {
            conditionDiv.innerHTML = `<img src="Assets/rain2.gif" alt="Rain Icon" width="200" height="200"><br><br> <span>Condition:</span> <b><span id="condition-text">Raining</span></b>`;
        } else {
            conditionDiv.innerHTML = `<img src="Assets/clear2.gif" alt="Clear Icon" width="200" height="200"> <br><br><span>Condition:</span> <b><span id="condition-text">Clear</span></b>`;
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
        alert('Error fetching weather data. Please try again later.');
    }
}
