export interface PlantData {
  id: string;
  name: string;
  scientific_name: string;
  img_url: string;
  createdAt: number;
  pruning_month: Array<string>;
  propagation: Array<string>;
  description: string;
  water_needs: string;
  sun_needs: string;
  hasFruit: boolean;
}