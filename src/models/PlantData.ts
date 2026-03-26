export interface PlantData {
  id: string;
  name: string;
  scientific_name: string;
  img_url: string;
  createdAt: number;
  pruning_month: Array<string>;
  propagation: Array<string>;
  description: string;
  water_needs: "low" | "medium" | "high";
  sun_needs: "full" | "partial" | "shade";
  hasFruit: boolean;
  pruning_advice: string;
  care_notes: string;
  notes: string;
}
