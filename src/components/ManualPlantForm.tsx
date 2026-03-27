import type { PlantData } from "../models/PlantData";
import { useAuth } from "../context/AuthContext";
import { addPlant } from "../firebase/plant.repo";
import { PlantForm, type PlantFormValues } from "./PlantForm";

   export const monthOptions = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "Oktober", "November", "December"
    ];
    
export default function ManualPlantForm() {
    const { user } = useAuth();

    const initialValues: PlantFormValues = {
      name: "",
      scientific_name: "",
      img_url: "",
      description: "",
      water_needs: "medium",
      sun_needs: "full",
      hasFruit: false,
      pruning_month: [],
      propagation: [],
    };


    const handleManualSubmit = async (values: PlantFormValues) => {
      const newPlant: PlantData = {
        ...values,
        id: Date.now().toString(),
        createdAt: Date.now(),
        pruning_advice: "",
        care_notes: "",
        notes: "",
      };

      try {
        await addPlant(user!.uid, newPlant);
      } catch (error) {
          console.error(error)
      }  
    };

    return (
    <PlantForm
      initialValues={initialValues}
      onSubmit={handleManualSubmit}
      mode="create"
      showAdvancedFields={false}
    />
  );
}