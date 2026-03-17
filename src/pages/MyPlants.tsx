import { Plus } from "lucide-react";
import PlantCard, { type Plant } from "../components/PlantCard";
import { Button } from "../components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog";
import Header from "../components/Header";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { useState } from "react";


const mockPlants: Plant[] = [
  {
    id: "1",
    commonName: "Tomate",
    scientificName: "Solanum lycopersicum",
    image: "https://images.unsplash.com/photo-1732915169246-272552804bbb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b21hdG8lMjBwbGFudCUyMGdhcmRlbnxlbnwxfHx8fDE3NzM1NjkxMDJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    waterNeeds: "high",
    sunNeeds: "full",
    hasFruit: true,
    type: "herb",
    pruningMonths: ["Juni", "Juli"],
  },
]

export default function MyPlants() {
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
    const [newPlantName, setNewPlantName] = useState("")

    function handleAddPlant() {
   
    }

    return (
        <>
        <Header />

        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2 w-full sm:w-auto">
              <Plus className="h-4 w-4" />
              Pflanze hinzufügen
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md mx-4">
            <DialogHeader>
              <DialogTitle>Neue Pflanze hinzufügen</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="plant-name">Pflanzenname</Label>
                <Input
                  id="plant-name"
                  placeholder="z.B. Tomate, Rose, Apfelbaum..."
                  value={newPlantName}
                  onChange={(e) => setNewPlantName(e.target.value)}
                />
                <p className="text-sm text-muted-foreground">
                  Die Pflanzendaten werden über die Perenual API abgerufen.
                </p>
              </div>
              <Button onClick={handleAddPlant} className="w-full">
                Pflanze suchen
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {mockPlants.map((plant) => {
            return(<PlantCard plant={plant} />)
            })}
        </div>
        </>
    )
}