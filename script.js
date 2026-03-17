async function getWeather() {
    const city = document.getElementById("city").value;

    if (city === "") {
        document.getElementById("result").innerHTML = "<p>Please enter a city!</p>";
        return;
    }

    const apiKey = "3f919b050c4c0fa35f30de0701b38e17";

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod !== 200) {
            document.getElementById("result").innerHTML = `<p>${data.message}</p>`;
            return;
        }

        let icon = "";
        let bg = "";

        switch (data.weather[0].main) {
            case "Clear":
                icon = "☀️";
                bg = "linear-gradient(135deg, #fceabb, #f8b500)";
                break;
            case "Clouds":
                icon = "☁️";
                bg = "linear-gradient(135deg, #bdc3c7, #2c3e50)";
                break;
            case "Rain":
                icon = "🌧️";
                bg = "linear-gradient(135deg, #4b79a1, #283e51)";
                break;
            default:
                icon = "🌤️";
                bg = "linear-gradient(135deg, #4facfe, #00f2fe)";
        }

        document.body.style.background = bg;

        document.getElementById("result").innerHTML = `
            <h2>${data.name}</h2>
            <div class="weather-icon">${icon}</div>
            <p class="temp">${data.main.temp}°C</p>
            <p>${data.weather[0].main}</p>
            <p>💧 ${data.main.humidity}% Humidity</p>
        `;

    } catch (error) {
        document.getElementById("result").innerHTML = "<p>Error fetching data!</p>";
    }
}

// Enter key support
document.getElementById("city").addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        getWeather();
    }
});