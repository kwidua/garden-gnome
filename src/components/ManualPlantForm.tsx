import { useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Checkbox } from "./ui/checkbox";
import type { PlantData } from "../models/PlantData";
import { useAuth } from "../context/AuthContext";
import { addPlant } from "../firebase/plant.repo";

export default function ManualPlantForm() {
      const { user } = useAuth();
    
      const [manualForm, setManualForm] = useState({
        imageUrl: "",
        name: "",
        scientificName: "",
        description: "",
        waterNeeds: "medium" as PlantData["water_needs"],
        sunNeeds: "full" as PlantData["sun_needs"],
        hasFruit: false,
        pruningMonths: [] as string[],
        propagation: [] as string[],
    });

    const monthOptions = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "Oktober", "November", "December"
    ];

    async function handleManualSubmit() {
    const newPlant: PlantData = {
      id: Date.now().toString(),
      name: manualForm.name,
      scientific_name: manualForm.scientificName,
      img_url: manualForm.imageUrl || "https://images.unsplash.com/photo-1466781783364-36c955e42a7f?q=80&w=1080",
      water_needs: manualForm.waterNeeds,
      sun_needs: manualForm.sunNeeds,
      hasFruit: manualForm.hasFruit,
      pruning_month: manualForm.pruningMonths,
      description: manualForm.description,
      propagation: manualForm.propagation,
      createdAt:  Date.now()
    };

      try {
          await addPlant(user!.uid, newPlant);
        } catch (error) {
            console.error(error)
        }
    
        // setIsAddDialogOpen(false);
    
        // Reset form
    setManualForm({
        imageUrl: "",
        name: "",
        scientificName: "",
        description: "",
        waterNeeds: "medium",
        sunNeeds: "full",
        hasFruit: false,
        pruningMonths: [],
        propagation: []
        
        });
    };

    const togglePruningMonth = (month: string) => {
        setManualForm(prev => ({
        ...prev,
        pruningMonths: prev.pruningMonths.includes(month)
            ? prev.pruningMonths.filter(m => m !== month)
            : [...prev.pruningMonths, month]
        }));
    };
    return (
        <>
                <div className="space-y-2">
                  <Label htmlFor="manual-name">Name *</Label>
                  <Input
                    id="manual-name"
                    placeholder="z.B. Tomate"
                    value={manualForm.name}
                    onChange={(e) => setManualForm({...manualForm, name: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="scientific-name">Scientific Name</Label>
                  <Input
                    id="scientific-name"
                    placeholder="z.B. Solanum lycopersicum"
                    value={manualForm.scientificName}
                    onChange={(e) => setManualForm({...manualForm, scientificName: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="image-url">Image-URL</Label>
                  <Input
                    id="image-url"
                    type="url"
                    placeholder="https://example.com/bild.jpg"
                    value={manualForm.imageUrl}
                    onChange={(e) => setManualForm({...manualForm, imageUrl: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Additional Information..."
                    value={manualForm.description}
                    onChange={(e) => setManualForm({...manualForm, description: e.target.value})}
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="water-needs">Water Need</Label>
                    <Select
                      value={manualForm.waterNeeds}
                      onValueChange={(value: PlantData["water_needs"]) => 
                        setManualForm({...manualForm, waterNeeds: value})
                      }
                    >
                      <SelectTrigger id="water-needs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="sun-needs">Sun Need</Label>
                    <Select
                      value={manualForm.sunNeeds}
                      onValueChange={(value: PlantData["sun_needs"]) => 
                        setManualForm({...manualForm, sunNeeds: value})
                      }
                    >
                      <SelectTrigger id="sun-needs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="full">Full sun</SelectItem>
                        <SelectItem value="partial">Part shade</SelectItem>
                        <SelectItem value="shade">Shade</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="has-fruit"
                      checked={manualForm.hasFruit}
                      onCheckedChange={(checked) => 
                        setManualForm({...manualForm, hasFruit: checked as boolean})
                      }
                    />
                    <Label htmlFor="has-fruit" className="cursor-pointer">
                      Bears Fruit
                    </Label>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Pruning Months</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {monthOptions.map((month) => (
                      <div key={month} className="flex items-center space-x-2">
                        <Checkbox
                          id={`month-${month}`}
                          checked={manualForm.pruningMonths.includes(month)}
                          onCheckedChange={() => togglePruningMonth(month)}
                        />
                        <Label 
                          htmlFor={`month-${month}`} 
                          className="text-sm cursor-pointer"
                        >
                          {month}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <Button 
                  onClick={handleManualSubmit} 
                  className="w-full"
                  disabled={!manualForm.name}
                >
                  Add Plant
                </Button>
        </>
    )
}