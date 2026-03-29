import { Apple, Edit, Info, Leaf, Scissors, Sun } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { useState } from "react";
import type { PlantData } from "../models/PlantData";
import { Badge } from "./ui/badge";
import { getSunIcon, getWaterIcon } from "./PlantIcons";
import { PlantEditForm } from "./PlantEditForm";
import { updatePlant } from "../firebase/plant.repo";
import { useAuth } from "../context/AuthContext";

type PlantDetailsProps = {
  selectedPlant: PlantData | null;
  onClose: () => void;
};

export default function PlantDetails({ selectedPlant, onClose }: PlantDetailsProps) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [editForm, setEditForm] = useState<PlantData | null>(null);

  const { user } = useAuth();
  
  const handleEditClick = () => {
    if (selectedPlant) {
      setEditForm({ ...selectedPlant });
      setIsEditMode(true);
    }
  };

  async function handleSaveEdit(updatedPlant: PlantData) {
    if (!user) return;
  
    const { id, ...updates } = updatedPlant;

    try {
      await updatePlant(user.uid, id!, updates);

      setIsEditMode(false);
      setEditForm(null);
    } catch (err) {
      console.error("Failed to update plant:", err);
    }
  };

  return (
    <Dialog open={selectedPlant !== null} onOpenChange={() => {
      onClose();
      setIsEditMode(false);
      setEditForm(null);
    }}>
      <DialogContent className="max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        {selectedPlant && (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl">{isEditMode ? 'Pflanze bearbeiten' : selectedPlant.name}</DialogTitle>
              {!isEditMode && (
                <p className="text-sm text-muted-foreground italic">{selectedPlant.scientific_name}</p>
              )}
            </DialogHeader>

            {isEditMode && editForm ? (
              <PlantEditForm
                plant={editForm}
                onSave={handleSaveEdit}
              />
            ) : (
              <div className="space-y-6">
                <div className="aspect-video overflow-hidden rounded-lg">
                  <img
                    src={selectedPlant.img_url}
                    alt={selectedPlant.name}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <Card>
                    <CardContent className="p-3 flex flex-col items-center gap-2">
                      <div className="text-sm text-muted-foreground">Wasser</div>
                      {getWaterIcon(selectedPlant.water_needs)}
                      <div className="text-xs capitalize">{selectedPlant.water_needs}</div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-3 flex flex-col items-center gap-2">
                      <div className="text-sm text-muted-foreground">Sonne</div>
                      {getSunIcon(selectedPlant.sun_needs)}
                      <div className="text-xs capitalize">{selectedPlant.sun_needs}</div>
                    </CardContent>
                  </Card>

                  {/* <Card>
                      <CardContent className="p-3 flex flex-col items-center gap-2">
                        <div className="text-sm text-muted-foreground">Typ</div>
                        {getTypeIcon(selectedPlant.type)}
                        <div className="text-xs capitalize">{selectedPlant.type}</div>
                      </CardContent>
                    </Card> */}

                  <Card>
                    <CardContent className="p-3 flex flex-col items-center gap-2">
                      <div className="text-sm text-muted-foreground">Früchte</div>
                      <Apple className={`h-5 w-5 ${selectedPlant.hasFruit ? 'text-red-500' : 'text-muted-foreground'}`} />
                      <div className="text-xs">{selectedPlant.hasFruit ? 'Ja' : 'Nein'}</div>
                    </CardContent>
                  </Card>
                </div>

                {selectedPlant.description && (
                  <div className="space-y-2">
                    <h3 className="font-medium flex items-center gap-2">
                      <Leaf className="h-4 w-4 text-primary" />
                      Description
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {selectedPlant.description}
                    </p>
                  </div>
                )}

                {selectedPlant.pruning_advice && (
                  <div className="space-y-2">
                    <h3 className="font-medium flex items-center gap-2">
                      <Scissors className="h-4 w-4 text-primary" />
                      Pruning Advice
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {selectedPlant.pruning_advice}
                    </p>
                    {selectedPlant.pruning_month.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        <span className="text-xs text-muted-foreground">Best Months:</span>
                        {selectedPlant.pruning_month.map((month) => (
                          <Badge key={month} variant="secondary" className="text-xs">
                            {month}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {selectedPlant.care_notes && (
                  <div className="space-y-2">
                    <h3 className="font-medium flex items-center gap-2">
                      <Sun className="h-4 w-4 text-primary" />
                      Care Advice
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {selectedPlant.care_notes}
                    </p>
                  </div>
                )}

                {selectedPlant.notes && (
                  <div className="space-y-2">
                    <h3 className="font-medium flex items-center gap-2">
                      <Info className="h-4 w-4 text-primary" />
                      Notes
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed bg-secondary/50 p-3 rounded-md">
                      {selectedPlant.notes}
                    </p>
                  </div>
                )}

                <Button
                  variant="outline"
                  size="sm"
                  className="w-full gap-2 mt-2"
                  onClick={handleEditClick}
                >
                  <Edit className="h-4 w-4" />
                  Edit
                </Button>
              </div>
            )}
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}