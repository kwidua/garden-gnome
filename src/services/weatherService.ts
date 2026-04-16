import { addWeather } from "../firebase/weather.repo";
import { aggregateWeatherDataForDay } from "./weatherApi";

function getDateOffset(days: number): string {
    const d = new Date();
    d.setDate(d.getDate() + days);
    return d.toLocaleDateString('en-CA'); // YYYY-MM-DD
}

export async function syncWeatherForNextDays(userId: string) {
    const days = [0, 1, 2, 3, 4];

    const results = await Promise.all(
        days.map(async (offset) => {
            const day = getDateOffset(offset);
            const data = await aggregateWeatherDataForDay(day);
            return data;
        })
    );

    await Promise.all(
        results.map((dayData) => addWeather(userId, dayData))
    );
}