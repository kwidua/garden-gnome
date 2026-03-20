const API_KEY = import.meta.env.VITE_PERENUAL_API_KEY
const BASE_URL = "https://perenual.com/api/v2"

export async function searchPlants(query: string) {
    const response = await fetch(
    `${BASE_URL}/species-list?q=${query}&key=${API_KEY}`
    )

    if (!response.ok) {
        throw new Error("Failed to fetch plants")
    }

    const data = await response.json()
    return data.data || []
}

export async function fetchPlantDetails(id: number) {
    const response = await fetch(
    `${BASE_URL}/species/details/${id}?key=${API_KEY}`
    )
    
    if (!response.ok) {
    throw new Error("Failed to fetch plants")
    }

    const data = await response.json()
    return data.data || []
}