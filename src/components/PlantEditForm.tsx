import React from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";
import { Save, X } from "lucide-react";
import type { PlantData } from "../models/PlantData";
import { monthOptions } from "./ManualPlantForm";

interface PlantEditFormProps {
  plant: PlantData;
  onSave: (plant: PlantData) => void;
  onCancel: () => void;
}

export function PlantEditForm({ plant, onSave, onCancel }: PlantEditFormProps) {
  const [editForm, setEditForm] = React.useState<PlantData>(plant);

  const togglePruningMonth = (month: string) => {
    setEditForm({
      ...editForm,
      pruning_month: editForm.pruning_month.includes(month)
        ? editForm.pruning_month.filter(m => m !== month)
        : [...editForm.pruning_month, month]
    });
  };

  const handleSubmit = () => {
    onSave(editForm);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="edit-name">Name *</Label>
        <Input
          id="edit-name"
          placeholder="z.B. Tomate"
          value={editForm.name}
          onChange={(e) => setEditForm({...editForm, name: e.target.value})}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="edit-scientific-name">Scientific Name</Label>
        <Input
          id="edit-scientific-name"
          placeholder="z.B. Solanum lycopersicum"
          value={editForm.scientific_name}
          onChange={(e) => setEditForm({...editForm, scientific_name: e.target.value})}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="edit-image-url">Image-URL</Label>
        <Input
          id="edit-image-url"
          type="url"
          placeholder="https://example.com/bild.jpg"
          value={editForm.img_url}
          onChange={(e) => setEditForm({...editForm, img_url: e.target.value})}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="edit-description">Description</Label>
        <Textarea
          id="edit-description"
          placeholder="Allgemeine Beschreibung..."
          value={editForm.description || ""}
          onChange={(e) => setEditForm({...editForm, description: e.target.value})}
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="edit-pruning-advice">Pruning Advice</Label>
        <Textarea
          id="edit-pruning-advice"
          placeholder="Tipps zum Schneiden..."
          value={editForm.pruning_advice || ""}
          onChange={(e) => setEditForm({...editForm, pruning_advice: e.target.value})}
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="edit-care-notes">Caring Advice</Label>
        <Textarea
          id="edit-care-notes"
          placeholder="Pflege- und Standorthinweise..."
          value={editForm.care_notes || ""}
          onChange={(e) => setEditForm({...editForm, care_notes: e.target.value})}
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="edit-notes">Notes</Label>
        <Textarea
          id="edit-notes"
          placeholder="Persönliche Notizen..."
          value={editForm.notes || ""}
          onChange={(e) => setEditForm({...editForm, notes: e.target.value})}
          rows={2}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="edit-water-needs">Water Need</Label>
          <Select
            value={editForm.water_needs}
            onValueChange={(value: PlantData["water_needs"]) => 
              setEditForm({...editForm, water_needs: value})
            }
          >
            <SelectTrigger id="edit-water-needs">
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
          <Label htmlFor="edit-sun-needs">Sun Need</Label>
          <Select
            value={editForm.sun_needs}
            onValueChange={(value: PlantData["sun_needs"]) => 
              setEditForm({...editForm, sun_needs: value})
            }
          >
            <SelectTrigger id="edit-sun-needs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="full">Full Sun</SelectItem>
              <SelectItem value="partial">Half Shadow</SelectItem>
              <SelectItem value="shade">Shadow</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* <div className="space-y-2"> */}
        {/* <Label htmlFor="edit-plant-type">Pflanzentyp</Label>
        <Select
          value={editForm.type}
          onValueChange={(value: Plant["type"]) => 
            setEditForm({...editForm, type: value})
          }
        >
          <SelectTrigger id="edit-plant-type">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="tree">Baum</SelectItem>
            <SelectItem value="shrub">Strauch</SelectItem>
            <SelectItem value="flower">Blume</SelectItem>
            <SelectItem value="herb">Kraut</SelectItem>
          </SelectContent>
        </Select>
      </div> */}

      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="edit-has-fruit"
            checked={editForm.hasFruit}
            onCheckedChange={(checked) => 
              setEditForm({...editForm, hasFruit: checked as boolean})
            }
          />
          <Label htmlFor="edit-has-fruit" className="cursor-pointer">
            Bears Fruit
          </Label>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Schnittmonate</Label>
        <div className="grid grid-cols-3 gap-2">
          {monthOptions.map((month) => (
            <div key={month} className="flex items-center space-x-2">
              <Checkbox
                id={`edit-month-${month}`}
                checked={editForm.pruning_month.includes(month)}
                onCheckedChange={() => togglePruningMonth(month)}
              />
              <Label 
                htmlFor={`edit-month-${month}`} 
                className="text-sm cursor-pointer"
              >
                {month}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-2 pt-4">
        <Button 
          onClick={handleSubmit} 
          className="flex-1 gap-2"
          disabled={!editForm.name}
        >
          <Save className="h-4 w-4" />
          Save
        </Button>
        <Button 
          onClick={onCancel} 
          variant="outline"
          className="flex-1 gap-2"
        >
          <X className="h-4 w-4" />
          Cancel
        </Button>
      </div>
    </div>
  );
}