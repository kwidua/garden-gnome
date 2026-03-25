import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useState } from "react";
import { fetchPlantDetails, searchPlants } from "../services/plantApi";
import { addPlant } from "../firebase/plant.repo";
import { useAuth } from "../context/AuthContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import ManualPlantForm from "./ManualPlantForm";


export default function SearchDialog() {
  const [isOpen, setIsOpen] = useState(false)
  const [isResultOpen, setIsResultOpen] = useState(false)
  const [search, setSearch] = useState("")
  const [results, setResults] = useState<any[]>([])

  const { user } = useAuth();

  async function handleSearch() {
    try {
      const results = await searchPlants(search)
      setResults(results)
      setIsResultOpen(true)
    } catch (error) {
      console.error(error)
    }
  }

  async function getPlantDetails(id: number) {
    try {
      const results = await fetchPlantDetails(id)
      if (user) {

      }
      await addPlant(user!.uid, {
        id: results.id,
        name: results.common_name,
        scientific_name: results.scientific_name[0],
        pruning_month: results.pruning_month,
        description: results.description,
        propagation: results.propagation,
        img_url: results.default_image['original_url'],
        water_needs: results.watering,
        sun_needs: results.sunlight,
        createdAt: Date.now(),
        hasFruit: results.fruits
      });
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant="default" className="gap-2 w-full sm:w-auto">
            <Plus className="h-4 w-4" />
            Add Plant
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-md mx-4 bg-background">
          <DialogHeader>
            <DialogTitle>Add new Plant</DialogTitle>
          </DialogHeader>

          <Tabs defaultValue="api" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="api">API-Search</TabsTrigger>
                <TabsTrigger value="manual">Add Manually</TabsTrigger>
              </TabsList>

              <TabsContent value="api" className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="plant-name">Plant Name</Label>
                  <Input
                    id="plant-name"
                    placeholder="z.B. Tomate, Rose, Apfelbaum..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <p className="text-sm text-muted-foreground">
                    Plant Data is added via the Perenual API.
                  </p>
                </div>
                <Button onClick={handleSearch} className="w-full">
                  Search Plant
                </Button>
              </TabsContent>

              <TabsContent value="manual" className="space-y-4 mt-4">
                <ManualPlantForm />
              </TabsContent>
            </Tabs>
          {/* <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="plant-name">Plant name</Label>
              <Input
                id="plant-name"
                placeholder="z.B. Tomate, Rose, Apfelbaum..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <p className="text-sm text-muted-foreground">
                Plant data is retrieved via the Perenual API.
              </p>
            </div>
            <Button variant="default" onClick={handleSearch} className="w-full">
              Pflanze suchen
            </Button>
          </div> */}
        </DialogContent>
      </Dialog>

      <Dialog open={isResultOpen} onOpenChange={setIsResultOpen}>
        <DialogContent className="max-w-md mx-4">
          <DialogHeader>
            <DialogTitle>Search results</DialogTitle>
          </DialogHeader>

          <div className="space-y-2 max-h-[400px] overflow-y-auto">
            {results.length === 0 && (
              <p className="text-sm text-muted-foreground">
                No Plant found.
              </p>
            )}

            {results.map((plant) => (
              <div
                key={plant.id}
                onClick={() => {
                  getPlantDetails(plant.id)
                  setIsResultOpen(false)
                }}
                className="p-3 border rounded-lg cursor-pointer hover:bg-muted transition"
              >
                <p className="font-medium">
                  {plant.common_name || "Unknown"}
                </p>
                <p className="text-sm text-muted-foreground">
                  {plant.scientific_name?.[0]}
                </p>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}