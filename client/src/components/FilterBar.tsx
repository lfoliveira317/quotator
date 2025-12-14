import { Form, InputGroup, Button } from "react-bootstrap";
import { Search, X } from "react-bootstrap-icons";

interface FilterBarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  categories: string[];
  showFavoritesOnly: boolean;
  onToggleFavorites: () => void;
}

export default function FilterBar({
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  categories,
  showFavoritesOnly,
  onToggleFavorites,
}: FilterBarProps) {
  return (
    <div className="bg-white p-3 rounded shadow-sm mb-4">
      <div className="row g-3 align-items-center">
        <div className="col-md-5">
          <InputGroup>
            <InputGroup.Text className="bg-light border-end-0">
              <Search />
            </InputGroup.Text>
            <Form.Control
              placeholder="Search quotes or authors..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="border-start-0 bg-light"
            />
            {searchTerm && (
              <Button 
                variant="light" 
                className="border border-start-0"
                onClick={() => onSearchChange("")}
              >
                <X size={20} />
              </Button>
            )}
          </InputGroup>
        </div>
        <div className="col-md-4">
          <Form.Select
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="bg-light"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </Form.Select>
        </div>
        <div className="col-md-3 d-flex justify-content-md-end">
          <Button
            variant={showFavoritesOnly ? "danger" : "outline-secondary"}
            onClick={onToggleFavorites}
            className="w-100 w-md-auto"
          >
            {showFavoritesOnly ? "Show All" : "Favorites Only"}
          </Button>
        </div>
      </div>
    </div>
  );
}
