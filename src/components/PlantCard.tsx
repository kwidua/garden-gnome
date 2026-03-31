import { Apple, Info } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import type { PlantData } from "../models/PlantData";
import { Button } from "./ui/button";
import { getPruningIcon, getSunIcon, getWaterIcon } from "./PlantIcons";

type PlantProps = {
    plant: PlantData,
    onShowDetails: (plant: PlantData) => void;
}

export default function PlantCard({plant, onShowDetails}: PlantProps) {
    return (
        <Card key={plant.id} className="overflow-hidden hover:shadow-lg transition-shadow border-0">
            <div className="aspect-video overflow-hidden">
              <img
                src={plant.img_url}
                alt={plant.name}
                className="h-full w-full object-cover"
              />
            </div>
            <CardContent className="p-4 space-y-3">
              <div>
                <h3 className="font-medium">{plant.name}</h3>
                <p className="text-sm text-muted-foreground italic">{plant.scientific_name}</p>
              </div>

              <div className="flex flex-wrap gap-3 pt-2 border-muted-foreground">
                <div className="flex items-center gap-1" title={`Wasser: ${plant.water_needs}`}>
                   {getWaterIcon(plant.water_needs)}
                </div>

                <div className="flex items-center gap-1" title={`Sonne: ${plant.sun_needs}`}>
                   {getSunIcon(plant.sun_needs)} 
                </div>

                {plant.hasFruit && (
                  <div className="flex items-center gap-1" title="Trägt Früchte">
                    <Apple className="h-5 w-5 text-red-500" />
                  </div>
                )}

                {/* <div className="flex items-center gap-1" title={plant.type}>
                  {getTypeIcon(plant.type)} 
                </div> */}

                {plant.pruning_month?.length > 0 && (
                  <div className="flex items-center gap-1" title={`Schneiden: ${plant.pruning_month?.join(", ")}`}>
                    {getPruningIcon(plant.pruning_month)}
                  </div>
                )}
              </div>

              {plant.pruning_month?.length > 0 && (
                <div className="pt-2">
                  <p className="text-xs text-muted-foreground mb-1">Pruning Time:</p>
                  <div className="flex flex-wrap gap-1">
                    {plant.pruning_month?.map((month) => (
                      <Badge key={month} variant="secondary" className="text-xs">
                        {month}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              <Button
                variant="outline"
                size="sm"
                className="w-full gap-2 mt-2"
                onClick={() => onShowDetails(plant)}
              >
                <Info className="h-4 w-4" />
                Show Details
              </Button>            
              </CardContent>
          </Card>
    )
}