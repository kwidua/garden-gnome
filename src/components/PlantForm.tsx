import type { PlantData } from "../models/PlantData";
import { monthOptions } from "./ManualPlantForm";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { useForm, Controller } from "react-hook-form";


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
//   const [form, setForm] = useState<PlantFormValues>(initialValues);

    const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    } = useForm<PlantFormValues>({
    defaultValues: initialValues,
    });

  return (
    <div className="space-y-4">
        <Label htmlFor="name">Name *</Label>
        <Input
            {...register("name", { 
                required: "Name is required", 
                pattern: {
                    value: /^[\p{L}\s]+$/u,
                    message: "Only letters allowed",
                    }
                })}
        />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}

        <Label htmlFor="scientific_name">Scientific Name</Label>
        <Input
        {...register("scientific_name", { 
            required: "Scientific Name is required",
            pattern: {
                        value: /^[\p{L}\s]+$/u,
                        message: "Only letters allowed",
                        }
                    })}
        />
        {errors.scientific_name && <p className="text-red-500">{errors.scientific_name.message}</p>}

        <Label htmlFor="image_url">Image-URL</Label>
        <Input
            {...register("img_url", { required: "Please Provide an Image URL",   
                validate: (value) => {
                try {
                    new URL(value);
                    return true;
                } catch {
                    return "Please enter a valid URL";
                } }}
        )}
        />
        {errors.img_url && <p className="text-red-500">{errors.img_url.message}</p>}

        <Label htmlFor="description">Description</Label>
        <Textarea
            {...register("description")}
        />

        <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
                <Label htmlFor="water-needs">Water Need</Label>
                <Controller
                    name="water_needs"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                <Select
                value={field.value}
                onValueChange={field.onChange}
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
                )}/>
            </div>

            <div className="space-y-2">
            <Label htmlFor="sun-needs">Sun Need</Label>
            <Controller
                name="sun_needs" 
                control={control}
                rules={{required: true}}
                render={({field}) => (
                <Select
                value={field.value}
                onValueChange={field.onChange}
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
                )}
                />
            </div>
        </div>
                

        <Label htmlFor="hasFruit" className="cursor-pointer">
            Bears Fruit
        </Label>
        <Controller
            name="hasFruit"
            control={control}
            render={({field}) => (
            <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
            />
        )} />


        <Label>Pruning Months</Label>
        <Controller
            name="pruning_month"
            control={control}
            render={({ field }) => {
                const toggle = (month: string) => {
                const value = field.value || [];
                field.onChange(
                    value.includes(month)
                    ? value.filter((m: string) => m !== month)
                    : [...value, month]
                );
                };

            return (
                <div className="grid grid-cols-3 gap-2">
                    {monthOptions.map((month) => (
                    <div key={month} className="flex items-center space-x-2">
                        <Checkbox
                        id={`month-${month}`}
                            checked={field.value?.includes(month)}
                            onCheckedChange={() => toggle(month)}
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
            )}}
            />

      {showAdvancedFields && (
        <>
            <Label>Pruning Advice</Label>
            <Textarea
                {...register("pruning_advice")}
            />

            <Label>Care Notes</Label>
            <Textarea
                {...register("care_notes")}
            />

            <Label>Notes</Label>
            <Textarea
                {...register("notes")}
            />
        </>
      )}

      <Button onClick={handleSubmit(onSubmit)}>
        {mode === "create" ? "Add Plant" : "Save"}
      </Button>
    </div>
  );
}