import { Apple, Scissors } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";

type PlantProps = {
    plant: Plant
}

export type Plant = {
  id: string;
  commonName: string;
  scientificName: string;
  image: string;
  waterNeeds: "low" | "medium" | "high";
  sunNeeds: "full" | "partial" | "shade";
  hasFruit: boolean;
  type: "tree" | "flower" | "shrub" | "herb";
  pruningMonths: string[];
};

export default function PlantCard({plant}: PlantProps) {
    return (
        <Card key={plant.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="aspect-video overflow-hidden">
              <img
                src={plant.image}
                alt={plant.commonName}
                className="h-full w-full object-cover"
              />
            </div>
            <CardContent className="p-4 space-y-3">
              <div>
                <h3 className="font-medium">{plant.commonName}</h3>
                <p className="text-sm text-muted-foreground italic">{plant.scientificName}</p>
              </div>

              <div className="flex flex-wrap gap-3 pt-2 border-t">
                <div className="flex items-center gap-1" title={`Wasser: ${plant.waterNeeds}`}>
                  {/* {getWaterIcon(plant.waterNeeds)} */}
                </div>

                <div className="flex items-center gap-1" title={`Sonne: ${plant.sunNeeds}`}>
                  {/* {getSunIcon(plant.sunNeeds)} */}
                </div>

                {plant.hasFruit && (
                  <div className="flex items-center gap-1" title="Trägt Früchte">
                    <Apple className="h-5 w-5 text-red-500" />
                  </div>
                )}

                <div className="flex items-center gap-1" title={plant.type}>
                  {/* {getTypeIcon(plant.type)} */}
                </div>

                {plant.pruningMonths.length > 0 && (
                  <div className="flex items-center gap-1" title={`Schneiden: ${plant.pruningMonths.join(", ")}`}>
                    <Scissors className="h-5 w-5 text-primary" />
                  </div>
                )}
              </div>

              {plant.pruningMonths.length > 0 && (
                <div className="pt-2">
                  <p className="text-xs text-muted-foreground mb-1">Schnittzeit:</p>
                  <div className="flex flex-wrap gap-1">
                    {plant.pruningMonths.map((month) => (
                      <Badge key={month} variant="secondary" className="text-xs">
                        {month}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
    )
}