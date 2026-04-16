import { useEffect, useState } from "react";
import { aggregateWeatherDataForDay } from "../services/weatherApi";
import type { WeatherData } from "../models/weatherData";

type DayData = {
  weather: WeatherData;
  icons: string[];
};

function getDateString(year: number, month: number, day: number) {
  return new Date(year, month, day).toISOString().split("T")[0];
}

export function useCalendarWeather(currentDate: Date) {
  const [data, setData] = useState<Record<number, DayData>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMonthWeather() {
      setLoading(true);

      const year = currentDate.getFullYear();
      const month = currentDate.getMonth();

      const results: Record<number, DayData> = {};

      const today = currentDate.getDate()
      console.log('today', today)
      for (let day = today; day <= today + 4; day++) {
        const dateStr = getDateString(year, month, day + 1);

        console.log('datestr', dateStr)
        const weather = await aggregateWeatherDataForDay(dateStr);

        const icons: string[] = [];

        console.log(weather)
        if (weather.is_frost) icons.push("frost");
        if (weather.is_sunny) icons.push("sun");
        if (!weather.will_rain) icons.push("water");

        if (weather.avg_temp > 10 && !weather.is_frost) {
          icons.push("plant");
        }

        results[day] = {
          weather,
          icons,
        };
      }

      setData(results);
      setLoading(false);
    }

    fetchMonthWeather();
  }, [currentDate]);

  return { data, loading };
}