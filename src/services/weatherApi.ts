import type { WeatherData } from "../models/weatherData";

const lat = 50.677997;
const lon = 7.020757;

const BASE_URL = "https://api.brightsky.dev/weather?lat=" + lat + "&lon=" + lon;

export async function getWeatherForDay(day: string) {
    const response = await fetch(
        `${BASE_URL}&date=${day}`
    )

     if (!response.ok) {
    throw new Error("Failed to fetch weather for " + day)
    }

    const data = await response.json()
    return data['weather'] || []
}

export async function aggregateWeatherDataForDay(day: string): Promise<WeatherData> {
    const weather = await getWeatherForDay(day)
 
    var temperatures: number[] = []
    var rain: number[] = []
    var sunshine: number[] = []
    var windSpeed: number[] = []
    var humidity: number[] =[]

    weather.map((hour) => {
        temperatures.push(hour.temperature)
        rain.push(hour.precipitation)
        if (hour.sunshine != null) {
            sunshine.push(hour.sunshine)
        }
        windSpeed.push(hour.wind_speed)
        if (hour.relative_humidity === null) {
            humidity.push(0)
        } else {
            humidity.push(hour.relative_humidity)
        }
    })

    console.log('sunshine', (sunshine.reduce((a,b) => a + b)))

    const data: WeatherData = {
        day: day,
        lowest_temp: Math.min(...temperatures),
        highest_temp: Math.max(...temperatures),
        avg_temp: temperatures.reduce((a, b) => a + b) / temperatures.length,
        rain_quantity: rain.reduce((a,b) => a + b),
        will_rain: Math.max(...rain) > 0.2,
        is_sunny: ((sunshine.reduce((a,b) => a + b)) / 60) > 5,
        sunshine_duration: sunshine.reduce((a,b) => a + b),
        wind_speed_max: Math.max(...windSpeed),
        humidity_avg: humidity.reduce((a, b) => a + b) / humidity.length,
        is_frost: false,
    }

    return data
}