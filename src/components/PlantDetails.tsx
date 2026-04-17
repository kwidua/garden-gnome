import { Apple, Edit, Info, Leaf, Scissors, Sun, Trash } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { useState } from "react";
import type { PlantData } from "../models/PlantData";
import { Badge } from "./ui/badge";
import { getSunIcon, getWaterIcon } from "./PlantIcons";
import { PlantEditForm } from "./PlantEditForm";
import { deletePlant, updatePlant } from "../firebase/plant.repo";
import { useAuth } from "../context/AuthContext";

type PlantDetailsProps = {
  selectedPlant: PlantData | null;
  onClose: () => void;
};

export default function PlantDetails({ selectedPlant, onClose }: PlantDetailsProps) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [editForm, setEditForm] = useState<PlantData | null>(null);

  const displayPlant = editForm ?? selectedPlant;

  const { user } = useAuth();
  
  const handleEditClick = () => {
    if (displayPlant) {
      setEditForm({ ...displayPlant });
      setIsEditMode(true);
    }
  };

  async function handleDelete(plantId: string) {
    if (!user) return;
    
    await deletePlant(user.uid, plantId);
    onClose();
  }


  async function handleSaveEdit(updatedPlant: PlantData) {
    if (!user) return;
  
    const { id, ...updates } = updatedPlant;

    try {
      await updatePlant(user.uid, id!, updates);

      setIsEditMode(false);
      setEditForm(updatedPlant);
    } catch (err) {
      console.error("Failed to update plant:", err);
    }
  };

  return (
    <Dialog open={displayPlant !== null} onOpenChange={() => {
      onClose();
      setIsEditMode(false);
      setEditForm(null);
    }}>
      <DialogContent className="max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        {displayPlant && (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl">{isEditMode ? 'Pflanze bearbeiten' : displayPlant.name}</DialogTitle>
              {!isEditMode && (
                <p className="text-sm text-muted-foreground italic">{displayPlant.scientific_name}</p>
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
                    src={displayPlant.img_url}
                    alt={displayPlant.name}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <Card>
                    <CardContent className="p-3 flex flex-col items-center gap-2">
                      <div className="text-sm text-muted-foreground">Wasser</div>
                      {getWaterIcon(displayPlant.water_needs)}
                      <div className="text-xs capitalize">{displayPlant.water_needs}</div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-3 flex flex-col items-center gap-2">
                      <div className="text-sm text-muted-foreground">Sonne</div>
                      {getSunIcon(displayPlant.sun_needs)}
                      <div className="text-xs capitalize">{displayPlant.sun_needs}</div>
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
                      <Apple className={`h-5 w-5 ${displayPlant.hasFruit ? 'text-red-500' : 'text-muted-foreground'}`} />
                      <div className="text-xs">{displayPlant.hasFruit ? 'Ja' : 'Nein'}</div>
                    </CardContent>
                  </Card>
                </div>

                {displayPlant.description && (
                  <div className="space-y-2">
                    <h3 className="font-medium flex items-center gap-2">
                      <Leaf className="h-4 w-4 text-primary" />
                      Description
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {displayPlant.description}
                    </p>
                  </div>
                )}

                {displayPlant.pruning_advice && (
                  <div className="space-y-2">
                    <h3 className="font-medium flex items-center gap-2">
                      <Scissors className="h-4 w-4 text-primary" />
                      Pruning Advice
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {displayPlant.pruning_advice}
                    </p>
                    {displayPlant.pruning_month.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        <span className="text-xs text-muted-foreground">Best Months:</span>
                        {displayPlant.pruning_month.map((month) => (
                          <Badge key={month} variant="secondary" className="text-xs">
                            {month}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {displayPlant.care_notes && (
                  <div className="space-y-2">
                    <h3 className="font-medium flex items-center gap-2">
                      <Sun className="h-4 w-4 text-primary" />
                      Care Advice
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {displayPlant.care_notes}
                    </p>
                  </div>
                )}

                {displayPlant.notes && (
                  <div className="space-y-2">
                    <h3 className="font-medium flex items-center gap-2">
                      <Info className="h-4 w-4 text-primary" />
                      Notes
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed bg-secondary/50 p-3 rounded-md">
                      {displayPlant.notes}
                    </p>
                  </div>
                )}
                
                <div className="flex gap-2 mt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 gap-2"
                    onClick={handleEditClick}
                  >
                    <Edit className="h-4 w-4" />
                    Edit
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    className="lex-1 gap-2 hover:bg-red-300"
                    onClick={() => handleDelete(displayPlant.id)}
                  >
                    <Trash className="h-4 w-4" />
                    Delete
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}