import { Droplet, Sun } from "lucide-react";
import type { PlantData } from "../models/PlantData";

export const getWaterIcon = (level: PlantData["water_needs"]) => {
    switch (level) {
      case "low":
        return <Droplet className="h-5 w-5 text-muted-foreground" />;
      case "medium":
        return (
          <div className="flex gap-0.5">
            <Droplet className="h-5 w-5 text-primary" />
            <Droplet className="h-5 w-5 text-primary" />
          </div>
        );
      case "high":
        return (
          <div className="flex gap-0.5">
            <Droplet className="h-5 w-5 text-primary" />
            <Droplet className="h-5 w-5 text-primary" />
            <Droplet className="h-5 w-5 text-primary" />
          </div>
        );
    }
  };

export const getSunIcon = (level: PlantData["sun_needs"]) => {
    switch (level) {
      case "full":
        return <Sun className="h-5 w-5 text-amber-500" />;
      case "partial":
        return <Sun className="h-5 w-5 text-amber-400" />;
      case "shade":
        return <Sun className="h-5 w-5 text-muted-foreground" />;
    }
  };