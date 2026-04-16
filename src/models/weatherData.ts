export interface WeatherData {
    day: string;
    highest_temp: number;
    lowest_temp: number;
    avg_temp: number; 
    will_rain: boolean;
    is_sunny: boolean;
    sunshine_duration: number; // in minutes
    rain_quantity: number; //in mm
    wind_speed_max: number;
    humidity_avg: number;
    is_frost: boolean; 
}