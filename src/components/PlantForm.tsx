import { useState } from "react";
import type { PlantData } from "../models/PlantData";
import { monthOptions } from "./ManualPlantForm";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";

export type PlantFormValues = {
  name: string;
  scientific_name: string;
  img_url: string;
  description: string;
  water_needs: PlantData["water_needs"];
  sun_needs: PlantData["sun_needs"];
  hasFruit: boolean;
  pruning_month: string[];
  propagation: string[];

  // optional fields
  pruning_advice?: string;
  care_notes?: string;
  notes?: string;
};

interface PlantFormProps {
  initialValues: PlantFormValues;
  onSubmit: (values: PlantFormValues) => void;
  mode?: "create" | "edit";
  showAdvancedFields?: boolean;
}

export function PlantForm({
  initialValues,
  onSubmit,
  mode = "create",
  showAdvancedFields = false,
}: PlantFormProps) {
  const [form, setForm] = useState<PlantFormValues>(initialValues);

  const update = <K extends keyof PlantFormValues>(
    key: K,
    value: PlantFormValues[K]
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const togglePruningMonth = (month: string) => {
    update(
      "pruning_month",
      form.pruning_month.includes(month)
        ? form.pruning_month.filter((m) => m !== month)
        : [...form.pruning_month, month]
    );
  };

  return (
    <div className="space-y-4">
        <Label htmlFor="name">Name *</Label>
        <Input
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
        />

        <Label htmlFor="scientific_name">Scientific Name</Label>
        <Input
            value={form.scientific_name}
            onChange={(e) => update("scientific_name", e.target.value)}
        />

        <Label htmlFor="image_url">Image-URL</Label>
        <Input
            value={form.img_url}
            onChange={(e) => update("img_url", e.target.value)}
        />

        <Label htmlFor="description">Description</Label>
        <Textarea
            value={form.description}
            onChange={(e) => update("description", e.target.value)}
        />

        <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
                <Label htmlFor="water-needs">Water Need</Label>
                <Select
                value={form.water_needs}
                onValueChange={(value: PlantData["water_needs"]) => 
                setForm({...form, water_needs: value})
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
                value={form.sun_needs}
                onValueChange={(value: PlantData["sun_needs"]) => 
                    setForm({...form, sun_needs: value})
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
                

        <Label htmlFor="hasFruit" className="cursor-pointer">
                       Bears Fruit
        </Label>
        <Checkbox
            checked={form.hasFruit}
            onCheckedChange={(v) => update("hasFruit", v as boolean)}
        />


        <Label>Pruning Months</Label>
        <div className="grid grid-cols-3 gap-2">
            {monthOptions.map((month) => (
            <div key={month} className="flex items-center space-x-2">
                <Checkbox
                id={`month-${month}`}
                checked={form.pruning_month.includes(month)}
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

      {showAdvancedFields && (
        <>
            <Label>Pruning Advice</Label>
            <Textarea
                value={form.pruning_advice || ""}
                onChange={(e) => update("pruning_advice", e.target.value)}
            />

            <Label>Care Notes</Label>
            <Textarea
                value={form.care_notes || ""}
                onChange={(e) => update("care_notes", e.target.value)}
            />

            <Label>Notes</Label>
            <Textarea
                value={form.notes || ""}
                onChange={(e) => update("notes", e.target.value)}
            />
        </>
      )}

      <Button onClick={() => onSubmit(form)}>
        {mode === "create" ? "Add Plant" : "Save"}
      </Button>
    </div>
  );
}