import { collection, addDoc, onSnapshot, updateDoc, doc } from "firebase/firestore";
import { db } from "../firebase/config";
import type { PlantData } from "../models/PlantData";

export async function addPlant(userId: string, plant: PlantData) {
  const plantsRef = collection(db, "users", userId, "plants");

  await addDoc(plantsRef, {
    ...plant,
    createdAt: new Date(),
  });
}

export function subscribeToPlants(userId: string, callback: (plants: any[]) => void) {
  const plantsRef = collection(db, "users", userId, "plants");

  return onSnapshot(plantsRef, (snapshot) => {
    const plants = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
    }));

    callback(plants);
  });
}

export async function updatePlant(
  userId: string,
  plantId: string,
  updates: Partial<PlantData>
): Promise<void> {
  const plantRef = doc(db, "users", userId, "plants", plantId);

  await updateDoc(plantRef, updates);
}