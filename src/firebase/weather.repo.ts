import { getDoc, setDoc, doc } from "firebase/firestore";
import { db } from "../firebase/config";
import type { WeatherData } from "../models/weatherData";

export async function addWeather(userId: string, data: WeatherData) {
    const ref = doc(db, "weather", userId, "days", data.day);

    const existing = await getDoc(ref);

    if (existing.exists()) {
        return; 
    }

    await setDoc(ref, data);
}