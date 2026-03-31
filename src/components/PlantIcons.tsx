import { CloudSun, Cloudy, Droplet, Scissors, Sun } from "lucide-react";
import type { PlantData } from "../models/PlantData";
import { useId } from "react";

export const getWaterIcon = (level: PlantData["water_needs"]) => {
    switch (level) {
      case "low":
        return <WaterDrop level={25}/>
      case "medium":
        return <WaterDrop level={40}/>

      case "high":
        return <WaterDrop level={80}/>
    }
  };

export const getSunIcon = (level: PlantData["sun_needs"]) => {
    switch (level) {
      case "full":
        return <Sun className="h-5 w-5 text-amber-500" />;
      case "partial":
        return <CloudSun className="h-5 w-5 text-amber-400" />;
      case "shade":
        return <Cloudy className="h-5 w-5 text-muted-foreground" />;
    }
  };

  export const getPruningIcon = (level: PlantData['pruning_month']) => {
    const formatter = new Intl.DateTimeFormat('en-US', {month: 'long'})
    var currentMonth = formatter.format(new Date())

    if (level.includes(currentMonth)) {
      return <Scissors className="h-5 w-5 text-primary" />
    }

    return <Scissors className="h-5 w-5 text-muted-outline" />
  }

  function WaterDrop({ level }: { level: number }) {
  const id = useId();
  const height = (level / 100) * 24;

  return (
    <div className="relative w-6 h-6">
      <Droplet className="absolute inset-0 text-gray-400" />

      <svg className="absolute inset-0 w-full h-full">
        <defs>
          <mask id={id}>
            <rect
              x="0"
              y={24 - height}
              width="24"
              height={height}
              fill="white"
            />
          </mask>
        </defs>

        <g mask={`url(#${id})`}>
          <Droplet className="text-raindrop fill-raindrop" />
        </g>
      </svg>
    </div>
  );
}