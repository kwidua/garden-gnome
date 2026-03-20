import { Search } from "lucide-react";
import PlantCard, { type Plant } from "../components/PlantCard";
import Header from "../components/Header";
import { Input } from "../components/ui/input";
import { useState } from "react";
import SearchDialog from "../components/SearchDialog";

const mockPlants: Plant[] = [
  {
    id: "1",
    commonName: "Tomato",
    scientificName: "Solanum lycopersicum",
    image: "https://images.unsplash.com/photo-1732915169246-272552804bbb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b21hdG8lMjBwbGFudCUyMGdhcmRlbnxlbnwxfHx8fDE3NzM1NjkxMDJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    waterNeeds: "high",
    sunNeeds: "full",
    hasFruit: true,
    type: "herb",
    pruningMonths: ["Juni", "Juli"],
  },
  {
    id: "2",
    commonName: "Lavendel",
    scientificName: "Lavandula angustifolia",
    image: "https://images.unsplash.com/photo-1654952136794-0de711e5762e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXZlbmRlciUyMGZsb3dlciUyMGdhcmRlbnxlbnwxfHx8fDE3NzM1NzQ4OTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    waterNeeds: "low",
    sunNeeds: "full",
    hasFruit: false,
    type: "flower",
    pruningMonths: ["März", "August"],
  },
  {
    id: "3",
    commonName: "Apple tree",
    scientificName: "Malus domestica",
    image: "https://images.unsplash.com/photo-1694132149888-8bd893e3029b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcHBsZSUyMHRyZWUlMjBmcnVpdHxlbnwxfHx8fDE3NzM1NzQ4OTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    waterNeeds: "medium",
    sunNeeds: "full",
    hasFruit: true,
    type: "tree",
    pruningMonths: ["Februar", "März"],
  },
]

export default function MyPlants() {
    const [searchQuery, setSearchQuery] = useState("");
    const [plants, setPlants] = useState<Plant[]>(mockPlants);


    const filteredPlants = plants.filter(
        (plant) =>
          plant.commonName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          plant.scientificName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <>
        <Header />

      <div className="space-y-6 m-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1 max-w-md">
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
            return(<PlantCard plant={plant} />)
            })}
        </div>

        {filteredPlants.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No Plant found.</p>
          </div>
        )}
        </div>
        </>
    )
}