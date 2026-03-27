import type { PlantData } from "../models/PlantData";
import { PlantForm } from "./PlantForm";

export function PlantEditForm({
  plant,
  onSave,
}: {
  plant: PlantData;
  onSave: (p: PlantData) => void;
}) {
  return (
    <PlantForm
      initialValues={plant}
      onSubmit={(values) => onSave(values as PlantData)}
      mode="edit"
      showAdvancedFields={true}
    />
  );
}