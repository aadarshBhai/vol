import { useState } from "react";
import { Search, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const navigate = useNavigate();
  const [destination, setDestination] = useState("");

  const handleSearch = () => {
    if (!destination.trim()) {
      toast.error("Please enter a destination to search");
      return;
    }
    navigate(`/search?q=${encodeURIComponent(destination.trim())}`);
  };

  return (
    <section className="container mx-auto -mt-16 relative z-10 px-4">
      <div className="rounded-2xl bg-card p-6 shadow-2xl border border-border">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-[1fr_auto]">
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search places (e.g., Manali)"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') handleSearch(); }}
              className="pl-10"
            />
          </div>
          <Button
            onClick={handleSearch}
            className="w-full md:w-auto bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Search className="mr-2 h-5 w-5" />
            Search
          </Button>
        </div>
      </div>
    </section>
  );
};

export default SearchBar;
