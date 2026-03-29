import { Search } from "lucide-react";
import PlantCard from "../components/PlantCard";
import Header from "../components/Header";
import { Input } from "../components/ui/input";
import { useEffect, useState } from "react";
import SearchDialog from "../components/SearchDialog";
import { useAuth } from "../context/AuthContext";
import { subscribeToPlants } from "../firebase/plant.repo";
import PlantDetails from "../components/PlantDetails";
import type { PlantData } from "../models/PlantData";

export default function MyPlants() {
    const { user } = useAuth();

    const [searchQuery, setSearchQuery] = useState("");
    const [plants, setPlants] = useState<Array<PlantData>>([]);
    const [selectedPlant, setSelectedPlant] = useState<PlantData | null>(null);


      useEffect(() => {
    if (!user) return;

    const unsubscribe = subscribeToPlants(user.uid, setPlants);

    return () => unsubscribe(); 
  }, [user]);

    const filteredPlants = plants.filter(
        (plant) =>
          plant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          plant.scientific_name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <>
        <Header />

      <div className="space-y-6 m-10 container mx-auto px-4 py-4 sm:py-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1 max-w-md border-muted-foreground">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search plants..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
     
        <SearchDialog />

        </div>

        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredPlants.map((plant) => {
            return(<PlantCard plant={plant} onShowDetails={setSelectedPlant}
        />)
            })}
        </div>

        <PlantDetails 
          selectedPlant={selectedPlant}
          onClose={() => setSelectedPlant(null)}
        />

        {plants.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No Plant found.</p>
          </div>
        )}
        </div>
        </>
    )
}